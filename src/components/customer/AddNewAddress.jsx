import React, {useEffect} from "react";
import YLButton from "components/custom-field/YLButton";
import "assets/scss/scss-components/customer/add-new-addres.scss";
import {useForm} from "react-hook-form";
import {Prompt, useHistory} from "react-router-dom";
import DEFINELINK from "routes/define-link";
import YLSelectAddress from "components/custom-field/YLSelectAddress";
import UserApi from "api/user-api";

function AddNewAddress() {
    const methods = useForm();
    const history = useHistory();
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isDirty, isSubmitted}
    } = methods;
    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await UserApi.addAddress(data);
            if (response.error) {
                throw new Error(response.error);
            } else {
                alert("Thêm địa chỉ thành công");
                history.push("/customer/address");
            }
        } catch (error) {
            alert("Thêm địa chỉ thất bại");
            console.log("fail to fetch add address");
        }
    };
    useEffect(() => {
        return () => {
            // console.log("dirty and submitted", isDirty, isSubmitted);
            if (isDirty && !isSubmitted) return (window.onbeforeunload = () => true);
        };
    });
    return (
        <div className="bg-box">
            <Prompt
                when={isDirty && !isSubmitted}
                message="Changes you made may not be saved."
            />
            <form onSubmit={handleSubmit(onSubmit)}>
                <table className="add-address-table">
                    <tbody>
                    <tr>
                        <td className="text-end title-table align-top">Họ Và Tên(*)</td>
                        <td>
                            <input
                                className="form-control"
                                {...register("userName", {
                                    required: "Trường bắt buộc"
                                })}
                            />
                            {errors.userName && (
                                <span className="text-danger">(*){errors.userName.message}</span>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className="text-end title-table">Số Điện Thoại(*)</td>
                        <td>
                            <input
                                className="form-control"
                                {...register("phone", {
                                    required: "Vui lòng nhập số điện thoại",
                                    pattern: {
                                        value: /((\+84|84|0)[35789][0-9]{8})\b/,
                                        message: "Vui lòng nhập đúng số điện thoại"
                                    },
                                    minLength: {
                                        value: 10,
                                        message: "Vui lòng nhập đúng số điện thoại"
                                    },
                                    maxLength: {
                                        value: 12,
                                        message: "Vui lòng nhập đúng số điện thoại"
                                    }
                                })}
                                type="text"
                            />
                            {errors.phone && (
                                <span className="text-danger">
                    {console.log(errors)}
                                    {errors.phone.message}
                  </span>
                            )}
                        </td>
                    </tr>
                    <td className="text-end title-table">Địa chỉ(*)</td>
                    <td>
                        <YLSelectAddress {...methods} />
                    </td>

                    <tr>
                        <td className="text-end title-table">Địa Chỉ(*)</td>
                        <td>
                            <input
                                className="form-control"
                                {...register("description", {
                                    required: "Trường bắt buộc"
                                })}
                            />
                            {errors.description && (
                                <span className="text-danger">
                    (*){errors.description.message}
                  </span>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className="text-end title-table">Email</td>
                        <td>
                            <input
                                type="email"
                                className="form-control"
                                {...register("email")}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className=" d-flex justify-content-end">
                            <YLButton
                                variant="warning"
                                to={DEFINELINK.customer + DEFINELINK.address}
                            >
                                Hủy
                            </YLButton>
                        </td>
                        <td>
                            <YLButton variant="primary" type="submit">
                                Thêm
                            </YLButton>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default AddNewAddress;
