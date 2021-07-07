import YLButton from "components/custom-field/YLButton";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImgTexturesByImgId, getMaterialByMId } from "utils/product";
import { setCustomizeInfo } from "redux/customize-action/customize-info";
import { HexColorPicker } from "react-colorful";

function AddTextToModelTab(props) {
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

  const canvasRef = React.useRef(null);
  const imgRef = React.useRef(new Image());
  // const textAttributeDebounceRef = React.useRef();
  const fonts = [
    "Big Shoulders Display",
    "Festive",
    "Grenze Gotisch",
    "Qwigley",
    "Dancing Script",
    "Sriracha",
  ];
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

  function scalePreserveAspectRatio(imgW, imgH, maxW, maxH) {
    return Math.min(maxW / imgW, maxH / imgH);
  }

  function draw(ctx, textInput) {
    //
    const canvas = canvasRef.current;

    let w = img.width;
    let h = img.height;

    // resize img to fit in the canvas
    // You can alternately request img to fit into any specified width/height
    let sizer = scalePreserveAspectRatio(w, h, canvas.width, canvas.height);

    // resize canvas height to fit with the image
    canvas.height = h * sizer;
    ctx.drawImage(img, 0, 0, w, h, 0, 0, w * sizer, h * sizer);

    let textSize = textAttribute.textSize ? textAttribute.textSize : 100;
    let fontFamily = textAttribute.textFont ? textAttribute.textFont : fonts[0];
    let textColor = textAttribute.textColor
      ? textAttribute.textColor
      : "#0000FF";
    // write text to canvas
    ctx.fillStyle = textColor;
    //  "50px 'Kirang Haerang'";
    ctx.font = textSize + "px " + fontFamily;
    console.log("font:", ctx.font);

    let textString = textInput ? textInput : currentMaterial.text;

    let textWidth = ctx.measureText(textString).width;

    console.log("text width size:", textSize);
    ctx.fillText(
      textString,
      canvas.width / 2 - textWidth / 2,
      img.height / 2 + textSize / 2
    );
  }

  async function handleChangeImg(img, imgId, textInput) {
    //DRAW CANVAS
    img = img ? img : getImgTexturesByImgId(currentMaterial);
    await setUrlImage(img);
    const canvas = canvasRef.current;
    const ctx = await canvas.getContext("2d");
    draw(ctx, textInput);
    const myImage = await canvasRef.current.toDataURL("image/png");

    //TEXT ATTRIBUTE
    const textColor = textAttribute.textColor;
    const textFont = textAttribute.textFont;
    const textSize = textAttribute.textSize;

    let list = JSON.parse(JSON.stringify(customizeInfo));
    for (let i = 0; i < list.length; i++) {
      if (list[i].materialId === mId) {
        list[i].img = myImage;
        if (imgId) {
          list[i].imgId = imgId;
          console.log("img", imgId);
        }
        if (textInput) {
          list[i].text = textInput;
        }
        list[i].textColor = textColor;

        list[i].textFont = textFont !== "" ? textFont : fonts[0];

        list[i].textSize = textSize;
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

  function setUrlImage(url) {
    url = BE_SERVER + BE_FOLDER + url;
    return new Promise(function (resolve, reject) {
      img.onload = function () {
        resolve(url);
      };
      img.onerror = function () {
        reject(url);
      };
      img.src = url;
    });
  }

  function CanvasText() {
    return (
      <canvas
        className="d-none"
        ref={canvasRef}
        // width={img.width ? img.width : 500}
        // height={img.height ? img.height : 500}
        width={500}
        height={500}
      />
    );
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
            {/* <YLButton variant="negative" type="button" value="Không dùng ảnh" onClick={handleRemoveImg} /> */}

            {/* <YLButton variant="primary" type="button" value="Upload ảnh" disabled /> */}
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
                />
              </div>

              <div className={"group-select-text-attribute"}>
                <select
                  className={"form-select select-font"}
                  style={{
                    fontFamily: textAttribute.textFont
                      ? textAttribute.textFont
                      : fonts[0],
                  }}
                  onChange={(e) =>
                    // handleChangeTextAttribute(null, e.target.value, null)
                    setTextAttribute({
                      ...textAttribute,
                      textFont: e.target.value,
                    })
                  }
                >
                  {fonts.map((item, i) => (
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
                <p className="text-danger">Vui lòng chọn 1 texture</p>
              )}
              <CanvasText />
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
