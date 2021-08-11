import YLButton from "components/custom-field/YLButton";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMaterialByMId } from "utils/product";
import { setCustomizeInfo } from "store/customize-action/customize-info";
import { HexColorPicker } from "react-colorful";
import { FONTS_CUSTOMIZE } from "../../constants/product-config";

function AddTextToModelTab() {
  const BE_SERVER = process.env.REACT_APP_API_URL;
  const BE_FOLDER = process.env.REACT_APP_URL_FILE_DOWNLOAD;

  const [isWarning, setIsWarning] = useState(false);
  const [text, setText] = useState("");
  const [textAttribute, setTextAttribute] = useState({
    textFont: "",
    textColor: "#0000FF",
    textSize: 20,
  });

  const [currentMaterial, setCurrentMaterial] = useState([]);
  const dispatch = useDispatch(setCustomizeInfo);
  const customizeInfo = useSelector((state) => state.customizeInfo);
  const mId = useSelector((state) => state.customizeId);

  const imgRef = React.useRef(new Image());

  const textSizes = [20, 40, 60, 80, 100, 120, 150, 200];

  let img = imgRef.current;
  img.crossOrigin = "anonymous";

  useEffect(async () => {
    setCurrentMaterial(getMaterialByMId(mId, customizeInfo));
    // await setUrlImage(customizeInfo.img);
  }, [customizeInfo, mId]);

  function handleChangeInputAddText(e) {
    const value = e.target.value;
    setText(value);
  }

  function handleChangeImg(img, imgId, textInput) {
    //TEXT ATTRIBUTE
    const textColor = textAttribute.textColor;
    const textFont = textAttribute.textFont;
    const textSize = textAttribute.textSize;

    let list = JSON.parse(JSON.stringify(customizeInfo));
    for (let i = 0; i < list.length; i++) {
      if (list[i].materialId === mId) {
        if (img) {
          list[i].img = img;
        }
        if (imgId) {
          list[i].imgId = imgId;
          console.log("img", imgId);
        }
        if (textInput) {
          list[i].text = textInput;
        }
        list[i].textColor = textColor;

        list[i].textFont = textFont !== "" ? textFont : FONTS_CUSTOMIZE[0];

        list[i].textSize = textSize;
      }
    }

    let action = setCustomizeInfo(list);
    dispatch(action);
  }

  function removeImg() {
    let list = JSON.parse(JSON.stringify(customizeInfo));
    for (let i = 0; i < list.length; i++) {
      if (list[i].materialId === mId) {
        list[i].img = "";
        list[i].imgId = "";
        list[i].text = "";
      }
    }

    let action = setCustomizeInfo(list);
    dispatch(action);
  }

  function applyText() {
    if (currentMaterial.imgId) {
      handleChangeImg(null, null, text);
    } else {
      setIsWarning(true);
    }
  }

  return (
    <div className="group-change-img-tab ">
      {currentMaterial?.canAddImg ? (
        <>
          <div className="img-option">
            {currentMaterial.textures?.map((item) => (
              // <>
              <img
                className={`${
                  item.textureId === currentMaterial.imgId ? "img-active" : ""
                }`}
                src={BE_SERVER + BE_FOLDER + item.textureUrl}
                key={"texture" + mId + item.textureId}
                width={50}
                height={50}
                onClick={() =>
                  handleChangeImg(item.textureUrl, item.textureId, null)
                }
              />
              // </>
            ))}
          </div>
          <div className="d-flex flex-column mt-3 align-items-center">
            <YLButton
              variant="negative"
              type="button"
              value="Không dùng ảnh"
              onClick={() => removeImg()}
            />

            {/*<YLButton variant="primary" type="button" value="Upload ảnh" disabled /> */}
          </div>
          {currentMaterial?.canAddText && (
            <div className="w-100 d-flex align-items-center flex-column px-1 gap-3">
              <hr className="hr my-3" />
              <div className={"w-100"}>
                <span className={"label"}>Ký hiệu, tên riêng</span>
                <input
                  type="text"
                  placeholder={"Tối đa 30 ký tự"}
                  className="form-control w-100"
                  defaultValue={currentMaterial.text}
                  onChange={(e) => handleChangeInputAddText(e)}
                  maxLength="30"
                />
              </div>

              <div className={"group-select-text-attribute"}>
                <select
                  className={"form-select select-font"}
                  style={{
                    fontFamily: textAttribute.textFont
                      ? textAttribute.textFont
                      : FONTS_CUSTOMIZE[0],
                  }}
                  onChange={(e) =>
                    // handleChangeTextAttribute(null, e.target.value, null)
                    setTextAttribute({
                      ...textAttribute,
                      textFont: e.target.value,
                    })
                  }
                >
                  {FONTS_CUSTOMIZE.map((item, i) => (
                    <option
                      key={`fontFamily-${i}`}
                      value={item}
                      style={{ fontFamily: item }}
                    >
                      {item}
                    </option>
                  ))}
                </select>
                <select
                  className={"form-select"}
                  onChange={(e) => {
                    // handleChangeTextAttribute(null, null, e.target.value)
                    setTextAttribute({
                      ...textAttribute,
                      textSize: e.target.value,
                    });
                  }}
                >
                  {textSizes.map((item, i) => (
                    <option key={`text-size-${i}`} value={item}>
                      {item + "px"}
                    </option>
                  ))}
                </select>
              </div>
              <HexColorPicker
                className="color-option-picker"
                color={
                  textAttribute.textColor ? textAttribute.textColor : "#000000"
                }
                onChange={(color) => {
                  // handleChangeTextAttribute(color, null, null)
                  setTextAttribute({ ...textAttribute, textColor: color });
                }}
              />
              <YLButton
                width={"100px"}
                variant="primary"
                type="button"
                name="canvasText"
                onClick={() => {
                  applyText();
                }}
              >
                Thêm
              </YLButton>
              {isWarning && !currentMaterial.imgId && (
                <p className="text-danger text-center">
                  <i className="fad fa-image" /> Vui lòng chọn 1 ảnh để thêm chữ
                </p>
              )}
            </div>
          )}
        </>
      ) : (
        <span>Bộ phận không hỗ trợ sử dụng hình ảnh</span>
      )}
    </div>
  );
}

export default AddTextToModelTab;
