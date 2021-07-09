import { yupResolver } from "@hookform/resolvers/yup";
import ManagerVoucherAPI from "api/manager-voucher";
import YLButton from "components/custom-field/YLButton";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import "./scss/manager-add-new-voucher.scss";
function ManagerVoucherAddNew(props) {

    const [disabled, setDisabled] = useState(false);

    const handleChangeDisabled = (selectObject) => {
        if (selectObject.target.value === "Free Ship") {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    };
    const history = useHistory();
    const schema = yup.object().shape({
        name: yup.string().required("Tên mã giảm giá không được để trống"),
        code: yup.string().required("Mã giảm giá không được để trống"),
    });
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
    });
    const onsubmit = async (data) => {
        console.log(data)
        try {
            let start_date = new Date(data?.start_date);
            let end_date = new Date(data?.end_date);
            if (start_date.getTime() > end_date.getTime()) {
                alert("Ngày kết thúc phải lớn hơn ngày bắt đầu");
            } else {
                const response = await ManagerVoucherAPI.add(data);
                if (response.error) {
                    throw new Error(response.error);
                } else {
                    alert("Thêm mã giảm giá thành công");
                    history.push("/manager/voucher");
                }
            }
        } catch (error) {
            alert("Thêm cá thất bại");
            console.log("fail to fetch add voucher");
        }
    };

    return (
        <div>
            <h3>Tạo mã giảm giá mới</h3>
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
                                                className={`form-control ${errors.name ? "outline-red" : ""
                                                    }`}
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
                                            <span className="error-message">
                                                {errors.code?.message}
                                            </span>
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
                                            <span>{errors.price?.message}</span>
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
                                                {...register("type")}
                                                onChange={handleChangeDisabled}
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
                                                disabled={disabled}
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

export default ManagerVoucherAddNew;