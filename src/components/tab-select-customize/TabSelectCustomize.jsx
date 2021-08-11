import React, { useEffect, useState } from "react";

import { connect, useDispatch, useSelector } from "react-redux";
import YLButton from "components/custom-field/YLButton";

import { setMaterialId } from "store/customize-action/customize-id";
import { HexColorPicker } from "react-colorful";
import { setCustomizeInfo } from "store/customize-action/customize-info";
import AddTextToModelTab from "./AddTextToModelTab";
import {
  getDecreaseId,
  getIncreaseId,
  getMaterialByMId,
  getPositionSelectedByMId,
  getSelectMatNameByMatId,
} from "utils/product";
import CustomizePrice from "./CustomizePrice";

function TabSelectCustomize(props) {
  const [tabSelect, setTabSelect] = useState(0);
  const [isOpen, setIsOpisOpen] = useState(true);
  const materials = props.customizeInfo;
  //   const baseProduct = props.product;

  const dispatch = useDispatch();
  const mId = useSelector((state) => state.customizeId);

  const [currentMaterial, setCurrentMaterial] = useState([]);

  useEffect(() => {
    setCurrentMaterial(getMaterialByMId(mId, materials));
  }, [materials, mId]);
  const tablist = [
    {
      name: "Màu",
      component: <ColorChoices mId={mId} currentMaterial={currentMaterial} />,
    },
    {
      name: "Ảnh",
      component: <AddTextToModelTab />,
    },
    {
      name: "Giá",
      component: <CustomizePrice />,
    },
  ];

  function handleClickTab(i) {
    setTabSelect(i);
    setIsOpisOpen(true);
  }

  return (
    <div className="tab-custom">
      <div className="tab-menu">
        {tablist.map((tab, i) => (
          <div
            className={`${tabSelect === i ? "selected" : ""} texture-action`}
            key={i}
            onClick={() => handleClickTab(i)}
          >
            {tab.name}
          </div>
        ))}
        <div className="texture-action" />
      </div>
      <div className={`tab-detail ${!isOpen ? "d-none" : ""}`}>
        <div className="tab-detail-close pointer p-0 m-0">
          <i
            onClick={() => setIsOpisOpen(false)}
            className={`fad fa-times-circle `}
          />
        </div>

        <SwitchMaterial materials={materials} mId={mId} />
        {/* tab-detail */}
        {isOpen && <div className="detail">{tablist[tabSelect].component}</div>}
      </div>
    </div>
  );
}

function SwitchMaterial(props) {
  let materials = props.materials;
  const mId = props.mId;
  const dispatch = useDispatch();

  function decreaseMId() {
    const currentPosition = getPositionSelectedByMId(mId, materials);
    const tempMaterialSelect =
      currentPosition <= 0
        ? getDecreaseId(materials, materials.length - 1)
        : getDecreaseId(materials, currentPosition - 1);
    if (tempMaterialSelect) {
      const action = setMaterialId(materials[tempMaterialSelect].materialId);
      dispatch(action);
    }
  }

  function increaseMId() {
    const currentPosition = getPositionSelectedByMId(mId, materials);
    const tempMaterialSelect =
      currentPosition >= materials.length - 1
        ? getIncreaseId(materials, 0)
        : getIncreaseId(materials, currentPosition + 1);
    if (tempMaterialSelect) {
      const action = setMaterialId(materials[tempMaterialSelect].materialId);
      dispatch(action);
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center switch">
      <button
        className="border-0 bg-transparent pointer switch-button"
        onClick={() => decreaseMId()}
      >
        {mId && <i className="fa fa-angle-left" />}
      </button>
      <span className="mx-3">{getSelectMatNameByMatId(mId, materials)}</span>
      <button
        className="border-0 bg-transparent pointer switch-button"
        onClick={() => increaseMId()}
      >
        {mId && <i className="fa fa-angle-right" />}
      </button>
    </div>
  );
}

function ColorChoices(props) {
  const mId = props.mId;
  const currentMaterial = props.currentMaterial;

  const dispatch = useDispatch();
  const imgRedux = useSelector((state) => state.customizeInfo);

  const colorDebounceRef = React.useRef();

  function handleSetColor(color) {
    if (colorDebounceRef.current) {
      clearTimeout(colorDebounceRef.current);
    }

    colorDebounceRef.current = setTimeout(() => {
      let list = JSON.parse(JSON.stringify(imgRedux));

      for (let i = 0; i < list.length; i++) {
        if (list[i].materialId === mId) {
          list[i].color = color;
        }
      }
      let action = setCustomizeInfo(list);
      dispatch(action);
    }, 300);
  }

  function handleRemoveColor() {
    let list = JSON.parse(JSON.stringify(imgRedux));
    for (let i = 0; i < list.length; i++) {
      if (list[i].materialId === mId) {
        list[i].color = "";
      }
    }

    let action = setCustomizeInfo(list);
    dispatch(action);
  }

  return (
    <div className="group-change-color-tab">
      {currentMaterial?.canAddColor ? (
        <>
          {/* <div className="color-option">
            {color.map((value, index) => (
              <Link
                style={{ background: value }}
                key={index}
                onClick={() => handleSetColor(value)}
              />
            ))}
          </div> */}
          <HexColorPicker
            color={currentMaterial.color ? currentMaterial.color : "#000000"}
            className="color-option-picker"
            onChange={(color) => handleSetColor(color)}
          />
          <div className="text-center mt-3">
            <YLButton
              variant="negative"
              value="Xoá màu"
              onClick={handleRemoveColor}
            />
          </div>
        </>
      ) : (
        <span>Bộ phận không hỗ trợ sử dụng màu</span>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({ customizeInfo: state.customizeInfo });
export default connect(mapStateToProps)(TabSelectCustomize);
