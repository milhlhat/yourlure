import { yupResolver } from "@hookform/resolvers/yup";
import ManagerVoucherAPI from "api/manager-voucher";
import YLButton from "components/custom-field/YLButton";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setIsBack } from "redux/back-action/back-action";
import * as yup from "yup";
import "./scss/manager-add-new-voucher.scss";
function ManagerVoucherEdit(props) {
    const canBack = props.location.canBack;
    const dispatch = useDispatch();
    const voucherId = props.match.params.id;
    const history = useHistory();
    const schema = yup.object().shape({
        // name: yup.string().required("Tên mã giảm giá không được để trống"),
        // code: yup.string().required("Mã giảm giá không được để trống"),
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
            const response = await ManagerVoucherAPI.getById(voucherId);
            console.log(response);
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

        setValue("name", voucher?.data?.name);
        setValue("code", voucher?.data?.code);
        setValue("discountValue", voucher?.data?.discountValue);
        setValue("minSpentAmount", voucher?.data?.minSpentAmount);
        setValue("minCheckoutItemsQuantity", voucher?.data?.minCheckoutItemsQuantity);
        setValue("start_date", formatDate(voucher?.data?.start_date));
        setValue("end_date", formatDate(voucher?.data?.end_date));
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
                const response = await ManagerVoucherAPI.update(data, voucherId);
                if (response.error) {
                    throw new Error(response.error);
                } else {
                    alert("Cập nhật thành công");
                    history.push("/manager/voucher");
                }
            }
        } catch (error) {
            alert("Cập nhật thất bại");
            console.log("fail to fetch update");
        }
    };


    return (
        <div>
            <h3>Chi tiết mã giảm giá</h3>
            <form onSubmit={handleSubmit(onsubmit)}>
                <div className=" add-new-form row">
                    <div className="info bg-box bg-shadow col-12 col-md-8 mb-md-5 mb-2 pb-2" id="product-info">
                        <div className="px-3 pt-3">
                            <h5>Thông tin mã giảm giá</h5>
                        </div>
                        <hr />
                        <div className="px-3">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label for="name" className="form-label">
                                                Tên mã giảm giá <span className="error-message">(*)</span>
                                            </label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.name ? "outline-red" : ""}`}
                                                id="name"
                                                placeholder="Tên mã giảm giá"
                                                {...register("name")}
                                            />
                                            <span className="error-message">
                                                {errors.name?.message}
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
                                                {...register("start_date")}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label for="code" className="form-label">
                                                Mã giảm giá <span className="error-message">(*)</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="code"
                                                placeholder="Mã giảm giá"

                                                {...register("code")}
                                            />
                                            <span className="error-message">
                                                {errors.code?.message}
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
                                                // defaultValue={formatDate(voucher?.data?.end_date)}
                                                {...register("end_date")}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label for="type" className="form-label">
                                                Cách giảm giá
                                            </label>
                                            <select
                                                type="text"
                                                className="form-control"
                                                defaultValue={voucher?.data?.type}
                                                {...register("type")}
                                            >
                                                <option value="Phần trăm">Phần trăm</option>
                                                <option value="Giá trị">Giá trị</option>
                                                <option value="Free Ship">Free Ship</option>
                                            </select>
                                        </td>
                                        <td>
                                            <label for="min-spent-amount" className="form-label">
                                                Số tiền thanh toán tối thiểu
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="min-spent-amount"
                                                placeholder="Số tiền thanh toán tối thiểu"
                                                {...register("minSpentAmount")}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label for="discount-value" className="form-label">
                                                Giá trị
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="discount-value"
                                                placeholder="Giá trị"
                                                {...register("discountValue")}
                                            />
                                        </td>
                                        <td>
                                            <label for="minCheckoutItemsQuantity" className="form-label">
                                                Số lượng tối thiểu
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="minCheckoutItemsQuantity"
                                                placeholder="Số lượng tối thiểu"
                                                {...register("minCheckoutItemsQuantity")}
                                            />
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

export default ManagerVoucherEdit;