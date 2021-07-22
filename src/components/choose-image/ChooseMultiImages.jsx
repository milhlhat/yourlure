import React, { memo, useEffect, useState } from "react";
import { getUniqueFiles } from "../../utils/prototype";
import { useFieldArray } from "react-hook-form";

import { createImageUrlByLinkOrFile } from "../../utils/manager-product";
import PropTypes from "prop-types";
import "./scss/choose-multi-images.scss";
ChooseMultiImages.propTypes = {
  name: PropTypes.string.isRequired,
  removeName: PropTypes.string.isRequired,
  getOldImage: PropTypes.func.isRequired, // recommend use useCallback
  fieldNameImgFromOldList: PropTypes.string.isRequired, // name of list response
  methods: PropTypes.any,
};

function ChooseMultiImages(props) {
  const { name, methods, removeName, getOldImage, fieldNameImgFromOldList } =
    props;
  const { setValue, control, register } = methods;

  const { fields, append, remove } = useFieldArray({ control, name: name });

  const [newImages, setnewImages] = useState([]);
  const [removeImages, setRemoveImages] = useState([]);

  const imageHandleChange = async (e) => {
    let files = Array.from(e.target.files);

    if (files) {
      document.getElementById(e.target.id).value = [];
      let temp = [...newImages];
      const newFiles = getUniqueFiles(temp.concat(files));
      setnewImages(newFiles);
      setValue("newImages", newFiles);
    }
  };
  const handleDeleteOldImage = (e) => {
    let removelist = [...removeImages];
    fields.forEach((item, index) => {
      if (e.target.id === "imgUploadOld" + index) {
        removelist.push(fields[index][fieldNameImgFromOldList]);
        setRemoveImages(removelist);
        remove(index);
        setValue(removeName, removelist);
      }
    });
  };
  const handleDeletenewImages = (e) => {
    let temp = [...newImages];
    const newFiles = temp.filter((item, index) => {
      return e.target.id !== "imgUploadNew" + index;
    });
    setValue("newImages", newFiles);
    setnewImages(newFiles);
  };

  const RenderPhotos = ({ newImages }) => {
    return (
      <>
        {fields?.map((field, index) => (
          <div className="img-item" key={field.id}>
            <img
              id={"imgUploadOld" + index}
              src={createImageUrlByLinkOrFile(field[fieldNameImgFromOldList])}
              className="pointer"
              onClick={(e) => handleDeleteOldImage(e)}
            />
            <button className="btn btn-light">Xóa</button>
          </div>
        ))}

        {newImages?.length > 0 &&
          newImages?.map((field, index) => (
            <div className="img-item" key={index + "imgUploadNew"}>
              <img
                id={"imgUploadNew" + index}
                src={createImageUrlByLinkOrFile(field)}
                className="pointer"
                onClick={(e) => handleDeletenewImages(e)}
                alt={"new image"}
              />
              <button className="btn btn-light">Xóa</button>
            </div>
          ))}
      </>
    );
  };

  const fetchImgByProductId = async () => {
    try {
      remove();
      // const response = await ManagerProductAPI.getProductByID(productId);
      const response = await getOldImage();
      append(response);
    } catch (error) {}
  };

  useEffect(async () => {
    await fetchImgByProductId();
  }, []);

  return (
    <div className="  bg-white  pb-2">
      <div className="px-3 pt-3 d-flex justify-content-between">
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
        <label htmlFor={name} className="pointer link-color">
          <h6>
            <i className="fal fa-images" /> Thêm hình ảnh
          </h6>
        </label>
      </div>
      <hr />
      <div className="px-3 manager-product-imgList">
        <RenderPhotos newImages={newImages} />
      </div>
    </div>
  );
}

export default memo(ChooseMultiImages, (preProps, nextProps) => {
  return preProps.productId === nextProps.productId;
});
