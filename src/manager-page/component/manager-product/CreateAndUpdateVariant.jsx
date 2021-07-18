import React, { useEffect } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import YlInputFormHook from "../../../components/custom-field/YLInputFormHook";
import { Tooltip } from "@material-ui/core";
import YLButton from "../../../components/custom-field/YLButton";

function CreateAndUpdateVariant(props) {
  const { methods, name } = props;
  const { control, register, watch } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
  });

  return (
    <div className="product-info bg-white bg-shadow col-12 col-md-8 mb-md-5 mb-2 pb-2">
      <h5 className="px-3 pt-3 ">
        Biến thể <span className="error-message"> (*)</span>
      </h5>
      {/*</div>*/}
      <hr />
      <table className={"table-variant"}>
        <thead>
          <tr>
            <td colSpan={"2"} className={"w-25"}>
              Ảnh <span className="error-message"> (*)</span>
            </td>

            <td>
              Tên biến thể <span className="error-message"> (*)</span>
            </td>
            <td>
              Giá <span className="error-message"> (*)</span>
            </td>
            <td>
              Số lượng <span className="error-message"> (*)</span>
            </td>
            <td />
          </tr>
        </thead>
        <tbody>
          {fields?.map(
            ({ id, quantity, variantName, newPrice, imageUrl }, index) => (
              <tr key={id}>
                <td className="img-item" key={name + index}>
                  <img
                    id={"variant" + index}
                    // src={createImageUrl(imageUrl)}
                    key={index}
                    className="pointer"
                    // onClick={(e) => handleDeleteImage(e)}
                    alt={"Mồi"}
                  />
                  <button className="btn btn-light">Xóa</button>
                </td>
                <td>
                  <input type={"file"} hidden id={"variantFile" + index} />
                  <Tooltip
                    title="Thêm ảnh"
                    placement="right"
                    className={"pointer m-3"}
                  >
                    <label htmlFor={"variantFile" + index}>
                      <i className="fal fa-file-image  file-variant-icon" />
                    </label>
                  </Tooltip>
                </td>

                <td>
                  <YlInputFormHook
                    name={"variantName"}
                    methods={methods}
                    label={""}
                    placeholder={"Tên (*)"}
                    defaultValue={variantName}
                  />
                </td>
                <td>
                  <YlInputFormHook
                    name={"newPrice"}
                    methods={methods}
                    label={""}
                    placeholder={"Giá (*)"}
                    defaultValue={newPrice}
                  />
                </td>
                <td>
                  <YlInputFormHook
                    name={"quantity"}
                    methods={methods}
                    label={""}
                    placeholder={"Số lượng (*)"}
                    defaultValue={quantity}
                  />
                </td>
                <td>
                  <Tooltip
                    title="Ngừng kinh doanh"
                    placement="right"
                    className={"pointer m-3"}
                  >
                    <i className="fad fa-ban" />
                  </Tooltip>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <div className={"d-flex justify-content-center"}>
        <YLButton variant={"light"} type={"button"}>
          Thêm biến thể
        </YLButton>
      </div>
    </div>
  );
}

export default CreateAndUpdateVariant;
