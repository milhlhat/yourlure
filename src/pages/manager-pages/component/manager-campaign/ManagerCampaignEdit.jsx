import { yupResolver } from "@hookform/resolvers/yup";
import { getCampaignById, updateCampaign } from "api/manager-campaign-api";

import YLButton from "components/custom-field/YLButton";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setIsBack } from "store/back-action/back-action";
import * as yup from "yup";
import "./scss/manager-campaign-addNew.scss";

import YlInputFormHook from "../../../../components/custom-field/YLInputFormHook";
import { VALIDATE_CAMPAIGN_SCHEMA } from "./ManagerCampaignAddNew";
import ChooseProductImage from "../../../../components/choose-image/ChooseMultiImages";
import Loading from "../../../../components/Loading";
import ErrorLoad from "../../../../components/error-notify/ErrorLoad";
import { toast } from "react-toastify";
import { SUPPORTED_IMAGE_FORMATS } from "../../../../constants/product-config";
import { uploadMultiFiles } from "../../../../api/manager-product-api";
import DEFINELINK from "../../../../routes/define-link";
import CircularProgress from "@material-ui/core/CircularProgress";

function ManagerCampignEdit(props) {
  const canBack = props.location.canBack;
  const dispatch = useDispatch();

  const campaignId = props.match.params.id;
  const history = useHistory();
  const schema = yup.object().shape({
    ...VALIDATE_CAMPAIGN_SCHEMA,
    newImages: yup.mixed().when("imgList", {
      is: (imgList) => {
        console.log(imgList);

        return imgList?.length > 0;
      },
      then: yup.mixed().nullable(),
      otherwise: yup
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
    }),
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
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = methods;
  console.log(errors);
  const handleGetOldImage = useCallback(async () => {
    const response = await getCampaignById(campaignId);
    return response.imageCollection;
  }, [campaignId]);

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
      setValue("imageCollection", []);
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
      if (data.newImages && data.newImages.length > 0) {
        const fileLinks = await uploadMultiFiles(data.newImages);
        data.imageCollection = fileLinks;
      }

      await updateCampaign(campaignId, data);
      toast.success("Cập nhật sự kiện thành công");
      history.push(DEFINELINK.manager + DEFINELINK.campaign);
    } catch (error) {
      toast.error("Cập nhật sự kiện thất bại");
    }
  };
  if (campaign.isLoading) {
    return <Loading hasLayout />;
  } else if (!campaign.isSuccess) {
    return <ErrorLoad hasLayout />;
  } else
    return (
      <div>
        <h3>Thông Tin sự kiện</h3>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className=" add-new-form row">
            <div className=" bg-box bg-shadow col-12  mb-md-5 mb-2 pb-2 pb-md-5 mt-md-3">
              <div className="px-3 pt-3">
                <h5>Chi tiết sự kiện</h5>
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
                            getOldImage={handleGetOldImage}
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
              <YLButton
                variant="danger"
                to={DEFINELINK.manager + DEFINELINK.campaign}
                value="Hủy"
              />
              <YLButton variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <CircularProgress size={20} className="circle-progress" />
                ) : (
                  "Xong"
                )}
              </YLButton>
            </div>
          </div>
        </form>
      </div>
    );
}

export default ManagerCampignEdit;
