import React, { useState } from "react";
import PropTypes from "prop-types";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { createImageUrlByLinkOrFile } from "../../../utils/manager-product";
import { getNodesInfoBy, validateTexture } from "../../../utils/product";
import * as THREE from "three";
import { getMaterialsCustomizeId } from "../../../api/product-api";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import CircularProgress from "@material-ui/core/CircularProgress";

ExportGlb.propTypes = {
  customModelId: PropTypes.number.isRequired,
};

function ExportGlb(props) {
  const customModelId = props.customModelId;
  const [isDownloading, setIsDownloading] = useState(false);
  const promisesTextureDraw = (listNodes, customInfo) => {
    let promises = [];
    for (let i = 0; i < listNodes.length; i++) {
      promises.push(validateTexture(customInfo[i]));
    }
    return Promise.all(promises);
  };
  function saveArrayBuffer(buffer) {
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    const a = document.createElement("a");
    a.style.display = "none";

    a.href = URL.createObjectURL(blob);
    const d = new Date();
    let filename =
      d.getDate() +
      "-" +
      (d.getMonth() + 1) +
      "-" +
      d.getFullYear() +
      " " +
      Date.now();

    a.download = filename;
    a.click();
  }
  const exportCustomize = async (cusId) => {
    setIsDownloading(true);
    const response = await getMaterialsCustomizeId(cusId);
    const materials = response.materials;
    let url = createImageUrlByLinkOrFile(response?.url);
    const textureLoader = new THREE.TextureLoader();
    let loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/examples/js/libs/draco/");
    loader.setDRACOLoader(dracoLoader);
    loader.load(url, function (gltf) {
      const scene = gltf.scene;
      let nodes = scene.children[0].children;

      nodes = getNodesInfoBy(nodes, "Mesh");
      console.log("before", nodes);
      // console.log(gltf.scene);
      //load texture

      promisesTextureDraw(nodes, materials)
        .then((result) => {
          for (let i = 0; i < result.length; i++) {
            const r = result[i];
            console.log(r);
            if (r) {
              textureLoader.load(r, (textureResult) => {
                textureResult.flipY = false;
                textureResult.flipX = false;
                textureResult.flipZ = false;
                gltf.scene.children[0].children[i].material =
                  new THREE.MeshPhysicalMaterial({
                    map: textureResult,
                    color: materials[i].color,
                  });
              });
            }
            // else
            if (materials[i].color && materials[i].color !== "") {
              gltf.scene.children[0].children[i].material =
                new THREE.MeshPhysicalMaterial({
                  color: materials[i].color,
                });
            }
          }
          //export file glb
          console.log("after", gltf.scene.children[0]);
          const exporter = new GLTFExporter();
          exporter.parse(
            scene,
            function (result) {
              saveArrayBuffer(result);
            },
            { binary: true }
          );
        })
        .catch((err) => console.log(err));
      setIsDownloading(false);
    });
  };

  return (
    <div onClick={() => exportCustomize(customModelId)}>
      {isDownloading ? (
        <CircularProgress size={15} className="circle-progress" />
      ) : (
        <i className="fal fa-file-export text-success" />
      )}
    </div>
  );
}

export default ExportGlb;
