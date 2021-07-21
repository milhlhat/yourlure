import React, { useEffect, useState } from "react";
import "../scss/manage-product-and-variant.scss";
import YlInputFormHook from "../../../../components/custom-field/YLInputFormHook";
import { useForm, useWatch } from "react-hook-form";
import {
  getProductByID,
  uploadMultiFiles,
} from "../../../../api/manager-product-api";
import { toast } from "react-toastify";
import { createImageUrlByLinkOrFile } from "../../../../utils/manager-product";
import YLButton from "../../../../components/custom-field/YLButton";
import DEFINELINK from "../../../../routes/define-link";
import {
  createVariant,
  getVariant,
  updateVariant,
} from "../../../../api/manager-variant-api";
import { useHistory, useLocation } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SUPPORTED_IMAGE_FORMATS } from "../../../../constant/product-config";

function EditVariant(props) {
  const productId =
    props.location.state.productId ||
    new URLSearchParams(props.location.search).get("productId");
  const variantId =
    props.location.state.variantId ||
    new URLSearchParams(props.location.search).get("variantId");

  console.log(props, variantId);
  const parentRedirect = props.location?.state?.parentPath;
  const parent =
    DEFINELINK.manager + DEFINELINK.managementProduct + "/edit/" + productId;

  const schema = yup.object().shape({
    variantName: yup
      .string()
      .typeError("Tên không được để trống")
      .required("Tên sản phẩm không được để trống"),
    newPrice: yup
      .number()
      .typeError("Giá không được để trống")
      .min(1, "Giá phải lớn hơn 0"),
    quantity: yup
      .number()
      .typeError("Số lượng không được để trống")
      .min(1, "Số lượng phải lớn hơn 0"),
    fileUpload: yup
      .mixed()
      .test("fileType", "Vui lòng chọn 1 ảnh", (value) => {
        return value;
      })
      .test("fileType", "Vui lòng chọn ảnh .png, .jpg, .jpeg", (value) => {
        if (typeof value === "string") return true;
        if (value) {
          return SUPPORTED_IMAGE_FORMATS.includes(value?.type);
        } else {
          return false;
        }
      }),
  });
  const methods = useForm({ resolver: yupResolver(schema) });
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    register,
  } = methods;

  const history = useHistory();
  const watchFileUpload = useWatch({
    control,
    name: "fileUpload",
    defaultValue: null,
  });

  const handleDeleteFile = () => {
    setValue("file", null);
    setValue("fileUpload", null);
  };

  const submitVariant = async (data) => {
    if (typeof data.fileUpload !== "string") {
      const fileUpload = await uploadMultiFiles([data.fileUpload]);
      data.imageUrl = fileUpload[0];
    }

    await updateVariant(variantId, data);
    history.push(parentRedirect || parent);
  };

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    setValue("fileUpload", file);
  };
  const fetchVariant = async (id) => {
    try {
      const response = await getVariant(id);
      console.log(response);

      setValue("productId", productId);
      setValue("variantId", id);
      setValue("newPrice", response.newPrice);
      setValue("variantName", response.variantName);
      setValue("quantity", response.quantity);
      setValue("fileUpload", response.imageUrl);
    } catch (e) {
      console.log(e);
      toast.warn("Lỗi tải giá mặc định.");
    }
  };

  useEffect(() => {
    fetchVariant(variantId);
  }, [variantId]);

  return (
    <div className={"bg-box py-5"}>
      {" "}
      <form onSubmit={handleSubmit(submitVariant)}>
        <h3 className={"text-center mb-3"}>Sửa biến thể</h3>

        <table className={"table-variant-add-new"}>
          <tbody>
            <tr>
              <td>
                <YlInputFormHook
                  name={"variantName"}
                  methods={methods}
                  label={"Tên biến thể"}
                  placeholder={""}
                  isRequired
                />
              </td>
              <td>
                <YlInputFormHook
                  name={"newPrice"}
                  methods={methods}
                  label={"Giá (\u20AB)"}
                  placeholder={"\u20AB"}
                  type={"number"}
                  step={"any"}
                  isRequired
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <YlInputFormHook
                  name={"quantity"}
                  methods={methods}
                  label={"Số lượng"}
                  type={"number"}
                  placeholder={""}
                  isRequired
                />
              </td>
            </tr>
            <tr>
              <td>
                <div className={"file-variant-width"}>
                  <label htmlFor={"fileVariant"} className="form-label">
                    Hình ảnh
                    <span className="error-message"> (*)</span>
                  </label>

                  <input
                    type="file"
                    className={`form-control ${
                      errors?.file ? "outline-red" : ""
                    }`}
                    id={"fileVariant"}
                    {...register("file")}
                    onChange={handleChangeFile}
                  />
                  <span className="error-message">
                    {errors?.fileUpload?.message}
                  </span>
                </div>
              </td>
              <td>
                {watchFileUpload && (
                  <div className={"thumbnail-variant"}>
                    <img
                      src={createImageUrlByLinkOrFile(watchFileUpload)}
                      className={"variant-image"}
                    />
                    <i
                      className="fad fa-times-circle delete-img pointer h5"
                      onClick={handleDeleteFile}
                    />
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <div className={"d-flex justify-content-center gap-3"}>
          <YLButton
            variant={"danger"}
            to={parentRedirect || parent}
            width={"70px"}
          >
            Huỷ
          </YLButton>

          <YLButton type={"submit"} variant={"primary"} width={"150px"}>
            Cập nhật
          </YLButton>
        </div>
      </form>
    </div>
  );
}

export default EditVariant;
