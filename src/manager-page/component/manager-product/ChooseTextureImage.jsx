import React, { useEffect, useState, useMemo, memo } from "react";
import { getUniqueFiles } from "../../../utils/prototype";

function ChooseTextureImage(props) {
  console.log("render ChooseTextureImage");
  const { name, imgList, methods } = props;
  const { setValue } = methods;
  const [fileImages, setFileImage] = useState([]);

  const BE_SERVER = process.env.REACT_APP_API_URL;
  const BE_FOLDER = process.env.REACT_APP_URL_FILE_DOWNLOAD;

  const imageHandleChange = async (e) => {
    let file = Array.from(e.target.files);

    if (file) {
      try {
        // for (const fileElement of file) {
        //
        // }
        document.getElementById(e.target.id).value = [];
        const newFiles = getUniqueFiles(fileImages.concat(file));
        setFileImage(newFiles);
        setValue(name, newFiles);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleDeleteImage = (e) => {
    let newFiles = [];
    for (let i = 0; i < fileImages.length; i++) {
      if (e.target.id !== "imgUpload" + i) {
        newFiles.push(fileImages[i]);
      }
    }
    setFileImage(newFiles);
    setValue(name, newFiles);
  };
  const createImageUrl = (file) => {
    if (typeof file === "string") {
      if (file.startsWith("http")) {
        return file;
      }
      return BE_SERVER + BE_FOLDER + file;
    } else {
      return URL.createObjectURL(file);
    }
  };
  const RenderPhotos = ({ fileImages }) => {
    console.log(fileImages);

    return (
      <>
        {fileImages?.length > 0 &&
          fileImages.map((file, i) => (
            <div className="img-item" key={name + i}>
              <img
                id={"imgUpload" + i}
                src={createImageUrl(file)}
                key={i}
                className="pointer"
                onClick={(e) => handleDeleteImage(e)}
                alt={"Mồi câu"}
              />
              <button className="btn btn-light">Xóa</button>
            </div>
          ))}
      </>
    );
  };

  useEffect(() => {
    setFileImage(getUniqueFiles(fileImages.concat(imgList)));
  }, [imgList]);

  return (
    <div
      className={"product-images-add align-items-center boder-choose-texture "}
    >
      <div className="px-3 d-flex flex-wrap w-75">
        <RenderPhotos fileImages={fileImages} />
      </div>
      <div className={"ms-auto"}>
        <input
          type="file"
          hidden
          multiple
          id={name}
          accept={"image/*"}
          onChange={(e) => imageHandleChange(e)}
        />
        <label htmlFor={name} className="pointer">
          <i className="fal fa-images" /> Thêm hình ảnh
        </label>
      </div>
    </div>
  );
}

export default memo(ChooseTextureImage, (pre, nex) => {
  console.log(pre.imgList);
  console.log(nex.imgList);
  return pre.imgList === nex.imgList;
});
