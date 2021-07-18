import React, { useState, useEffect } from "react";
import ManagerCategoryAPI from "../../../api/manager-category-api";
import { useWatch } from "react-hook-form";

function CategorySelectFormHook(props) {
  const { methods, name, label, message, isRequired, type } = props;
  const {
    register,
    control,
    formState: { errors },
  } = methods;

  const [categoryList, setCategoryList] = useState({
    list: [],
    loading: true,
    success: false,
  });
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await ManagerCategoryAPI.getAll();
        setCategoryList({
          list: response,
          loading: false,
          success: true,
        });
      } catch (error) {
        console.log("fail to fetch");
      }
    };
    fetchCategory();
  }, []);
  const watchCateId = useWatch({
    control,
    name: name,
    defaultValue: null,
  });
  return (
    <>
      <select
        {...register(name)}
        className="form-select"
        id={name}
        defaultValue={watchCateId}
      >
        <option>Chọn danh mục</option>
        {categoryList?.list.map((cate, i) => (
          <option key={"cateOption" + i} value={cate.categoryID}>
            {cate.categoryName}
          </option>
        ))}
      </select>
      <span className="error-message">
        {message ? message : errors[name]?.message}
      </span>
    </>
  );
}

export default CategorySelectFormHook;
