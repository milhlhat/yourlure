import React, { useEffect, useState } from "react";
import "../scss/manage-product-and-variant.scss";
import YlInputFormHook from "../../../../../components/custom-field/YLInputFormHook";
import { useForm, useWatch } from "react-hook-form";
import {
  getProductByID,
  uploadMultiFiles,
} from "../../../../../api/manager-product-api";
import { toast } from "react-toastify";
import { createImageUrlByLinkOrFile } from "../../../../../utils/manager-product";
import YLButton from "../../../../../components/custom-field/YLButton";
import DEFINELINK from "../../../../../routes/define-link";
import { createVariant } from "../../../../../api/manager-variant-api";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SUPPORTED_IMAGE_FORMATS } from "../../../../../constants/product-config";

function AddVariant(props) {
  const productId = props.match.params.productId;

  const parentRedirect = props.location?.state?.parentPath;
  const parent =
    DEFINELINK.manager + DEFINELINK.managementProduct + "/edit/" + productId;

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
          return SUPPORTED_IMAGE_FORMATS.includes(value[0].type);
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
  } = methods;

  const history = useHistory();
  const watchFile = useWatch({ control, name: "file", defaultValue: null });
  const [product, setProduct] = useState({});
  const handleDeleteFile = () => {
    setValue("file", null);
  };

  const submitVariant = async (data) => {
    console.log(data.file[0]);
    const fileUpload = await uploadMultiFiles([data.file[0]]);
    data.imageUrl = fileUpload[0];
    await createVariant(data);
    toast.success("Thêm biến biến thể thành công");
    history.push(parentRedirect || parent);
  };
  useEffect(async () => {
    try {
      const response = await getProductByID(productId);
      console.log(response);
      setProduct(response);
      setValue("productId", productId);
      setValue("newPrice", response.defaultPrice);
    } catch (e) {
      toast.warn("Lỗi tải giá mặc định.");
    }
  }, [productId]);

  return (
    <div className={"bg-box py-5"}>
      {" "}
      <form onSubmit={handleSubmit(submitVariant)}>
        <h3 className={"text-center mb-3"}>
          Thêm biến thể cho sản phẩm: {product.productName}
        </h3>

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
                  <YlInputFormHook
                    type={"file"}
                    name={"file"}
                    methods={methods}
                    label={"Hình ảnh"}
                    isRequired
                  />
                </div>
              </td>
              <td>
                {watchFile && (
                  <div className={"thumbnail-variant"}>
                    <img
                      src={createImageUrlByLinkOrFile(watchFile[0])}
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
            Tạo biến thể
          </YLButton>
        </div>
      </form>
    </div>
  );
}

export default AddVariant;
