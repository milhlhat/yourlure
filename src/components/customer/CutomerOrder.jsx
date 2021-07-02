import React, { useEffect, useState } from "react";
import YLButton from "components/custom-field/YLButton";
import ComfirmPopup from "components/confirm-popup/ComfirmPopup";
import "assets/scss/scss-components/customer/manage-order.scss";
import OrderAPI from "api/order-api";
import { filterConfig } from "constant/filter-setting";
import Loading from "components/Loading";
import ErrorLoad from "components/error-notify/ErrorLoad";

import Pagination from "react-js-pagination";
function CutomerOrder(props) {
  const [page, setPage] = useState(0);
  const totalItemInPage = 12;

  const [activePage, setActivePage] = useState(1);
  const [orderList, setOrderList] = useState({
    data: [],
    isLoading: false,
    isSuccess: false,
  });
  function handlePageChange(newPage) {
    setActivePage(newPage);
    setPage(newPage - 1);
  }
  const fetchCustomOrder = async () => {
    setOrderList((prevState) => {
      return { ...prevState, isLoading: true };
    });
    try {
      const response = await OrderAPI.getUserOrder(totalItemInPage, page);
      setOrderList({ data: response, isLoading: false, isSuccess: true });
    } catch (error) {
      setOrderList({ data: null, isLoading: false, isSuccess: false });
      console.log("fail to fetch order");
    }
  };

  function totalPrice(list) {
    let total = list.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);
    return total;
  }
  useEffect(() => {
    fetchCustomOrder();
    return fetchCustomOrder();
  }, []);
  if (orderList.isLoading) {
    return <Loading />;
  } else
    return (
      <div className="order">
        <div className="order-row">
        {orderList?.data?.orderDtoOuts?.length<=0&&<span>Bạn chưa có đơn hàng nào..</span>}
          {orderList?.data?.orderDtoOuts?.map((order, i) => (
            <div key={"order-" + i} className="mb-5 bg-box bg-shadow">
              <div className="order-info">
                <span>Ngày đặt hàng 12/06/2021</span>
                <span className="text-success">{order?.activityName==null?'Trạng thái':order?.activityName}</span>
              </div>
              <div className="order-product-list">
                {order?.productDtoOuts?.map((product, i) => (
                  <div
                    className="order-row-item text-small p-2 pe-2 mb-2"
                    key={"order-product-" + i}
                  >
                    <img
                      className="order-img"
                      src={product?.imageCollection[0]?.linkImage}
                    />
                    <div className="order-row-item-info">
                      <span className="order-title">
                        {product?.productName}
                      </span>
                      <span className="number-order">X{product?.quantity}</span>
                    </div>
                    <span className="ms-auto">
                      {Number(
                        product?.quantity * product?.price
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      })}
                      đ
                    </span>
                  </div>
                ))}
              </div>
              <hr />
              <div className="d-flex">
                <div className="col-6">
                  <div className="order-address">
                    <b>Địa chỉ nhận hàng:</b> <br />
                    {order.name} <br /> {order.phone}
                    <br /> {order.address}
                  </div>
                </div>
                <div className="col-6">
                  <div className="order-fee">
                    <table className="fee-table">
                      <tr>
                        <td className="pe-3">
                          <span className="order-title">Phí vận chuyển:</span>
                        </td>
                        <td className="text-end">
                          <span>25,000</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="pe-3 text-end">
                          <span className="order-title ">Tổng:</span>
                        </td>
                        <td className="text-end">
                          <span>
                            {Number(
                              totalPrice(order.productDtoOuts)
                            ).toLocaleString(undefined, {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            })}
                            đ
                          </span>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div className="order-action">
                    <div className="order-action-btn ms-auto">
                      <ComfirmPopup
                        btnText="Hủy Đơn"
                        height="30px"
                        title="Hủy đơn"
                        content="Bạn chắc chắn hủy đơn hàng?"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="m-auto p-4">
            {orderList?.data?.orderDtoOuts?.totalPage > 1 && (
              <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={activePage}
                itemsCountPerPage={filterConfig.LIMIT_DATA_PER_PAGE}
                totalItemsCount={orderList?.data?.orderDtoOuts?.totalItem}
                pageRangeDisplayed={filterConfig.PAGE_RANGE_DISPLAYED}
                onChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    );
}

export default CutomerOrder;
