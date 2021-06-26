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
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Editor from "assets/icon/editor.svg";
import Trash from "assets/icon/trash.svg";

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

  function handlePageChange(newPage) {
    setActivePage(newPage);
    const filterAction = findByManagerFilter({
      ...productFilter,
      page: newPage - 1,
    });
    dispatch(filterAction);
  }
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
          <Link to="/manager/product/addnew">back</Link>
          <YLButton
            variant="primary"
            value="Thêm"
            to="/manager/product/addnew"
          />
        </div>
      </div>
      <div className="manager-product-show mt-3 bg-white bg-shadow">
        {products.productOutputList &&
          products.productOutputList.length <= 0 && <p>Không có sản phẩm </p>}
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Tên sản phẩm</th>
              <th>Danh mục</th>
              <th>Đã đăng tải</th>
              <th>Giá</th>
              <th></th>
            </tr>
            {products.productOutputList &&
              products.productOutputList.map((item, i) => (
                <tr key={i}>
                  <td>{item.productId}</td>
                  <td>{item.productName}</td>
                  <td>{item.category.categoryName}</td>
                  <td>
                    {item.visibleInStorefront ? "Hoạt động" : "Không hoạt động"}
                  </td>
                  <td>{item.defaultPrice}</td>
                  <td>
                    <img src={Editor} alt="" />
                    <img src={Trash} alt="" />
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
