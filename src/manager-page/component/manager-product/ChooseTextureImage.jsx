import React, { memo, useState } from "react";
import { getUniqueFiles } from "../../../utils/prototype";
import { createImageUrlByLinkOrFile } from "../../../utils/manager-product";
import { useFieldArray } from "react-hook-form";

function ChooseTextureImage(props) {
  const { name, methods, nestedFieldIndex, materialId } = props;
  const fieldNewTextures = `newTextureFiles[${nestedFieldIndex}]`;
  const { setValue } = methods;

  const [newTextures, setNewTextures] = useState([]);

  const imageHandleChange = async (e) => {
    let files = Array.from(e.target.files);

    if (files) {
      document.getElementById(e.target.id).value = [];
      let temp = [...newTextures];
      const newFiles = getUniqueFiles(temp.concat(files));
      setNewTextures(newFiles);
      setValue(fieldNewTextures, {
        materialId: materialId || nestedFieldIndex,
        files: newFiles,
      });
    }
  };

  const handleDeleteImageNew = (e) => {
    let temp = [...newTextures];
    temp.forEach((item, index, thisFields) => {
      if (e.target.id === "textureNew" + index) {
        thisFields.splice(index, 1);
      }
    });
    setNewTextures(temp);
    setValue(fieldNewTextures, { materialId: materialId, files: temp });
  };

  const RenderPhotoOld = (props) => {
    const { name, methods } = props;
    const { setValue, control } = methods;
    const fieldTextures = `${name}.textures`;

    const { fields, remove } = useFieldArray({
      control,
      name: fieldTextures,
    });

    const [remoteTextures, setRemoveTextures] = useState([]);
    const handleDeleteImageOld = (e) => {
      let deletedFiles = [...remoteTextures];
      fields.forEach((field, index, thisFields) => {
        if (e.target.id === "textureOld" + index) {
          deletedFiles.push(thisFields[index].textureId);
          remove(index);
        }
      });
      setRemoveTextures(deletedFiles);
      setValue(`${name}.listIdTexturesRemove`, deletedFiles);
    };
    return (
      <>
        {fields?.length > 0 &&
          fields.map((field, i) => (
            // <span>{JSON.stringify(field)}</span>
            <div className="img-item" key={field.id}>
              <img
                id={"textureOld" + i}
                src={createImageUrlByLinkOrFile(field.textureUrl)}
                key={i}
                className="pointer"
                onClick={(e) => handleDeleteImageOld(e)}
                alt={"Mồi câu"}
              />
              <button className="btn btn-light">Xóa</button>
            </div>
          ))}
      </>
    );
  };

  const RenderPhotos = ({ newFiles }) => {
    return (
      <>
        {newFiles?.length > 0 &&
          newFiles.map((file, i) => (
            <div className="img-item" key={"textureNew" + i}>
              <img
                id={"textureNew" + i}
                src={createImageUrlByLinkOrFile(file)}
                key={i}
                className="pointer"
                onClick={(e) => handleDeleteImageNew(e)}
                alt={"Mồi"}
              />
              <button className="btn btn-light">Xóa</button>
            </div>
          ))}
      </>
    );
  };

  return (
    <div
      className={"product-images-add align-items-center boder-choose-texture "}
    >
      <div className="px-3 d-flex flex-wrap w-75">
        <RenderPhotoOld {...props} />
        <RenderPhotos newFiles={newTextures} />
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

export default memo(ChooseTextureImage, (prevProps, nextProps) => {
  return prevProps.name === nextProps.name;
});
