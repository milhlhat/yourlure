import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as Base64 from "js-base64";
import {
  ContactShadows,
  Environment,
  Loader,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

import "assets/scss/scss-pages/customize-lure.scss";
import TabSelectCustomize from "components/tab-select-customize/TabSelectCustomize";
import { useDispatch, useSelector } from "react-redux";
import {
  getAvailableMid,
  getColorMaterialByName,
  getDefaultMaterials,
  getMaterialsInfoBy,
  getNodesInfoBy,
  getVNNameMaterial,
  setDefaultTexture,
  submitCustomize,
  validateTexture,
} from "utils/product";
import { setCustomizeInfo } from "redux/customize-action/customize-info";
import { setMaterialId } from "redux/customize-action/customize-id";

import Loading from "components/Loading";
import ErrorLoad from "components/error-notify/ErrorLoad";
import ProductAPI from "api/product-api";
import YLButton from "components/custom-field/YLButton";
import { setCaptureModel } from "redux/customize-action/capture-model";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import DEFINELINK from "../routes/define-link";
import AddNameCustomize from "components/orther/AddNameCustomize";
import { Can } from "../ability/can";

const BE_SERVER = process.env.REACT_APP_API_URL;
const BE_FOLDER = process.env.REACT_APP_URL_FILE_DOWNLOAD;

function RenderModel(props) {
  const ref = useRef();

  const dispatch = props.dispatch;
  const model3d = props.model3d;

  const captureModel = props.captureModel;
  const handleExportModel = props.handleExportModel;
  let customizeInfo = props.customizeInfo;
  const modelUrl = `${BE_SERVER}${BE_FOLDER}${model3d}`;

  //Load default 3d model

  const [defaultMate, setDefaultMate] = useState();
  useEffect(() => {
    getDefaultMaterials(modelUrl).then((value) => {
      setDefaultMate(value);
      console.log("de", value);
    });
  }, [modelUrl]);

  //Load 3d model
  const { nodes, materials } = useGLTF(modelUrl);
  console.log(nodes);
  const [meshs, setMeshs] = useState([]);

  const [listNodes, setListNodes] = useState(getNodesInfoBy(nodes, "Mesh"));
  const [listMaterials, setListMaterials] = useState(
    getMaterialsInfoBy(materials, "MeshStandardMaterial", "MeshBasicMaterial")
  );
  // load texture

  useEffect(async () => {
    //load texture
    const promisesTextureDraw = (listNodes, customInfo) => {
      let promises = [];
      for (let i = 0; i < listNodes.length; i++) {
        promises.push(validateTexture(customInfo[i]));
      }
      return Promise.all(promises);
    };
    let textureLoader = new THREE.TextureLoader();

    promisesTextureDraw(listNodes, customizeInfo)
      .then((result) => {
        for (let i = 0; i < result.length; i++) {
          const r = result[i];

          if (r) {
            textureLoader.load(r, (textureResult) => {
              textureResult.flipY = false;
              textureResult.flipX = false;
              textureResult.flipZ = false;
              const material = new THREE.MeshPhysicalMaterial({
                map: textureResult,
                color: customizeInfo[i].color,
                name: customizeInfo[i].defaultName,
              });
              ref.current.children[i].material = material;
            });
          }
          // else
          if (customizeInfo[i].color && customizeInfo[i].color !== "") {
            const material = new THREE.MeshPhysicalMaterial({
              color: customizeInfo[i].color,
              name: customizeInfo[i].defaultName,
            });
            ref.current.children[i].material = material;
          } else if (defaultMate) {
            ref.current.children[i].material = defaultMate[i];
          }
        }
      })
      .catch((err) => console.log(err));
  }, [customizeInfo, listNodes, listMaterials]);

  //generate mesh to render
  useEffect(() => {
    let listMesh = [];
    for (let i = 0; i < listNodes.length; i++) {
      let node = listNodes[i];
      let item = {
        geometry: node.geometry,
        material: listMaterials[i],
      };

      listMesh.push(item);
    }
    setMeshs(listMesh);
  }, [customizeInfo, listNodes, listMaterials]);

  // Animate model

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20;
    ref.current.rotation.x = Math.cos(t / 4) / 8;
    ref.current.rotation.y = Math.sin(t / 4) / 8;
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
    if (captureModel.isCapture) {
      let scene = ref.current;
      let rerender = state.gl;
      rerender.domElement.getContext("webgl", { preserveDrawingBuffer: true });

      const camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        1,
        250
      );
      camera.position.set(0, 0, 4);

      scene = scene.parent;

      // Without 'preserveDrawingBuffer' set to true, we must render now
      rerender.render(scene, camera);
      let imgCapture = rerender.domElement.toDataURL("image/jpg", 0.5);

      let submitParams = {
        model3dId: captureModel.modelId,
        customizeId: captureModel.customizeId,
        name: captureModel.name,
        materials: customizeInfo,
        thumbnail: {
          content: imgCapture,
          name: "capture.jpg",
        },
      };

      handleExportModel(submitParams, captureModel.isEdit);
      rerender.domElement.getContext("webgl", { preserveDrawingBuffer: false });
      const action = setCaptureModel({ isCapture: false });
      dispatch(action);
    }
  });

  // Cursor showing current color
  const [hovered, setHovered] = useState(null);
  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${getColorMaterialByName(
      customizeInfo,
      hovered
    )}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"  /><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="15" y="63">${getVNNameMaterial(
      customizeInfo,
      hovered
    )}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`;
    document.getElementById(
      "customize-lure"
    ).style.cursor = `url('data:image/svg+xml;base64,${Base64.encode(
      hovered ? cursor : auto
    )}'), auto`;
  }, [hovered]);

  return (
    <group
      ref={ref}
      dispose={null}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(e.object.material.name);
      }}
      onPointerOut={(e) => e.intersections.length === 0 && setHovered(null)}
      onPointerMissed={() => {
        setHovered(null);
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
      }}
    >
      {meshs.length > 0 &&
        meshs.map((item, i) => (
          <mesh key={i} receiveShadow castShadow {...item} />
        ))}
    </group>
  );
}

