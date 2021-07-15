import { yupResolver } from "@hookform/resolvers/yup";
import ManagerCampaignAPI from "api/manager-campaign-api";
import ManagerVoucherAPI from "api/manager-voucher";
import YLButton from "components/custom-field/YLButton";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setIsBack } from "redux/back-action/back-action";
import * as yup from "yup";
import "./scss/manager-campaign-addNew.scss";
function ManagerCampignEdit(props) {
    const canBack = props.location.canBack;
    const dispatch = useDispatch();
    const voucherId = props.match.params.id;
    const history = useHistory();
    const schema = yup.object().shape({
        banner: yup.string().required("Tên chiến dịch không được để trống"),
        description: yup.string().required("Mô tả chiến dịch không được để trống"),
    });
    const [voucher, setVoucher] = useState({
        data: [],
        isLoading: false,
        isSuccess: true,
    });
    const formatDate = (date) => {
        let formatDate = new Date(date);
        return (
            formatDate.getFullYear() +
            "-" +
            ` 0${(formatDate.getMonth() + 1)}`.slice(-2) +
            "-" +
            ` 0${(formatDate.getDate() + 1)}`.slice(-2)
        );
    };
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
    });
    const fetchVoucher = async () => {
        try {
            const response = await ManagerCampaignAPI.getById(voucherId);
            if (response.error) {
                throw new Error(response.error);
            } else {
                setVoucher({
                    data: response,
                    success: true,
                });
            }
        } catch (error) {
            console.log("fail to fetch voucher ");
        }
    };
    useEffect(() => {
        fetchVoucher();
    }, [voucherId]);

    useEffect(() => {

        setValue("banner", voucher?.data?.banner);
        setValue("description", voucher?.data?.description);
        setValue("content", voucher?.data?.content);
        setValue("startDate", voucher?.data?.startDate ? formatDate(voucher?.data?.startDate) : '');
        setValue("endDate", voucher?.data?.endDate ? formatDate(voucher?.data?.endDate) : '');
    }, [voucher]);

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
            let start_date = new Date(data?.start_date);
            let end_date = new Date(data?.end_date);
            if (start_date.getTime() > end_date.getTime()) {
                alert("Ngày kết thúc phải lớn hơn ngày bắt đầu");
            } else {
                console.log(data);
                const response = await ManagerCampaignAPI.update(data, voucherId);
                console.log(response);
                if (response.error) {
                    throw new Error(response.error);
                } else {
                    alert("Cập nhật thành công");
                    history.push("/manager/campaign");
                }
            }
        } catch (error) {
            alert("Cập nhật thất bại");
            console.log("fail to fetch update");
        }
    };


    return (
        <div>
            <h3>Thông Tin Chiến Dịch Mới</h3>
            <form onSubmit={handleSubmit(onsubmit)}>
                <div className=" add-new-form row">
                    <div className="info bg-box bg-shadow col-12 col-md-8 mb-md-5 mb-2 pb-2 pb-md-5 mt-md-3" id="product-info">
                        <div className="px-3 pt-3">
                            <h5>Chi tiết chiến dịch</h5>
                        </div>
                        <hr />
                        <div className="px-3">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label for="banner" className="form-label">
                                                Tên chiến dịch <span className="error-message">(*)</span>
                                            </label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.name ? "outline-red" : ""
                                                    }`}
                                                id="banner"
                                                placeholder="Tên chiến dịch"
                                                {...register("banner")}
                                            />
                                            <span className="error-message">
                                                {errors.banner?.message}
                                            </span>
                                        </td>
                                        <td>
                                            <label for="start-date" className="form-label">
                                                Bắt đầu từ ngày
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="start-date"
                                                placeholder="Ngày bắt đầu"
                                                {...register("startDate")}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label for="description" className="form-label">
                                                Mô tả <span className="error-message">(*)</span>
                                            </label>
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                id="description"
                                                placeholder="Mô tả"
                                                {...register("description")}
                                            />
                                            <span className="error-message">
                                                {errors.description?.message}
                                            </span>
                                        </td>
                                        <td>
                                            <label for="end-date" className="form-label">
                                                Ngày kết thúc
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="end-date"
                                                placeholder="Ngày kết thúc"
                                                {...register("endDate")}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">
                                            <label htmlFor="content" className="form-label">
                                                Mô  chi tiết
                                            </label>
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                id="content"
                                                placeholder="Mô tả"
                                                {...register("content")}
                                            />
                                        </td>
                                    </tr>
                                    {/* <div className="product-info bg-white bg-shadow col-12 col-md-8 mb-md-5 mb-2 pb-2">
                                    <div className="px-3 pt-3 product-images-add">
                                        <h5>Hình ảnh</h5>
                                        <input
                                            {...register("imgList")}
                                            hidden
                                            type="file"
                                            multiple
                                            id="file"
                                            accept={"image/*"}
                                            onChange={imageHandleChange}
                                        />
                                        <label htmlFor="file" className="pointer">
                                            <i className="fal fa-images" /> Thêm hình ảnh
                                        </label>
                                    </div>
                                    <hr />
                                    <div className="px-3 manager-product-imgList">
                                        {RenderPhotos(selectedImages)}
                                    </div>
                                </div> */}
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