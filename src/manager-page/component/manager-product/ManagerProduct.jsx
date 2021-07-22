import ManagerProductAPI, { deleteProductById } from "api/manager-product-api";
import Editor from "assets/icon/editor.svg";
import Trash from "assets/icon/trash.svg";
import "assets/scss/scss-manager/manager-product.scss";
import YLButton from "components/custom-field/YLButton";
import ErrorLoad from "components/error-notify/ErrorLoad";
import Loading from "components/Loading";
import { filterConfig } from "constant/filter-setting";
import ManagerSort from "manager-page/component/sort/ManagerSort";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useHistory, useLocation } from "react-router-dom";
import { convertToVND } from "utils/format-string";
import ConfirmPopupV2 from "../../../components/confirm-popup/ConfirmPopupV2";
import { toast } from "react-toastify";

ManagerProduct.propTypes = {};

function ManagerProduct(props) {
  const [activePage, setActivePage] = useState(1);
  const [productFilter, setProductFilter] = useState({
    listCateId: [],
    listFishId: [],
    page: filterConfig.PAGE_NUMBER_DEFAULT,
    limit: filterConfig.LIMIT_DATA_PER_PAGE,
    isAsc: false,
    sortBy: "productId",
    keyword: "",
  });
  const [products, setProducts] = useState({
    data: [],
    isLoading: false,
    success: true,
  });
  const SORT_OPTIONS = [
    {
      display: "Id sản phẩm",
      isAsc: false,
      sortBy: "productId",
      value: "SORT_PRODUCT_ID",
    },
    {
      display: "Tên giảm dần",
      isAsc: false,
      sortBy: "productName",
      value: "SORT_NAME_PRODUCT_ASC",
    },
    {
      display: "Tên sản phẩm tăng dần",
      isAsc: true,
      sortBy: "productName",
      value: "SORT_NME_PRODUCT_DESC",
    },
    {
      display: "Giá tăng dần",
      isAsc: true,
      sortBy: "defaultPrice",
      value: "SORT_PRICE_PRODUCT_DESC",
    },
    {
      display: "Giá giảm dần",
      isAsc: false,
      sortBy: "defaultPrice",
      value: "SORT_PRICE_PRODUCT_ASC",
    },
  ];
  const fetchManagerProduct = async () => {
    setProducts((prevState) => {
      return { ...prevState, isLoading: true };
    });
    try {
      const response = await ManagerProductAPI.getProductByFilter(
        productFilter
      );
      setProducts({ data: response, isLoading: false, success: true });
    } catch (error) {
      setProducts({ data: null, isLoading: false, success: false });
      console.log("fail to fetch product");
    }
  };
  const history = useHistory();
  const location = useLocation();

  const handleEditClicked = (e, data) => {
    e.stopPropagation();
    history.push({
      pathname: "/manager/product/edit/" + data,
    });
  };

  function handlePageChange(newPage) {
    setProductFilter({ ...productFilter, page: newPage - 1 });
    setActivePage(newPage);
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
  }, [productFilter]);
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
          <ManagerSort
            filter={productFilter}
            setFilter={setProductFilter}
            options={SORT_OPTIONS}
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
                <th
                  onClick={() =>
                    setProductFilter({
                      ...productFilter,
                      isAsc: !productFilter.isAsc,
                      sortBy: "defaultPrice",
                    })
                  }
                  className="text-center pointer"
                >
                  Giá
                </th>
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
                  <td>
                    {(activePage - 1) * filterConfig.LIMIT_DATA_PER_PAGE +
                      i +
                      1}
                  </td>
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
                activePage={activePage}
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

export default ManagerProduct;