function CanvasModel(props) {
  const history = useHistory();
  const captureModel = useSelector((state) => state.captureModel);
  const [exportStatus, setExportStatus] = useState({
    isLoading: false,
    isSuccess: false,
  });
  const handleExportModel = async (params, isEdit) => {
    setExportStatus({ ...exportStatus, isLoading: true });
    try {
      await submitCustomize(params, isEdit);
      setExportStatus({ isLoading: false, isSuccess: true });
      history.push(`${DEFINELINK.product}/detail/${captureModel.productId}`);
    } catch (e) {
      setExportStatus({ isLoading: false, isSuccess: false });
    }
  };

  return (
    <div className="customize">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4], fov: 50 }}
        id="customize-lure"
      >
        <ambientLight intensity={1} />
        <spotLight
          intensity={0.5}
          angle={1}
          penumbra={1}
          position={[10, 15, 10]}
          castShadow
        />
        <Suspense fallback={null}>
          <RenderModel
            dispatch={props.dispatch}
            customizeInfo={props.customizeInfo}
            model3d={props.model3d}
            captureModel={captureModel}
            handleExportModel={handleExportModel}
          />
          <Environment preset="sunset" background={false} />
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, -0.8, 0]}
            opacity={0.25}
            width={10}
            height={10}
            blur={1.5}
            far={0.8}
          />
        </Suspense>
        <OrbitControls />
      </Canvas>
      <Loader />
      <ListActionMaterials
        dispatch={props.dispatch}
        mId={props.mId}
        customizeInfo={props.customizeInfo}
      />
      <ExportCustomInformation
        dispatch={props.dispatch}
        exportStt={exportStatus}
      />
    </div>
  );
}

