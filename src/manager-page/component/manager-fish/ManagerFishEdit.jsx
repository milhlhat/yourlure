import { yupResolver } from "@hookform/resolvers/yup";
import ManagerFishAPI from "api/manager-fish-api";
import YLButton from "components/custom-field/YLButton";
import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setIsBack } from "redux/back-action/back-action";
import { handleChangeInput } from "utils/input";
import * as yup from "yup";

ManagerFishEdit.propTypes = {};

function ManagerFishEdit(props) {
    const canBack = props.location.canBack;
    const dispatch = useDispatch();
    const history = useHistory();
    const [fishName, setFishName] = useState('');
    const fishID = props.match.params.id;
    const schema = yup.object().shape({
        fishName: yup.string().required("Tên loại cá không được để trống"),
    });
    const [fish, setFish] = useState({
        data: [],
        isLoading: false,
        isSuccess: true,
    });
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
    });


    const fetchFish = async () => {
        try {
            const response = await ManagerFishAPI.getById(fishID);
            if (response.error) {
                throw new Error(response.error);
            } else {
                setFish({
                    data: response,
                    success: true,
                });
            }
        } catch (error) {
            console.log("fail to fetch fish ");
        }
    };

    useEffect(() => {
        fetchFish();
    }, [fishID]);

    const onSubmit = async (data) => {
        console.log(data)
        try {
            const response = await ManagerFishAPI.update(data, fishID);
            if (response.error) {
                throw new Error(response.error);

            } else
                if (!response) {
                    throw new Error("loi")
                }
                else {
                    alert("update thành công");
                    history.push("/manager/fish");

                }
        } catch (error) {
            alert("update thất bại");
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
            <h3>Tạo danh sách cá</h3>
            <div className="bg-box bg-shadow">
                <h3>Thông tin cá: {fishName !== '' ? fishName : fish?.data?.fishName}</h3>
                <hr />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="name">Tên cá</label>
                    <input
                        defaultValue={fish?.data?.fishName}
                        className="form-control"
                        {...register("fishName")}
                        type="text"
                        id="name"
                        placeholder="Nhập tên cá"
                        onChange={(e) => setFishName(e.target.value)}
                    />
                    <YLButton variant="primary" type="submit" value="Xong" />
                </form>
            </div>
        </div>
    );
}

export default ManagerFishEdit;
