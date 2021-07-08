import { yupResolver } from "@hookform/resolvers/yup";
import YLButton from "components/custom-field/YLButton";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
function ManagerVoucherAddNew(props) {

    const schema = yup.object().shape({
        productname: yup.string().required("Tên mã giảm giá không được để trống"),
    });
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <div>
            <h3>Tạo mã giảm giá mới</h3>
            <form >
                <div className=" product-add-new-form row">
                    <div className="product-info bg-box bg-shadow col-12 col-md-8 mb-md-5 mb-2 pb-2" id="product-info">
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
                                            <label for="weight-default" className="form-label">
                                                Độ nặng mặc định (g)
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="weight-default"
                                                placeholder="Ngày bắt đầu"
                                                {...register("weightDefault")}
                                            />
                                            <span>{errors.weightDefault?.message}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label for="price" className="form-label">
                                                Giá
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="price"
                                                placeholder="Giá"
                                                {...register("price")}
                                            />
                                            <span>{errors.price?.message}</span>
                                        </td>
                                        <td>
                                            <label for="length" className="form-label">
                                                chiều dài (cm)
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="length"
                                                placeholder="chiều dài (cm)"
                                                {...register("length")}
                                            />
                                            <span>{errors.length?.message}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label for="hook" className="form-label">
                                                Số lượng móc
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="hook"
                                                placeholder="Số lượng móc"
                                                {...register("hook")}
                                            />
                                            <span>{errors.hook?.message}</span>
                                        </td>
                                        <td>
                                            <label for="deepDiving" className="form-label">
                                                Lặn sâu
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="deepDiving"
                                                placeholder="Lặn sâu"
                                                {...register("deepDiving")}
                                            />
                                            <span>{errors.deepDiving?.message}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label for="material" className="form-label">
                                                Chất liệu
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="material"
                                                placeholder="Chất liệu"
                                                {...register("material")}
                                            />
                                            <span>{errors.material?.message}</span>
                                        </td>
                                        <td>
                                            <label for="brand" className="form-label">
                                                Nhãn hiệu
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="brand"
                                                placeholder="Nhãn hiệu"
                                                {...register("brand")}
                                            />
                                            <span>{errors.brand?.message}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input
                                                class="form-check-input pointer"
                                                type="checkbox"
                                                id="customize"
                                                {...register("customize")}
                                                // onChange={handleChangeCustomModel}
                                                defaultChecked={false}
                                            />
                                            <label class="form-check-label pointer" for="customize">
                                                Customize
                                            </label>
                                            <span>{errors.customize?.message}</span>
                                        </td>
                                        <td>
                                            <input
                                                class="form-check-input pointer"
                                                type="checkbox"
                                                id="customize-weight"
                                                {...register("customizeWeight")}
                                                // onChange={handleChangeCustomWeight}
                                                defaultChecked={false}
                                            />
                                            <label for="customize-weight" className="form-label">
                                                Customizable độ nặng
                                            </label>
                                            <span>{errors.customizeWeight?.message}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {/* {changeModel && (
                                                <div>
                                                    <label for="model" className="form-label">
                                                        Link model 3D
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="model"
                                                        placeholder="Link model 3D"
                                                        {...register("model")}
                                                    />
                                                    <span>{errors.model?.message}</span>
                                                </div>
                                            )} */}
                                        </td>
                                        <td>
                                            {/* {changeWeight && (
                                                <div className="d-flex">
                                                    <div className="col-6">
                                                        <label for="weight-max" className="form-label">
                                                            Max (g)
                                                        </label>
                                                        <input
                                                            type="number"
                                                            className="form-control input-customize-weight"
                                                            id="weight-max"
                                                            placeholder="Max"
                                                            {...register("weightMax")}
                                                        />

                                                        <span>{errors.weightMax?.message}</span>
                                                    </div>
                                                    <div className="col-6">
                                                        <label for="weight-min" className="form-label">
                                                            Min
                                                        </label>
                                                        <input
                                                            type="number"
                                                            className="form-control  input-customize-weight"
                                                            id="weight-min"
                                                            placeholder="Min (g)"
                                                            {...register("weightMin")}
                                                        />

                                                        <span>{errors.weightMin?.message}</span>
                                                    </div>
                                                </div>
                                            )} */}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="2">
                                            <label for="description" className="form-label">
                                                Mô tả
                                            </label>
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                id="description"
                                                placeholder="Mô tả"
                                                {...register("description")}
                                            ></textarea>
                                            <span>{errors.description?.message}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">
                                            <label for="descriptionMore" className="form-label">
                                                Mô tả chi tiết
                                            </label>
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                id="descriptionMore"
                                                placeholder="Mô tả chi tiết "
                                                {...register("descriptionMore")}
                                            ></textarea>
                                            <span>{errors.descriptionMore?.message}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="col-12 bg-white bg-shadow submit-button-form">
                        <YLButton variant="danger" type="submit" value="Hủy" />
                        <YLButton variant="primary" type="submit" value="Xong" />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ManagerVoucherAddNew;