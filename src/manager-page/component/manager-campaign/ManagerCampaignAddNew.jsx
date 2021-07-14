import { yupResolver } from "@hookform/resolvers/yup";
import ManagerCampaignAPI, { uploadMultiFiles } from "api/manager-campaign-api";
import YLButton from "components/custom-field/YLButton";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setIsBack } from "redux/back-action/back-action";
import * as yup from "yup";
import "./scss/manager-campaign-addNew.scss";
function ManagerVoucherAddNew(props) {
    const dispatch = useDispatch();
    const canBack = props.location.canBack;
    const [disabled, setDisabled] = useState(false);
    const [fileImages, setFileImage] = useState([]);
    const [selectedImagesName, setSelectedImageName] = useState([]);
    const [selectedImages, setSelectedImage] = useState([]);

    const handleDeleteImage = (e) => {
        setSelectedImage((preImages) =>
            preImages.filter((value) => value != e.target.src)
        );
        // let blob = await fetch(url).then(r => r.blob());
    };
    const RenderPhotos = (sourse) => {
        if (sourse?.length < 1) return <span>Chưa có hình ảnh</span>;
        return sourse?.map((src, i) => {
            return (
                <div className="img-item" key={"imgfile" + i}>
                    <img
                        src={src}
                        key={"img-list-" + i}
                        className="pointer"
                        onClick={handleDeleteImage}
                    />
                    <button className="btn btn-light">Xóa</button>
                </div>
            );
        });
    };
    const handleChangeDisabled = (selectObject) => {
        if (selectObject.target.value === "Free Ship") {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    };
    const imageHandleChange = (e) => {
        let file = Array.from(e.target.files);
        if (file) {
            setFileImage((prevState) => prevState.concat(file));
            console.log(file);

            for (let i = 0; i < file.length; i++) {
                setSelectedImageName((preName) => preName.concat(file[i]?.name));
            }
            if (selectedImagesName) {
                for (let i = 0; i < selectedImagesName.length; i++) {
                    let nameImage = selectedImagesName[i];
                    file = file.filter((f) => f.name != nameImage);
                }
            }

            const fileArray = file.map((file) => URL.createObjectURL(file));
            // console.log(fileArray);
            setSelectedImage((preImages) => preImages.concat(fileArray));
            file.map((file) => URL.revokeObjectURL(file));
        }
    };
    const onSubmit = async (data) => {
        // let fin = { ...data, imgList: fileImages };
        // console.log(fin);
        try {
          const fileLinks = await uploadMultiFiles(fileImages);
          console.log(fileLinks);
        } catch (e) {
          console.log("errors at upload product", e);
        }
    
        //selectedImages
      };
    const history = useHistory();
    const schema = yup.object().shape({
        banner: yup.string().required("Tên chiến dịch không được để trống"),
        description: yup.string().required("Mô tả chiến dịch không được để trống"),
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
                const response = await ManagerCampaignAPI.add(data);
                if (response.error) {
                    throw new Error(response.error);
                } else {
                    alert("Thêm chiến dịch thành công");
                    history.push("/manager/campaign");
                }
            }
        } catch (error) {
            alert("Thêm chiến dịch thất bại");
            console.log("fail to fetch add campaign");
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
            <h3>Tạo Chiến Dịch Mới</h3>
            <form onSubmit={handleSubmit(onsubmit)}>
                <div className=" add-new-form row">
                    <div className="info bg-box bg-shadow col-12 col-md-8 mb-md-5 mb-2 pb-2 pb-md-5 mt-md-3" id="product-info">
                        <div className="px-3 pt-3">
                            <h5>Thông tin chiến dịch</h5>
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
                                            <input
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
                                    <div className="product-info bg-white bg-shadow col-12 col-md-8 mb-md-5 mb-2 pb-2">
                                        <div className="px-3 pt-3 product-images-add">
                                            <h5>Hình ảnh</h5>
                                            <input
                                                {...register("imageCollection")}
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
                                    </div>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="col-12 bg-white bg-shadow submit-button-form">
                        <YLButton variant="danger" to="/manager/campaign" value="Hủy" />
                        <YLButton variant="primary" type="submit" value="Xong" />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ManagerVoucherAddNew;