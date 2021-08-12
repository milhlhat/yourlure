import { yupResolver } from "@hookform/resolvers/yup";
import ManagerCategoryAPI from "api/manager-category-api";
import YLButton from "components/custom-field/YLButton";
import YlInputFormHook from "components/custom-field/YLInputFormHook";
import ErrorLoad from "components/error-notify/ErrorLoad";
import Loading from "components/Loading";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

function ManagerCategoryEdit(props) {
  const cateId = props.match.params.id;
  const history = useHistory();
  const schema = yup.object().shape({
    categoryName: yup.string().required("Tên danh mục không được để trống"),
  });
  const [category, setCategory] = useState({
    data: null,
    isLoading: false,
    isSuccess: true,
  });

  const fetchCategoryById = async () => {
    setCategory((prevState) => {
      return { ...prevState, isLoading: true };
    });
    try {
      const response = await ManagerCategoryAPI.getCategoryByID(cateId);
      setCategory({ data: response, isLoading: false, isSuccess: true });
      setValue("categoryName", response?.categoryName);
    } catch (error) {
      setCategory({ data: null, isLoading: false, isSuccess: false });
      console.log("fail to fetch address");
    }
  };

  useEffect(() => {
    fetchCategoryById();
  }, [cateId]);

  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = methods;

  const onSubmit = async (data) => {
    let param = { ...data, categoryId: cateId };
    try {
      const response = await ManagerCategoryAPI.edit(param);
      if (response.error) {
      } else if (!response) {
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

  if (category.isLoading) {
    return <Loading />;
  } else if (!category.isSuccess) {
    return <ErrorLoad />;
  } else
    return (
      <div>
        {/* <Prompt
                when={isDirty && !isSubmitted}
                message="Changes you made may not be saved."
            /> */}
        <div className="bg-box bg-shadow">
          <h3>Sửa danh mục</h3>
          <hr />
          <form onSubmit={handleSubmit(onSubmit)}>
          <YlInputFormHook
            methods={methods}
            placeholder="Nhập tên danh mục"
            name="categoryName"
            label="Tên danh mục(*)"
            isRequired
            onBlur={(e) => {
              e.target.value = e.target.value.trim();
              register("categoryName", {
                required: "Tên danh mục không được để trống",
              });
              setValue("categoryName", e.target.value.trim());
            }}
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

export default ManagerCategoryEdit;
