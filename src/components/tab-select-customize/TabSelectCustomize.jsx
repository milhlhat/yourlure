import React, { useEffect, useState } from "react";

import { connect, useDispatch, useSelector } from "react-redux";
import YLButton from "components/custom-field/YLButton";

import { setMaterialId } from "redux/customize-action/customize-id";
import { HexColorPicker } from "react-colorful";
import { setCustomizeInfo } from "redux/customize-action/customize-info";
import AddTextToModelTab from "./AddTextToModelTab";
import { getMaterialByMId } from "utils/product";

function TabSelectCustomize(props) {
  const [tabSelect, setTabSelect] = useState(0);
  const [isOpen, setIsOpisOpen] = useState(true);
  const materials = props.customizeInfo;
  //   const baseProduct = props.product;
  console.log(materials);
  const dispatch = useDispatch();
  const mId = useSelector((state) => state.customizeId);

  const [currentMaterial, setCurrentMaterial] = useState([]);

  useEffect(() => {
    setCurrentMaterial(getMaterialByMId(mId, materials));
  }, [materials, mId]);
  const tablist = [
    {
      name: "Ảnh",
      component: <AddTextToModelTab />,
    },
    {
      name: "Màu",
      component: <ColorChoices mId={mId} currentMaterial={currentMaterial} />,
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
        <div className="texture-action"></div>
      </div>
      <div className={`tab-detail ${!isOpen ? "d-none" : ""}`}>
        <div className="tab-detail-close pointer p-0 m-0">
          <i
            onClick={() => setIsOpisOpen(false)}
            className={`fad fa-times-circle `}
          ></i>
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
    let m = mId <= 0 ? materials.length - 1 : mId - 1;
    const action = setMaterialId(materials[m].materialId);
    dispatch(action);
  }
  function increaseMId() {
    let m = mId >= materials.length - 1 ? 0 : mId + 1;
    const action = setMaterialId(materials[m].materialId);
    dispatch(action);
  }

  function getSelectMatNameByMatId(id, materials) {
    if (materials.length > 0) {
      for (let i = 0; i < materials.length; i++) {
        if (materials[i].materialId === id) return materials[i].vnName;
      }
    }
    return "";
  }
  return (
    <div className="d-flex align-items-center justify-content-center switch">
      <button
        className="border-0 bg-transparent pointer switch-button"
        onClick={() => decreaseMId()}
      >
        <i className="fa fa-angle-left"></i>
      </button>
      <span className="mx-3">{getSelectMatNameByMatId(mId, materials)}</span>
      <button
        className="border-0 bg-transparent pointer switch-button"
        onClick={() => increaseMId()}
      >
        <i className="fa fa-angle-right"></i>
      </button>
    </div>
  );
}

function ColorChoices(props) {
  const mId = props.mId;
  const currentMaterial = props.currentMaterial;

  const dispatch = useDispatch();
  const imgRedux = useSelector((state) => state.customizeInfo);

  function handleSetColor(color) {
    let list = JSON.parse(JSON.stringify(imgRedux));

    for (let i = 0; i < list.length; i++) {
      if (list[i].materialId === mId) {
        list[i].color = color;
      }
    }
    let action = setCustomizeInfo(list);
    dispatch(action);
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
    <div className="d-flex flex-column w-100">
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
            className="color-option-picker"
            onChange={(color) => handleSetColor(color)}
          />
          <div className="text-center mt-3">
            <YLButton
              variant="negative"
              value="Không màu"
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
