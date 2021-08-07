import ManagerProductAPI, { deleteProductById } from "api/manager-product-api";
import Editor from "assets/icon/editor.svg";
import Trash from "assets/icon/trash.svg";
import "assets/scss/scss-manager/manager-product.scss";
import YLButton from "components/custom-field/YLButton";
import ErrorLoad from "components/error-notify/ErrorLoad";
import Loading from "components/Loading";
import { filterConfig } from "constant/filter-setting";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useHistory } from "react-router-dom";
import { convertToVND } from "utils/format-string";
import ConfirmPopupV2 from "../../../components/confirm-popup/ConfirmPopupV2";
import { toast } from "react-toastify";
import ManagerSortQueryString from "../sort/ManagerSortQueryString";
import "./scss/filter-manage-product.scss";
import queryString from "query-string";

ManagerProduct.propTypes = {};

function ManagerProduct(props) {
  const rootPath = props.location.pathname;
  let params = new URLSearchParams(props.location.search);

  let isAsc = params.get("isAsc") || false;
  let keyword = params.get("keyword") || "";
  let limit = params.get("limit") || filterConfig.LIMIT_DATA_PER_PAGE;
  let page = params.get("page") || filterConfig.PAGE_NUMBER_DEFAULT;
  let sortBy = params.get("sortBy") || "product_id";
  let custom = params.get("custom") || false;
  let visibleInStorefront = params.get("visibleInStorefront") || "null";
  const currentFilter = {
    isAsc,
    keyword,
    limit,
    page,
    sortBy,
    custom,
    visibleInStorefront,
    listCateId: [],
    listFishId: [],
  };

  const [products, setProducts] = useState({
    data: [],
    isLoading: true,
    success: false,
  });
  const SORT_OPTIONS = [
    {
      display: "Cũ nhất",
      isAsc: true,
      sortBy: "product_id",
      value: "SORT_PRODUCT_ID",
    },
    {
      display: "Mới nhất",
      isAsc: false,
      sortBy: "product_id",
      value: "SORT_PRODUCT_ID",
    },
    {
      display: "Tên giảm dần",
      isAsc: false,
      sortBy: "product_name",
      value: "SORT_NAME_PRODUCT_ASC",
    },
    {
      display: "Tên sản phẩm tăng dần",
      isAsc: true,
      sortBy: "product_name",
      value: "SORT_NME_PRODUCT_DESC",
    },
    {
      display: "Giá tăng dần",
      isAsc: true,
      sortBy: "default_price",
      value: "SORT_PRICE_PRODUCT_DESC",
    },
    {
      display: "Giá giảm dần",
      isAsc: false,
      sortBy: "default_price",
      value: "SORT_PRICE_PRODUCT_ASC",
    },
  ];

  const fetchManagerProduct = async () => {
    try {
      const response = await ManagerProductAPI.getProductByFilter(
        currentFilter
      );
      setProducts({ data: response, isLoading: false, success: true });
    } catch (error) {
      setProducts({ data: null, isLoading: false, success: false });
      toast.error("Hệ thống gặp lỗi lạ!");
    }
  };
  const history = useHistory();

  const handleEditClicked = (e, data) => {
    e.stopPropagation();
    history.push({
      pathname: "/manager/product/edit/" + data,
    });
  };

  function handlePageChange(newPage) {
    const query = queryString.stringify({ currentFilter, page: newPage - 1 });
    history.push(`${rootPath}?${query}`);
  }

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProductById(productId);
      toast.success("Xoá thành công");
      await fetchManagerProduct();
    } catch (e) {
      toast.error(e.response.data);
    }
  };
  useEffect(() => {
    fetchManagerProduct();
  }, [props.location]);

  if (products.isLoading) {
    return <Loading />;
  } else if (!products.success) {
    return <ErrorLoad />;
  } else
    return (
      <>
        <div className="product-head-row">
          <h3>Sản phẩm</h3>
          <div className="product-add-new">
            <YLButton
              variant="primary"
              onClick={() => history.push("/manager/product/addnew")}
              value="Thêm"
              to={{ pathname: "/manager/product/addnew" }}
            />
          </div>
        </div>
        <div className="manager-product-show mt-3 bg-white bg-shadow">
          <span>Tất cả sản phẩm</span>
          <hr />

          <ManagerSortQueryString
            options={SORT_OPTIONS}
            defaultFilter={currentFilter}
            rootPath={rootPath}
            plugin={CheckBoxFilter}
          />
          {products?.data?.productOutputList?.length <= 0 && (
            <p>Không có sản phẩm </p>
          )}
          <table>
            <tbody>
              <tr>
                <th>#</th>
                <th>Tên sản phẩm</th>
                <th>Danh mục</th>
                <th className="text-center">Trạng thái</th>
                <th className="text-center pointer">Giá</th>
                <th />
                <th />
              </tr>
              {products?.data?.productOutputList?.map((item, i) => (
                <tr
                  key={i}
                  className="hover-background pointer"
                  onClick={() =>
                    history.push({
                      pathname: "/manager/product/detail/" + item.productId,
                    })
                  }
                >
                  <td>{page * limit + i + 1}</td>
                  <td>{item.productName}</td>
                  <td>{item.category.categoryName}</td>
                  <td className="text-center py-2">
                    {item.visibleInStorefront == null
                      ? "-"
                      : item.visibleInStorefront
                      ? "Đang kinh doanh"
                      : "Ngừng kinh doanh"}
                  </td>
                  <td className="text-end pe-4">
                    {!item ? "N/A" : convertToVND(item.defaultPrice)}
                  </td>
                  <td onClick={(e) => handleEditClicked(e, item.productId)}>
                    <img src={Editor} className="pointer" />
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <ConfirmPopupV2
                      onConfirm={() => handleDeleteProduct(item.productId)}
                      title={"Xoá sản phẩm"}
                      content={"Chắc chắn xoá: " + item.productName}
                    >
                      <img src={Trash} />
                    </ConfirmPopupV2>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="m-auto p-4 d-flex justify-content-center">
            {products?.data?.totalPage > 1 && (
              <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={Number(page) + 1}
                itemsCountPerPage={filterConfig.LIMIT_DATA_PER_PAGE}
                totalItemsCount={products?.data?.totalProduct}
                pageRangeDisplayed={filterConfig.PAGE_RANGE_DISPLAYED}
                onChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </>
    );
}

const CheckBoxFilter = ({ filter, setFilter, rootPath }) => {
  const history = useHistory();
  const OPTION_VISIBLE = [
    {
      display: "Tất cả",
      value: "null",
    },
    {
      display: "Đang kinh doanh",
      value: true,
    },
    {
      display: "Ngừng kinh doanh",
      value: false,
    },
  ];

  function handleSelectVisible(e) {
    let value = e.target.value;
    let temp = { ...filter };

    temp = { ...temp, visibleInStorefront: value };

    setFilter(temp);
    const query = queryString.stringify(temp);
    history.push(`${rootPath}?${query}`);
  }

  function handleCheckCustom(e) {
    const checked = e.target.checked;
    console.log(checked);
    let temp = { ...filter };
    temp = { ...temp, custom: checked };
    setFilter(temp);
    const query = queryString.stringify(temp);
    history.push(`${rootPath}?${query}`);
  }

  return (
    <div
      className={
        "d-flex flex-wrap my-3 align-items-center justify-content-end w-100"
      }
    >
      <div className={"col-8 text-end"}>
        <input
          type={"checkbox"}
          id={"custom"}
          name={"custom"}
          className={"form-check-input pointer me-2"}
          onChange={handleCheckCustom}
        />
        <label htmlFor={"custom"}>Có tuỳ biến</label>
      </div>
      <div className={"col-4 ps-3"}>
        <select className={"form-select "} onChange={handleSelectVisible}>
          {OPTION_VISIBLE.map(({ display, value }, i) => (
            <option key={"visible" + i} value={value}>
              {display}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default ManagerProduct;
