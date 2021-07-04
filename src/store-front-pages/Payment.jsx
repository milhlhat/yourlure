import React from "react";
import {Link} from "react-router-dom";
import "assets/scss/scss-pages/payment.scss";
import YLButton from "../components/custom-field/YLButton";
import YLSelectAddress from "../components/custom-field/YLSelectAddress";
import {useForm} from "react-hook-form";
import DEFINELINK from '../routes/define-link';


function Payment(props) {
    const methods = useForm();
    const {register, formState: {errors}} = methods;

    return (
        <form className="container mt-4" autocomplete="off">
            <div className="bg-box mb-4">
                <span className="text-color">Bạn đã có tài khoản chưa?</span>
                <br/>
                <Link to="" className="login-link">
                    Đăng nhập
                </Link>
                <span className="text-color">để thực hiện thanh toán mượn mà hơn.</span>
            </div>
            <div className="d-flex flex-wrap justify-content-between">
                <div className="deliver-address bg-box mb-4 col-12 col-md-8">
                    <h3>ĐỊA CHỈ GIAO HÀNG</h3>
                    <input
                        className="form-control mb-3"
                        placeholder={'*Họ và Tên'}
                        {...register("userName", {
                            required: "Trường bắt buộc"
                        })}
                    />
                    {errors.userName && (
                        <span className="text-danger">(*){errors.userName.message}</span>
                    )}

                    <YLSelectAddress {...methods}/>

                    <input
                        className="form-control my-3"
                        placeholder={'*Địa chỉ, số nhà, tên đường'}
                        {...register("address", {
                            required: "Trường bắt buộc"
                        })}
                    />
                    {errors.address && (
                        <span className="text-danger">(*){errors.address.message}</span>
                    )}
                    <input
                        className="form-control my-3"
                        placeholder={'*Số điện thoại'}
                        {...register("phone", {
                            required: "Trường bắt buộc"
                        })}
                    />
                    {errors.phone && (
                        <span className="text-danger">(*){errors.phone.message}</span>
                    )}
                    <input
                        className="form-control my-3"
                        placeholder={'*Email'}
                        {...register("email", {
                            required: "Trường bắt buộc"
                        })}
                    />
                    {errors.email && (
                        <span className="text-danger">(*){errors.email.message}</span>
                    )}
                    <input
                        className="form-control my-3"
                        placeholder={'Lưu ý'}
                        {...register("note", {
                            required: "Trường bắt buộc"
                        })}
                    />
                    {errors.note && (
                        <span className="text-danger">(*){errors.note.message}</span>
                    )}


                </div>
                <div className="col-12 col-md-4">
                    <div className="total-order bg-box">
                        <div>
                            <span>Giỏ hàng</span> <Link to={DEFINELINK.cart} className={'float-end login-link'}>
                            Trở về
                            giỏ
                            hàng </Link>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </form>

    );
}

export default Payment;
