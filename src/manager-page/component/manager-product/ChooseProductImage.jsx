import React, { memo, useEffect, useState } from "react";
import { getUniqueFiles } from "../../../utils/prototype";
import { useFieldArray, useWatch } from "react-hook-form";
import ManagerProductAPI from "../../../api/manager-product-api";
import { createImageUrlByLinkOrFile } from "../../../utils/manager-product";

function ChooseProductImage(props) {
  const { name, productId, methods } = props;
  const { setValue, control } = methods;
  const { fields, append, remove } = useFieldArray({ control, name: name });

  const [newImages, setnewImages] = useState([]);
  const [removeImages, setRemoveImages] = useState([]);

  const BE_SERVER = process.env.REACT_APP_API_URL;
  const BE_FOLDER = process.env.REACT_APP_URL_FILE_DOWNLOAD;

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
        removelist.push(fields[index].linkImage);
        setRemoveImages(removelist);
        remove(index);
        setValue("imgListRemove", removelist);
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
              src={createImageUrlByLinkOrFile(field.linkImage)}
              className="pointer"
              onClick={(e) => handleDeleteOldImage(e)}
              alt={"Mồi câu"}
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
                alt={"Mới"}
              />
              <button className="btn btn-light">Xóa</button>
            </div>
          ))}
      </>
    );
  };

  const fetchImgByProductId = async (productId) => {
    try {
      remove();
      const response = await ManagerProductAPI.getProductByID(productId);
      append(response.imageCollection);
    } catch (error) {}
  };

  useEffect(async () => {
    await fetchImgByProductId(productId);
  }, [productId]);

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
        <RenderPhotos newImages={newImages} />
      </div>
      <br />
      <span className="error-message">{errors[name]?.message}</span>
    </div>
  );
}

export default memo(ChooseProductImage, (preProps, nextProps) => {
  return preProps.productId === nextProps.productId;
});
