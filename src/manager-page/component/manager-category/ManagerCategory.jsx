import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ManagerCategoryAPI from "api/manager-category-api";
import Editor from "assets/icon/editor.svg";
import Trash from "assets/icon/trash.svg";
import YLButton from "components/custom-field/YLButton";
import { useHistory, useLocation } from "react-router-dom";
import "./scss/manager-category.scss";
import ConfirmPopup from "components/confirm-popup/ComfirmPopup";
import { useForm } from "react-hook-form";
import { filterConfig } from "constant/filter-setting";
import Pagination from "react-js-pagination";

ManagerCategory.propTypes = {};

function ManagerCategory(props) {
  const [categoryList, setCategoryList] = useState({
    data: [],
    isLoading: false,
    isSuccess: true,
  });
  const location = useLocation();
  const setBack = {
    canBack: true,
    path: location,
    label: "Danh mục",
  };
  const history = useHistory();

  //filter category
  const [filter, setFilter] = useState({
    isAsc: true,
    keyword: "",
    limit: 1000,
    page: 0,
    sortBy: "categoryId",
  });

  const { register, handleSubmit } = useForm();

  //delete category
  const handleDelete = async (id) => {
    try {
      const response = await ManagerCategoryAPI.delete(id);
      if (response.error) {
        throw new Error(response.error);
      } else {
        alert("Xóa danh mục thành công");
      }
    } catch (error) {
      alert("Xóa danh mục thất bại");
      console.log("fail to fetch delete address");
    }
    fetchManagerCategory();
  };


  const onsubmit = async (data) => {
    let searchFilter = { ...filter, keyword: data.keyWord };
    setCategoryList((prevState) => {
      return { ...prevState, isLoading: true };
    });
    try {
      const response = await ManagerCategoryAPI.searchByName(searchFilter);
      setCategoryList({ data: response, isLoading: false, isSuccess: true });
    } catch (error) {
      setCategoryList({ data: null, isLoading: false, isSuccess: false });
      console.log("fail to fetch address");
    }
  };

  const fetchManagerCategory = async () => {
    setCategoryList((prevState) => {
      return { ...prevState, isLoading: true };
    });
    try {
      const response = await ManagerCategoryAPI.searchByName(filter);
      setCategoryList({ data: response, isLoading: false, isSuccess: true });
    } catch (error) {
      setCategoryList({ data: null, isLoading: false, isSuccess: false });
      console.log("fail to fetch address");
    }
  };
  const listNameCategory = () => {
    let list = [];
    if (categoryList.data) {
      categoryList.data.map((value) => {
        list.push(value.categoryName);
      });
    }
    return list;
  };
  useEffect(() => {
    fetchManagerCategory();
  }, [filter]);
  return (
    <>
      <div className="caterory-head-row">
        <h3>Danh mục</h3>
        <div className="product-add-new">
          <YLButton
            variant="primary"
            onClick={() => history.push("/manager/category/addnew")}
            value="Thêm"
            to={{
              pathname: "/manager/category/addnew",
              canBack: setBack,
              listName: listNameCategory(),
            }}
          />
        </div>
      </div>
      <div className="manager-category-show mt-3 bg-white bg-shadow">
        <span>tất cả danh mục</span>
        <hr />

        <div className="bg-white manager-sort p-2">
          <form onSubmit={handleSubmit(onsubmit)}>
            <div className="row">
              <div className="col-2">
                <YLButton
                  type="submit"
                  value="tìm kiếm"
                  variant="primary"
                ></YLButton>
              </div>

              <div className="col-10">
                <input
                  className="form-control"
                  type="text"
                  {...register("keyWord")}
                  placeholder="Tìm kiếm"
                />
              </div>
            </div>
          </form>
        </div>
        {categoryList?.data?.length <= 0 && <p>Không có sản phẩm </p>}
        {categoryList?.data?.length > 0 && (
          <table>
            <tbody>
              <tr>
                <th>#</th>
                <th>Tên danh mục</th>
                <th></th>
                <th></th>
              </tr>
              {categoryList?.data?.map((item, i) => (
                <tr key={"cate-" + i}>
                  <td>{i + 1}</td>
                  <td>{item.categoryName}</td>
                  <td className="d-flex float-end">
                    <img
                      src={Editor}
                      className="pointer"
                      onClick={() =>
                        history.push(
                          {pathname:"/manager/category/edit/" + item.categoryID,
                          canBack:setBack
                        }
                        )
                      }
                    />
                    <ConfirmPopup
                      variant="link"
                      width="70px"
                      height="25px"
                      btnText={<img src={Trash} />}
                      title="Xóa"
                      content="Bạn chắc chắn muốn xóa Danh mục?"
                      onConfirm={() => handleDelete(item.categoryID)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default ManagerCategory;