function ListActionMaterials(props) {
  const { dispatch, customizeInfo, mId } = props;

  function handleChangeMId(mId) {
    const action = setMaterialId(mId);
    dispatch(action);
  }

  return (
    <div className="list-group picker">
      {customizeInfo.length > 0 &&
        customizeInfo.map((item, i) => (
          <a
            onClick={() => handleChangeMId(item.materialId)}
            key={i}
            className={`list-group-item list-group-item-action pointer ${
              mId === item.materialId ? "list-group-active" : ""
            } ${!item.canAddImg && !item.canAddColor && " d-none"}`}
          >
            {item.vnName}
          </a>
        ))}
    </div>
  );
}

function ExportCustomInformation(props) {
  const dispatch = props.dispatch;
  const exportStt = props.exportStt;

  const [openDialog, setOpenDialog] = useState(false);
  const onCapture = () => {
    setOpenDialog(true);
  };
  return (
    <div className="export d-flex gap-1">
      <YLButton
        variant="warning"
        to={DEFINELINK.product + DEFINELINK.productShowCustomizes}
      >
        Hủy
      </YLButton>
      <Can do={"read-write"} on={"customer"}>
        <YLButton
          variant="primary"
          onClick={() => onCapture()}
          type={"button"}
          disabled={exportStt.isLoading}
          width={"70px"}
        >
          {exportStt.isLoading ? (
            <CircularProgress size={20} className="circle-progress" />
          ) : (
            "Xong"
          )}
        </YLButton>
      </Can>
      <AddNameCustomize open={openDialog} setOpen={setOpenDialog} />
    </div>
  );
}

export default function Customize(props) {
  const customizeInfo = useSelector((state) => state.customizeInfo);
  const mId = useSelector((state) => state.customizeId);

  const dispatch = useDispatch();
  const productId = new URLSearchParams(props.location.search).get("productId");
  const isEdit = new URLSearchParams(props.location.search).get("isEdit");
  const customizeId = new URLSearchParams(props.location.search).get(
    "customizeId"
  );

  console.log(productId, isEdit);
  const [product, setProduct] = useState({
    data: "",
    isLoading: true,
    isSuccess: false,
  });

  const fetchMaterialInfo = async (productId, isEdit) => {
    try {
      let response = {};
      if (String(isEdit).toLowerCase() === "true") {
        response = await ProductAPI.getMaterialsCustomizeId(customizeId);
      } else {
        response = await ProductAPI.getMaterialsInfoByProdId(productId);
      }
      if (response.materials) {
        response.defaultMaterials = response.materials;
        delete response.materials;
      }

      setProduct({
        data: response,
        isLoading: false,
        isSuccess: true,
      });

      const action = setCustomizeInfo(
        setDefaultTexture(response.defaultMaterials, isEdit)
      );

      const selectMIdAction = setMaterialId(
        getAvailableMid(response.defaultMaterials, 0)
      );

      const captureAction = setCaptureModel({
        modelId: response.modelId,
        customizeId: customizeId,
        isEdit: isEdit,
        productId: productId,
      });
      dispatch(captureAction);
      dispatch(action);
      dispatch(selectMIdAction);
    } catch (error) {
      console.log("fail to fetch data");
    }
  };

  useEffect(async () => {
    await fetchMaterialInfo(productId, isEdit);
    // await fetchProduct();

    document.getElementById("footer").style.display = "none";
  }, [productId, isEdit]);
  if (product.isLoading) {
    return <Loading hasLayout />;
  } else if (!product.isSuccess) {
    return <ErrorLoad hasLayout />;
  } else
    return (
      <div className={"over-screen"}>
        <div className="main-customize">
          <div className="col-sm-12 col-md-3">
            <TabSelectCustomize product={product} />
          </div>
          <div className="col-sm-12 col-md-9">
            <CanvasModel
              dispatch={dispatch}
              mId={mId}
              customizeInfo={customizeInfo}
              model3d={product.data.url}
            />
          </div>
        </div>
      </div>
    );
}
