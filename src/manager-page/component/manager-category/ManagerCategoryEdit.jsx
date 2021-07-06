import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { setIsBack } from "redux/back-action/back-action";
import YLButton from "components/custom-field/YLButton";
import ManagerCategoryAPI from "api/manager-category-api";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function ManagerCategoryEdit(props) {
  const canBack = props.location.canBack;
  const cateId = props.match.params.id;
  const history = useHistory();
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    categoryName: yup.string().required("Tên danh mục không được để trống"),
  });
  const [category, setCategory] = useState();

  const fetchCategoryById = async (id) => {
    setCategory((prevState) => {
      return { ...prevState, isLoading: true };
    });
    try {
      const response = await ManagerCategoryAPI.getCategoryByID(cateId);
      setCategory({ data: response, isLoading: false, isSuccess: true });
    } catch (error) {
      setCategory({ data: null, isLoading: false, isSuccess: false });
      console.log("fail to fetch address");
    }
  };

  useEffect(() => {
    fetchCategoryById();
  }, [cateId]);

  useEffect(() => {
    setValue("categoryName", category?.data?.categoryName);
  }, [category]);

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
      let param = {...data,categoryId:cateId}
    try {
      const response = await ManagerCategoryAPI.edit(param);
      if (response.error) {
      }
      else if (!response) {
        throw new Error("response.error");
      } else {
        alert("Sửa danh mục thành công");
        history.push("/manager/category");
      }
    } catch (error) {
      alert("sửa danh mục thất bại");
      console.log("fail to fetch edit category");
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
      {/* <Prompt
                when={isDirty && !isSubmitted}
                message="Changes you made may not be saved."
            /> */}
      <div className="bg-box bg-shadow">
        <h3>Thêm danh mục</h3>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Tên danh mục</label>
          <input
            className="form-control"
            {...register("categoryName")}
            type="text"
            id="name"
            placeholder="Nhập tên sản phẩm"
          />
          <span className="error-message">{errors?.categoryName?.message}</span>
          <div className="mt-3 d-flex justify-content-center">
            <YLButton variant="primary" type="submit" value="Xong" />
            <YLButton variant="link" to="/manager/category" value="Hủy" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ManagerCategoryEdit;
