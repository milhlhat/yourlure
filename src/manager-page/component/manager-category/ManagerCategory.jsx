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
import ManagerSort from "manager-page/component/sort/ManagerSort";
import ErrorLoad from "components/error-notify/ErrorLoad";
import Loading from "components/Loading";

ManagerCategory.propTypes = {};

function ManagerCategory(props) {
  const [categoryList, setCategoryList] = useState({
    data: [],
    isLoading: false,
    isSuccess: true,
  });
  // const location = useLocation();
  // const setBack = {
  //   canBack: true,
  //   path: location,
  //   label: "Danh mục",
  // };
  const history = useHistory();

  const options = [
    {
      display: "Cũ nhất",
      isAsc: true,
      sortBy: "categoryId",
      value: "SORT_id_ASC",
    },
    {
      display: "Mới nhất",
      isAsc: false,
      sortBy: "categoryId",
      value: "SORT_id_DESC",
    },
    {
      display: "Tên từ A-Z",
      isAsc: true,
      sortBy: "categoryName",
      value: "SORT_NAME_DESC",
    },
    {
      display: "Tên từ Z-A",
      isAsc: false,
      sortBy: "categoryName",
      value: "SORT_NAME_DESC",
    },
  ];
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
      if (response.data != null && !response.data) {
        throw new Error();
      } else if (response.error) {
        throw new Error(response.error);
      } else {
        fetchManagerCategory();
      }
    } catch (error) {
      alert("Xóa danh mục thất bại");
      console.log("fail to fetch delete address");
    }
  };

  const onsubmit = async (data) => {
    let searchFilter = { ...filter, keyword: data.keyWord };
    setFilter({ ...filter, keyword: data.keyWord });
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

  if (categoryList.isLoading) {
    return <Loading />;
  } else if (!categoryList.isSuccess) {
    return <ErrorLoad />;
  } else
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
                listName: listNameCategory(),
              }}
            />
          </div>
        </div>
        <div className="manager-category-show mt-3 bg-white bg-shadow">
          <span>Tất cả danh mục</span>
          <hr />

          <div className="bg-white manager-sort p-2">
            <ManagerSort
              filter={filter}
              setFilter={setFilter}
              options={options}
            />
          </div>
          {categoryList?.data?.length <= 0 && (
            <p>Không có danh mục {filter?.keyword && `"${filter?.keyword}"`}</p>
          )}
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
                  <tr key={"cate-" + i} className="hover-background">
                    <td>{i + 1}</td>
                    <td
                      className="pointer"
                      onClick={() =>
                        history.push({
                          pathname:
                            "/manager/category/detail/" + item.categoryID,
                        })
                      }
                    >
                      {item.categoryName}
                    </td>
                    <td className="d-flex float-end">
                      <img
                        src={Editor}
                        className="pointer"
                        onClick={() =>
                          history.push({
                            pathname:
                              "/manager/category/edit/" + item.categoryID,
                          })
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
