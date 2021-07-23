import { yupResolver } from "@hookform/resolvers/yup";
import { getCampaignById, updateCampaign } from "api/manager-campaign-api";

import YLButton from "components/custom-field/YLButton";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setIsBack } from "redux/back-action/back-action";
import * as yup from "yup";
import "./scss/manager-campaign-addNew.scss";

import YlInputFormHook from "../../../components/custom-field/YLInputFormHook";
import { VALIDATE_CAMPAIGN_SCHEMA } from "./ManagerCampaignAddNew";
import ChooseProductImage from "../../../components/choose-image/ChooseMultiImages";
import Loading from "../../../components/Loading";
import ErrorLoad from "../../../components/error-notify/ErrorLoad";
import { toast } from "react-toastify";
import { SUPPORTED_IMAGE_FORMATS } from "../../../constant/product-config";
function ManagerCampignEdit(props) {
  const canBack = props.location.canBack;
  const dispatch = useDispatch();

  const campaignId = props.match.params.id;
  const history = useHistory();
  const schema = yup.object().shape({
    ...VALIDATE_CAMPAIGN_SCHEMA,
    // newImages: yup.mixed().when("imgList", {
    //   is: (imgList) => {
    //     return imgList?.length > 0;
    //   },
    //   then: yup.mixed().nullable,
    //   // otherwise: yup
    //   //   .array()
    //   //   .min(1, "Vui lòng chọn ảnh chiến dịch")
    //   //   .test("prodImgType", "Vui lòng chọn ảnh .png, .jpg, .jpeg", (value) => {
    //   //     for (const file of value) {
    //   //       if (!SUPPORTED_IMAGE_FORMATS.includes(file.type)) {
    //   //         return false;
    //   //       }
    //   //     }
    //   //     return true;
    //   //   }),
    // }),
  });
  const [campaign, setCampaign] = useState({
    data: [],
    isLoading: true,
    isSuccess: false,
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = methods;
  const fetchCampaign = async (id) => {
    try {
      const response = await getCampaignById(id);
      setCampaign({
        data: response,
        isLoading: false,
        isSuccess: true,
      });
      setValue("banner", response.banner);
      setValue("description", response.description);
      setValue("content", response.content);
      setValue(
        "startDate",
        response.startDate ? response.startDate.substr(0, 10) : ""
      );
      setValue(
        "endDate",
        response.endDate ? response.endDate.substr(0, 10) : ""
      );
      setValue("imgList", response.imageCollection);
      setValue("newImages", []);
    } catch (error) {
      toast.error("Lỗi hệ thống");
    }
  };
  useEffect(() => {
    fetchCampaign(campaignId);
  }, [campaignId]);

  useEffect(() => {
    if (canBack) {
      const action = setIsBack({
        canBack: canBack.canBack,
        path: canBack.path,
        label: canBack.label,
      });
      dispatch(action);
    }
  }, [canBack]);

  const onsubmit = async (data) => {
    try {
      const response = updateCampaign(campaignId, data);
      console.log(response);
    } catch (error) {
      alert("Cập nhật thất bại");
      console.log("fail to fetch update");
    }
  };
  if (campaign.isLoading) {
    return <Loading hasLayout />;
  } else if (!campaign.isSuccess) {
    return <ErrorLoad hasLayout />;
  } else
    return (
      <div>
        <h3>Thông Tin Chiến Dịch Mới</h3>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className=" add-new-form row">
            <div className=" bg-box bg-shadow col-12  mb-md-5 mb-2 pb-2 pb-md-5 mt-md-3">
              <div className="px-3 pt-3">
                <h5>Chi tiết chiến dịch</h5>
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
                          label={"Tên chiến dịch"}
                          placeholder={"Tên chiến dịch"}
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
                          label={"Ngày bắt đầu"}
                          type="date"
                          methods={methods}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <label htmlFor="content" className="form-label">
                          Mô chi tiết{" "}
                          <span className="error-message"> (*)</span>
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

            <div className="col-12 bg-white bg-shadow submit-button-form">
              <YLButton variant="danger" to="/manager/voucher" value="Hủy" />
              <YLButton variant="primary" type="submit" value="Xong" />
            </div>
          </div>
        </form>
      </div>
    );
}

export default ManagerCampignEdit;
