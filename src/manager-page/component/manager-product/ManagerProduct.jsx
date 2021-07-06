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
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { findByManagerFilter } from "redux/product-action/manager/fetch-manager-filter";
import { fetchFilter } from "utils/manager-product";

ManagerProduct.propTypes = {};

function ManagerProduct(props) {
  const productFilter = useSelector(
    (state) => state.managerProductFilter.filter
  );
  const products = useSelector((state) => state.managerProductFilter.data);
  const isLoading = useSelector((state) => state.managerProductFilter.loading);
  const success = useSelector((state) => state.managerProductFilter.success);
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState(1);

  const history = useHistory();
  const location = useLocation();

  const handleEditClicked = (data) => {
    history.push({
      pathname: "/manager/product/edit/" + data,
      canBack: setBack,
    });
  };

  function handlePageChange(newPage) {
    setActivePage(newPage);
    const filterAction = findByManagerFilter({
      ...productFilter,
      page: newPage - 1,
    });
    dispatch(filterAction);
  }
  const setBack = {
    canBack: true,
    path: location,
    label: "Sản phẩm",
  };
  const handleClickDetail = () => {};
  useEffect(() => {
    fetchFilter(dispatch, productFilter);
  }, [productFilter]);
  if (isLoading) {
    return <Loading />;
  } else if (!success) {
    return <ErrorLoad />;
  } else
    return (
      <>
        <div className="product-head-row">
          <h3>Sản phẩm</h3>
          <div className="product-add-new">
            <YLButton
              variant="warning"
              onClick={() => history.push("/manager/product/addnew")}
              value="Thêm"
              to={{ pathname: "/manager/product/addnew", canBack: setBack }}
            />
          </div>
        </div>
        <div className="manager-product-show mt-3 bg-white bg-shadow">
          <span>tất cả sản phẩm</span>
          <hr />
          <ManagerSort />
          {products?.productOutputList?.length <= 0 && (
            <p>Không có sản phẩm </p>
          )}
          <table>
            <tbody>
              <tr>
                <th>#</th>
                <th>Tên sản phẩm</th>
                <th>Danh mục</th>
                <th className="text-center">Trạng thái</th>
                <th className="text-center">Giá</th>
                <th></th>
              </tr>
              {products?.productOutputList?.map((item, i) => (
                <tr key={i} className="hover-background">
                  <td>
                    {(activePage - 1) * filterConfig.LIMIT_DATA_PER_PAGE +
                      i +
                      1}
                  </td>
                  <td
                    className="pointer"
                    onClick={() =>
                      history.push("/manager/product/detail/" + item.productId)
                    }
                  >
                    {item.productName}
                  </td>
                  <td>{item.category.categoryName}</td>
                  <td className="text-center">
                    {item.visibleInStorefront == null
                      ? "-"
                      : item.visibleInStorefront
                      ? "Đang kinh doanh"
                      : "Ngừng kinh doanh"}
                  </td>
                  <td className="text-end pe-4">
                    {!item
                      ? "N/A"
                      : Number(item.defaultPrice).toLocaleString(undefined, {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        })}
                  </td>
                  <td>
                    <img
                      src={Editor}
                      className="pointer"
                      onClick={() => handleEditClicked(item.productId)}
                    />
                  </td>
                  <td>
                    <img src={Trash} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="m-auto p-4 d-flex justify-content-center">
            {products.totalPage > 1 && (
              <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={activePage}
                itemsCountPerPage={filterConfig.LIMIT_DATA_PER_PAGE}
                totalItemsCount={products.totalProduct}
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
