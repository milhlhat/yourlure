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
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function EditVariant(props) {
  const productId = new URLSearchParams(props.location.search).get("productId");
  const variantId = new URLSearchParams(props.location.search).get("variantId");

  const parent =
    DEFINELINK.manager + DEFINELINK.managementProduct + "/edit/" + productId;

  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
  const schema = yup.object().shape({
    variantName: yup
      .string()
      .typeError("Tên không được để trống")
      .required("Tên sản phẩm không được để trống"),
    newPrice: yup.number().typeError("Giá là số dương"),
    quantity: yup.number().typeError("Số lượng là số dương"),
    file: yup
      .mixed()
      .test("fileType", "Vui lòng chọn ảnh .png, .jpg, .jpeg", (value) => {
        if (value) {
          return SUPPORTED_FORMATS.includes(value[0].type);
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

  const [product, setProduct] = useState({});
  const handleDeleteFile = () => {
    setValue("file", null);
    setValue("fileUpload", null);
  };

  const submitVariant = async (data) => {
    const fileUpload = await uploadMultiFiles([data.fileUpload]);
    data.imageUrl = fileUpload[0];
    await updateVariant(variantId, data);
    history.push(parent);
  };

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    setValue("fileUpload", file);
  };
  const fetchVariant = async (id) => {
    try {
      const response = await getVariant(id);
      console.log(response);
      setProduct(response);
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
                  label={"Giá"}
                  placeholder={""}
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
                  <span className="error-message">{errors?.file?.message}</span>
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
          <YLButton variant={"danger"} to={parent} width={"70px"}>
            Huỷ
          </YLButton>

          <YLButton type={"submit"} variant={"primary"} width={"150px"}>
            Tạo biến thể
          </YLButton>
        </div>
      </form>
    </div>
  );
}

export default EditVariant;
