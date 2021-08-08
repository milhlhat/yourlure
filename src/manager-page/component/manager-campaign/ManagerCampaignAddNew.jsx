import { yupResolver } from "@hookform/resolvers/yup";

import YLButton from "components/custom-field/YLButton";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setIsBack } from "redux/back-action/back-action";
import * as yup from "yup";
import "./scss/manager-campaign-addNew.scss";
import YlInputFormHook from "../../../components/custom-field/YLInputFormHook";

import ChooseProductImage from "../../../components/choose-image/ChooseMultiImages";
import { SUPPORTED_IMAGE_FORMATS } from "../../../constant/product-config";
import { toast } from "react-toastify";
import { uploadMultiFiles } from "../../../api/manager-product-api";
import { addCampaign } from "../../../api/manager-campaign-api";
import CircularProgress from "@material-ui/core/CircularProgress";

function ManagerVoucherAddNew(props) {
  const dispatch = useDispatch();
  const canBack = props.location.canBack;

  const history = useHistory();
  const schema = yup.object().shape({
    ...VALIDATE_CAMPAIGN_SCHEMA,
    newImages: yup
      .array()
      .min(1, "Vui lòng chọn ảnh sự kiện")
      .test("prodImgType", "Vui lòng chọn ảnh .png, .jpg, .jpeg", (value) => {
        for (const file of value) {
          if (!SUPPORTED_IMAGE_FORMATS.includes(file.type)) {
            return false;
          }
        }
        return true;
      }),
  });
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const {
    register,
    setValue,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = methods;
  console.log(errors);
  const onsubmit = async (data) => {
    try {
      const fileLinks = await uploadMultiFiles(data.newImages);
      data.imageCollection = fileLinks;
      await addCampaign(data);
      toast.success("Thêm sự kiện thành công");
      history.push("/manager/campaign");
      console.log(data);
    } catch (error) {
      toast.error("Thêm sự kiện thất bại");
      console.log(error);
    }
  };
  useEffect(() => {
    setValue("newImages", []);
    if (canBack) {
      const action = setIsBack({
        canBack: canBack.canBack,
        path: canBack.path,
        label: canBack.label,
      });
      dispatch(action);
    }
  }, [canBack]);
  return (
    <form onSubmit={handleSubmit(onsubmit)} className=" add-new-form row">
      <h3>Tạo sự kiện Mới</h3>

      <div className="info bg-box bg-shadow col-12 mb-md-5 mb-2 pb-2 pb-md-5 mt-md-3">
        <div className="px-3 pt-3">
          <h5>Thông tin sự kiện</h5>
        </div>
        <hr />
        <div className="px-3">
          <table>
            <tbody>
              <tr>
                <td>
                  <YlInputFormHook
                    name={"banner"}
                    methods={methods}
                    label={"Tên sự kiện"}
                    placeholder={"Tên sự kiện"}
                    isRequired
                  />
                </td>
                <td>
                  <YlInputFormHook
                    name={"startDate"}
                    isRequired={true}
                    label={"Ngày bắt đầu"}
                    type="date"
                    methods={methods}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <YlInputFormHook
                    name={"description"}
                    isRequired={true}
                    label={"Mô tả"}
                    placeholder={"Mô tả"}
                    methods={methods}
                  />
                </td>
                <td>
                  <YlInputFormHook
                    name={"endDate"}
                    isRequired={true}
                    label={"Ngày kết thúc"}
                    type="date"
                    methods={methods}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <label htmlFor="content" className="form-label">
                    Mô chi tiết <span className="error-message"> (*)</span>
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="content"
                    placeholder="Mô tả chi tiết"
                    {...register("content")}
                  />
                  <span className="error-message">
                    {errors["content"]?.message}
                  </span>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <div className=" bg-white  ">
                    <ChooseProductImage
                      methods={methods}
                      name={"imgList"}
                      removeName={"imageCollectionRemove"}
                      getOldImage={() => {
                        return [];
                      }}
                      fieldNameImgFromOldList={"linkImage"}
                    />
                    <span className="error-message">
                      {errors.newImages?.message}
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="col-12 bg-white  submit-button-form">
        <YLButton variant="danger" to="/manager/campaign" value="Hủy" />
        <YLButton variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <CircularProgress size={20} className="circle-progress" />
          ) : (
            "Xong"
          )}
        </YLButton>
      </div>
    </form>
  );
}
export const VALIDATE_CAMPAIGN_SCHEMA = {
  banner: yup
    .string()
    .required("Tên sự kiện không được để trống")
    .typeError("Tên sự kiện không được để trống"),
  description: yup
    .string()
    .required("Mô tả không được để trống")
    .typeError("Mô tả không được để trống"),
  content: yup
    .string()
    .typeError("Mô tả chi tiết không được để trống")
    .required("Mô tả chi tiết không được để trống"),
  startDate: yup
    .date()
    .typeError("Ngày bắt đầu không được để trống")
    .max(yup.ref("endDate"), "Ngày bắt đầu phải trước ngày kết thúc"),
  endDate: yup
    .date()
    .typeError("Ngày kết thúc không được để trống")
    .min(yup.ref("startDate"), "Ngày kết thúc phải sau ngày bắt đầu"),
};
export default ManagerVoucherAddNew;
