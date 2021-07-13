import React, { useState, useEffect, useRef, useCallback } from "react";
import { getUniqueFiles } from "../../../utils/prototype";

function ChooseProductImage(props) {
  const { methods, name, imgList } = props;
  // const [fileImages, setFileImage] = useState();

  const BE_SERVER = process.env.REACT_APP_API_URL;
  const BE_FOLDER = process.env.REACT_APP_URL_FILE_DOWNLOAD;

  const imagesRef = useRef([]);
  const imageHandleChange = (e) => {
    let file = Array.from(e.target.files);

    if (file) {
      document.getElementById(e.target.id).value = [];
      let display = imagesRef.current;
      imagesRef.current = getUniqueFiles(display.concat(imgList));
    }
  };

  const handleDeleteImage = (e) => {
    let files = [];
    for (let i = 0; i < imagesRef.current.length; i++) {
      if (e.target.id !== "imgUpload" + i) {
        files.push(imagesRef.current[i]);
      }
    }
    imagesRef.current = files;
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
  const RenderPhotos = (files, display, setDisplay) => {
    if (files?.length <= 0) return <span>Chưa có hình ảnh</span>;
    return files?.map((file, i) => {
      return (
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
      );
    });
  };

  useEffect(() => {
    let display = imagesRef.current;
    imagesRef.current = getUniqueFiles(display.concat(imgList));
  }, [imgList]);

  const {
    formState: { errors },
  } = methods;

  return (
    <div className="product-info bg-white bg-shadow col-12 col-md-8 mb-md-5 mb-2 pb-2">
      <div className="px-3 pt-3 product-images-add">
        <h5>
          Hình ảnh <span className="error-message">(*)</span>
        </h5>
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
      <hr />
      <div className="px-3 manager-product-imgList">
        {RenderPhotos(imagesRef.current)}
      </div>
      <br />
      <span className="error-message">{errors[name]?.message}</span>
    </div>
  );
}

export default ChooseProductImage;
