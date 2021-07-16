import ManagerOrderAPI from "api/manager-order-api";
import { filterConfig } from "constant/filter-setting";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useHistory, useLocation } from "react-router-dom";
import "./scss/manager-order.scss";
import ErrorLoad from "components/error-notify/ErrorLoad";
import Loading from "components/Loading";

function ManagerOrder(props) {
  const totalItem = 10;
  const [filterOrder, setFilterOrder] = useState({
    isAsc: true,
    keyword: "",
    limit: totalItem,
    page: 0,
    sortBy: "orderId",
  });
  const [orderList, setOrderList] = useState({
    data: [],
    isLoading: false,
    isSuccess: true,
  });

  const history = useHistory();
  const formatDate = (date) => {
    let formatDate = new Date(date);
    return (
      formatDate.getDate() +
      "/" +
      (formatDate.getMonth() + 1) +
      "/" +
      formatDate.getFullYear()
    );
  };

  const [activePage, setActivePage] = useState(1);
  function handlePageChange(newPage) {
    setActivePage(newPage);
    setFilterOrder({ ...filterOrder, page: newPage - 1 });
  }
  const location = useLocation();
  const setBack = {
    canBack: true,
    path: location,
    label: "Đơn hàng",
  };
  const fetchManagerOrder = async () => {
    setOrderList((prevState) => {
      return { ...prevState, isLoading: true };
    });
    try {
      const response = await ManagerOrderAPI.getAllOrder(filterOrder);
      setOrderList({ data: response, isLoading: false, isSuccess: true });
    } catch (error) {
      setOrderList({ data: null, isLoading: false, isSuccess: false });
      console.log("fail to fetch address");
    }
  };

  useEffect(() => {
    fetchManagerOrder();
  }, [filterOrder]);

  if (orderList.isLoading) {
    return <Loading />;
  } else if (!orderList.isSuccess) {
    return <ErrorLoad />;
  } else
    return (
      <>
      {console.log(orderList)}
        <div className="user-head-row">
          <h3>Đơn hàng</h3>
          <div className="product-add-new"></div>
        </div>
        <div className="manager-order-show mt-3 bg-white bg-shadow">
          <span>Tất cả đơn hàng</span>
          <hr />
          {/* <ManagerSort /> */}
          {orderList?.data?.orderDtoOutList?.length <= 0 && (
            <p>Không có đơn hàng</p>
          )}
          <table className="table">
            <tbody>
              <tr>
                <th>#</th>
                <th>Ngày</th>
                <th>Khách hàng</th>
                <th>Số điện thoại</th>
                <th>Tình trạng thực hiện</th>
                <th className="text-center">Tổng</th>
              </tr>
              {orderList?.data?.orderDtoOutList?.map((item, i) => (
                <tr
                  key={"manager-order-" + i}
                  className="pointer hover-background"
                  onClick={() =>
                    history.push({
                      pathname: "/manager/order/detail/" + item.orderID,
                      canBack: setBack,
                    })
                  }
                >
                  <td>{(activePage - 1) * totalItem + i + 1}</td>
                  <td>{item?.orderDate ? formatDate(item.orderDate) : "-"}</td>
                  <td>{item.receiverName ? item.receiverName : "-"}</td>
                  <td>{item.phone}</td>
                  <td className="text-center">
                    {item.statusName ? item.statusName : "-"}
                  </td>
                  <td className="text-end">
                    {!item
                      ? "N/A"
                      : Number(item.total).toLocaleString(undefined, {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        })}
                    {"\u20AB"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="m-auto p-4 d-flex justify-content-center">
            {orderList?.data?.totalPage >= 1 && (
              <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={activePage}
                itemsCountPerPage={totalItem}
                totalItemsCount={orderList?.data?.totalOrder}
                pageRangeDisplayed={filterConfig.PAGE_RANGE_DISPLAYED}
                onChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </>
    );
}

export default ManagerOrder;
