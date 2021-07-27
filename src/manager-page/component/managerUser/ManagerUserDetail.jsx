import ManagerUserApi from "api/manager-user-api";
import ErrorLoad from "components/error-notify/ErrorLoad";
import Loading from "components/Loading";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { convertToVND, formatDate } from "utils/format-string";
import "./scss/manager-user.scss";

function ManagerUserDetail(props) {
  const userId = props.match.params.id;
  const [user, setUser] = useState({
    data: null,
    isSuccess: true,
    isLoading: false,
  });
  const [userAddress, setUserAddress] = useState({
    data: null,
    isSuccess: true,
    isLoading: false,
  });
  const [userOrder, setUserOrder] = useState({
    data: null,
    isSuccess: true,
    isLoading: false,
  });
  const fetchUser = async () => {
    setUser({ ...user, isLoading: true });
    try {
      const response = await ManagerUserApi.getUserById(userId);
      if (response.error) {
        throw new Error(response.error);
      } else {
        setUser({
          data: response,
          isSuccess: true,
          isLoading: false,
        });
      }
    } catch (error) {
      setUser({
        ...user,
        isSuccess: false,
        isLoading: false,
      });
      console.log("fail to fetch user detail");
    }
  };
  const fetchUserAddress = async () => {
    setUserAddress({ ...userAddress, isLoading: true });
    try {
      const response = await ManagerUserApi.getAddressByUserId(userId);
      if (response.error) {
        throw new Error(response.error);
      } else {
        setUserAddress({
          data: response,
          isSuccess: true,
          isLoading: false,
        });
      }
    } catch (error) {
      setUserAddress({
        ...userAddress,
        isSuccess: false,
        isLoading: false,
      });
      console.log("fail to fetch user address");
    }
  };
  const options = [
    { value: "PENDING", lable: "Đang chờ xác nhận" },
    { value: "ACCEPT", lable: "Đang giao" },
    { value: "CUSTOMER_REJECT", lable: "Đã hủy bởi khách hàng" },
    { value: "STAFF_REJECT", lable: "Đã hủy bởi của hàng" },
  ];
  const formatActivity = (action) => {
    if (!action) return "N/A";
    let act = options.find((e) => e.value === action);
    // console.log(act);
    return act.lable;
  };
  const history = useHistory();
  const filterOrder = {
    isAsc: false,
    keyword: userId,
    limit: 1000,
    listCateId: [],
    listFishId: [],
    page: 0,
    sortBy: "orderId",
  };
  const fetchUserOrder = async () => {
    setUserOrder({ ...userOrder, isLoading: true });
    try {
      const response = await ManagerUserApi.getOrderByUserId(filterOrder);
      if (response.error) {
        throw new Error(response.error);
      } else {
        setUserOrder({
          data: response,
          isSuccess: true,
          isLoading: false,
        });
      }
    } catch (error) {
      setUserOrder({
        ...userOrder,
        isSuccess: false,
        isLoading: false,
      });
      console.log("fail to fetch user address");
    }
  };
  useEffect(() => {
    fetchUser();
    fetchUserAddress();
    fetchUserOrder();
  }, [userId]);
  if (user.isLoading) {
    return <Loading hasLayout />;
  } else if (!user.isSuccess) {
    return <ErrorLoad hasLayout />;
  } else
    return (
      <div className="manager-user-detail">
        <div className="bg-box bg-shadow mt-4 py-3">
          <h4>Thông tin tổng quan khách hàng</h4>
          <div className="row">
            <div className="col-6">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td>Tên khách hàng</td>
                    <td>{user?.data?.username}</td>
                  </tr>
                  <tr>
                    <td>Số điện thoại</td>
                    <td>{user?.data?.phone}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-6">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td>
                      Giới tính :{" "}
                      {user?.data?.gender !== null
                        ? user?.data?.gender
                          ? "Nam"
                          : "Nữ"
                        : "N/A"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="bg-box bg-shadow mt-4 manager-user-address">
          <div className="py-3">
            <h6>Thông tin địa chỉ</h6>
            <hr />
          </div>
          {userAddress?.data?.map((item, i) => (
            <div className="bg-shadow mt-3 p-2" key={"user-address-" + i}>
              <span>
                {item?.userName}
                {item?.isDefault && (
                  <span className="default-address"> Mặc định</span>
                )}
              </span>
              <br />
              <span>{item?.phone}</span>
              <br />
              <span>{item?.description}</span>
              <br />
              <span>
                {item?.userWardName +
                  ", " +
                  item?.userDistrictName +
                  ", " +
                  item?.userProvinceName}
              </span>
            </div>
          ))}
        </div>
        <div className="bg-box bg-shadow mt-4 manager-user-address">
          {userOrder?.data?.totalOrder <= 0 ? (
            <span>Khác hàng chưa có đơn hàng nào.</span>
          ) : (
            <table className="table">
              <tbody>
                <tr>
                  <th>Số đơn hàng</th>
                  <th>Ngày tạo</th>
                  <th>Tình trạng thực hiện</th>
                  <th className="text-center">Tổng</th>
                </tr>
                {userOrder?.data?.orders?.map((item, i) => (
                  <tr
                    key={"user-order-" + i}
                    className="pointer hover-background"
                    onClick={() =>
                      history.push({
                        pathname: "/manager/order/detail/" + item.orderId,
                      })
                    }
                  >
                    <td>{item.orderCode}</td>
                    <td>{formatDate(item.orderDate)}</td>
                    <td>
                      {formatActivity(item?.activities[0]?.activityName)}{" "}
                    </td>
                    <td className="text-end">{convertToVND(item.total)} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
}

export default ManagerUserDetail;
