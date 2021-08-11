import ManagerOrderAPI from "api/manager-order-api";
import ErrorLoad from "components/error-notify/ErrorLoad";
import Loading from "components/Loading";
import { filterConfig } from "constants/filter-setting";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useHistory } from "react-router-dom";
import { convertToVND, getStatus } from "utils/format-string";
import ManagerSort from "../sort/ManagerSort";
import "./scss/manager-order.scss";

function ManagerOrder(props) {
  const totalItem = 10;
  const [filterOrder, setFilterOrder] = useState({
    isAsc: false,
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
  const options = [
    {
      display: "Cũ nhất",
      isAsc: true,
      sortBy: "orderId",
      value: "SORT_id_ASC",
    },
    {
      display: "Mới nhất",
      isAsc: false,
      sortBy: "orderId",
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
  const [activePage, setActivePage] = useState(1);
  function handlePageChange(newPage) {
    setActivePage(newPage);
    setFilterOrder({ ...filterOrder, page: newPage - 1 });
  }
  // const location = useLocation();
  // const setBack = {
  //   canBack: true,
  //   path: location,
  //   label: "Đơn hàng",
  // };
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
          <ManagerSort  
            filter={filterOrder}
            setFilter={setFilterOrder}
            options={options}/>
          {orderList?.data?.orders?.length <= 0 && (
            <p>Không có đơn hàng</p>
          )}
          <table className="table">
            <tbody>
              <tr>
                <th>#</th>
                <th>Ngày</th>
                <th>Người nhận</th>
                <th>Mã đơn hàng</th>
                <th>Số điện thoại</th>
                <th>Tình trạng thực hiện</th>
                <th className="text-center">Tổng</th>
              </tr>
              {orderList?.data?.orders?.map((item, i) => (
                <tr
                  key={"manager-order-" + i}
                  className="pointer hover-background"
                  onClick={() =>
                    history.push({
                      pathname: "/manager/order/detail/" + item.orderId,
                    })
                  }
                >
                  <td>{(activePage - 1) * totalItem + i + 1}</td>
                  <td>{item?.orderDate ? formatDate(item.orderDate) : "-"}</td>
                  <td>{item.receiverName ? item.receiverName : "-"}</td>
                  <td>{item.orderCode ? item.orderCode : "-"}</td>
                  <td>{item.phone}</td>
                  <td >
                    {item?.activities[0]?.activityName
                      ? getStatus(item?.activities[0]?.activityName)
                      : "-"}
                  </td>
                  <td className="text-end">
                    {!item
                      ? "N/A"
                      : convertToVND(item?.total)}
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
