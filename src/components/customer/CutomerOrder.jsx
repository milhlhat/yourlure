import React, { useEffect, useState } from "react";
import ComfirmPopup from "components/confirm-popup/ComfirmPopup";
import "assets/scss/scss-components/customer/manage-order.scss";
import OrderAPI from "api/order-api";
import { filterConfig } from "constants/filter-setting";
import Loading from "components/Loading";
import ErrorLoad from "components/error-notify/ErrorLoad";
import { toast } from "react-toastify";

import Pagination from "react-js-pagination";
import {
  convertToVND,
  formatDate,
  getShipping,
  getStatus,
  totalPrice,
} from "utils/format-string";
import { createImageUrlByLinkOrFile } from "utils/manager-product";
import { useHistory } from "react-router-dom";

function CutomerOrder(props) {
  const [page, setPage] = useState(0);
  const totalItemInPage = 12;
  let [errorMesage, setErrorMessage] = useState();
  const [activePage, setActivePage] = useState(1);
  const [orderList, setOrderList] = useState({
    data: [],
    isLoading: false,
    isSuccess: true,
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
      // const response = await OrderAPI.getUserOrder(totalItemInPage,page);
      const response = await OrderAPI.getOrder(totalItemInPage, page);
      setOrderList({ data: response, isLoading: false, isSuccess: true });
    } catch (error) {
        setOrderList({ data: null, isLoading: false, isSuccess: true });
      // if (error.response.status === 400) {
      //   // setErrorMessage(error.response.data);
      // } else {
      //   console.log("fail to fetch order");
      // }
    }
  };
  const onConfirm = async (data) => {
    try {
      // const response = await OrderAPI.getUserOrder(totalItemInPage,page);
      const response = await OrderAPI.userCancelOrder(data);

      toast.success("Hủy đơn thành công");
      fetchCustomOrder();
    } catch (error) {
      toast.success(error.response.data)
      console.log("fail to fetch order");
    }
  };
  const history=useHistory()
  useEffect(() => {
    fetchCustomOrder();
    // return fetchCustomOrder();
  }, []);
  if (orderList.isLoading) {
    return <Loading />;
  } else if (!orderList.isSuccess) {
    return <ErrorLoad />;
  } else
    return (
      <div className="order">
        {console.log(orderList?.data)}
        <div className="order-row">
          {orderList?.data?.orders?.length <= 0 && (
            <div className="bg-box">
              <span>Bạn chưa có đơn hàng nào.</span>
            </div>
          )}
          {orderList?.data === null && (
            <div className="bg-box">
              <span>Không tim thấy order</span>
            </div>
          )}
          {orderList?.data?.orders?.map((order, i) => (
            <div key={"order-" + i} className="mb-5 bg-box bg-shadow">
              <div className="order-info">
                <span>Ngày đặt hàng {formatDate(order?.orderDate)}</span>
                <span className="text-success">
                  {getStatus(order?.activities[0]?.activityName,"CUSTOMER")}
                </span>
              </div>
              <div className="order-product-list">
                {order?.items?.map((product, i) => (
                  <div
                    className="order-row-item text-small p-2 pe-2 mb-2 pointer"
                    key={"order-product-" + i}
                    onClick={()=>history.push(`/product/detail/${product.productId}`)}
                  >
                    <img className="order-img" src={createImageUrlByLinkOrFile(product?.thumbnailUrl)} />
                    <div className="order-row-item-info">
                      <span className="order-title">
                        {product?.productName}
                      </span>
                      <span className="number-order">X{product?.quantity}</span>
                      <span>{convertToVND(product?.price)}</span>
                    </div>
                    <span className="ms-auto">
                      {convertToVND(product?.quantity * product?.price)}
                    </span>
                  </div>
                ))}
              </div>
              <hr />
              <div className="d-flex">
                <div className="col-6">
                  <div className="order-address bold">
                    Địa chỉ nhận hàng: <br />
                    {order.receiverName} <br /> {order.phone}
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
                          <span>{convertToVND(25000)}</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="pe-3">
                          <span className="order-title">Giảm giá:</span>
                        </td>
                        <td className="text-end">
                          <span>{convertToVND(order?.discount)}</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="pe-3 text-end">
                          <span className="order-title ">Tổng:</span>
                        </td>
                        <td className="text-end">
                          <span>{convertToVND((totalPrice(order?.items)+getShipping()-order?.discount))}</span>
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
                        disabled={order?.activities[0]?.activityName!=="PENDING"}
                        content="Bạn chắc chắn hủy đơn hàng?"
                        onConfirm={() => onConfirm(order.orderId)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="m-auto p-4">
            {orderList?.data?.totalPage > 1 && (
              <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={activePage}
                itemsCountPerPage={totalItemInPage}
                totalItemsCount={orderList?.data?.totalItem}
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
