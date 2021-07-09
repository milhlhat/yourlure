import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import YLButton from "components/custom-field/YLButton";
import { useHistory } from "react-router-dom";
import ManagerFishAPI from "api/manager-fish-api";
import { useDispatch } from "react-redux";
import { setIsBack } from "redux/back-action/back-action";

ManagerFishAddNew.propTypes = {};

function ManagerFishAddNew(props) {
    const canBack = props.location.canBack;
    const dispatch = useDispatch();
    const history = useHistory();
    const schema = yup.object().shape({
        fishName: yup.string().required("Tên loại cá không được để trống"),
    });
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data) => {
        console.log(data)
        try {
            const response = await ManagerFishAPI.add(data);
            if (response.error) {
                throw new Error(response.error);
            } else {
                alert("Thêm cá thành công");
                history.push("/manager/fish");
            }
        } catch (error) {
            alert("Thêm cá thất bại");
            console.log("fail to fetch add fish");
        }
    };
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
    return (
        <div>
            <h3>Tạo danh cá</h3>
            {console.log('hihihi')}
            <div className="bg-box bg-shadow">
                <h3>Thông tin cá</h3>
                <hr />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="name">Tên cá</label>
                    <input
                        className="form-control"
                        {...register("fishName")}
                        type="text"
                        id="name"
                        placeholder="Nhập tên cá"
                    />
                    <div className="mt-3 d-flex justify-content-center">
                        <YLButton variant="primary" type="submit" value="Xong" />
                        <YLButton variant="link" to="/manager/category" value="Hủy" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ManagerFishAddNew;
