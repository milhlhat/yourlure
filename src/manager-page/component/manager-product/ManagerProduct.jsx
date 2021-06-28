import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchFilter } from "utils/manager-product";
import { useDispatch, useSelector } from "react-redux";
import {
  findByManagerFilter,
  setFilter,
} from "redux/product-action/manager/fetch-manager-filter";
import Loading from "components/Loading";
import ErrorLoad from "components/ErrorLoad";
import Pagination from "react-js-pagination";
import { filterConfig } from "constant/filter-setting";
import YLButton from "components/custom-field/YLButton";
import "assets/scss/scss-manager/manager-product.scss";
import { useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Editor from "assets/icon/editor.svg";
import Trash from "assets/icon/trash.svg";
import ManagerSort from "manager-page/component/sort/ManagerSort";

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
          {products.productOutputList &&
            products.productOutputList.length <= 0 && <p>Không có sản phẩm </p>}
          <table>
            <tbody>
              <tr>
                <th>#</th>
                <th>Tên sản phẩm</th>
                <th>Danh mục</th>
                <th>Đã đăng tải</th>
                <th>Giá</th>
                <th></th>
              </tr>
              {products.productOutputList &&
                products.productOutputList.map((item, i) => (
                  <tr key={i}>
                    <td>
                      {(activePage - 1) * filterConfig.LIMIT_DATA_PER_PAGE +
                        i +
                        1}
                    </td>
                    <td
                      className="pointer"
                      onClick={() =>
                        history.push(
                          "/manager/product/detail/" + item.productId
                        )
                      }
                    >
                      {item.productName}
                    </td>
                    <td>{item.category.categoryName}</td>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        checked={item.visibleInStorefront}
                        disabled
                      />
                    </td>
                    <td>
                      {!item
                        ? "N/A"
                        : Number(item.defaultPrice).toLocaleString(undefined, {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          })}
                    </td>
                    <td>
                      <img src={Editor} />
                    </td>
                    <td>
                      <img src={Trash} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="m-auto p-4">
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
