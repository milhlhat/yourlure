import React, { useEffect, useState } from "react";
import "assets/scss/scss-components/customer/management-account.scss";
import UserApi from "api/user-api";
import Loading from "components/Loading";
import ErrorLoad from "components/ErrorLoad";
import DEFINELINK from "routes/define-link";
import { Link, useLocation } from "react-router-dom";
function ManagementAccount({ children }) {
  const [account, setAccount] = useState({
    data: null,
    isLoading: false,
    isSuccess: false,
  });
  const location = useLocation().pathname;
  const ACCOUNT_PATH = DEFINELINK.customer + DEFINELINK.account;
  const ORDER_PATH = DEFINELINK.customer + DEFINELINK.order;
  const ADDRESS_PATH = DEFINELINK.customer + DEFINELINK.address;
  const CHANGEPASSWORD_PATH = DEFINELINK.customer + DEFINELINK.changePassword;
  useEffect(() => {
    const fetchCustomAccount = async () => {
      setAccount((prevState) => {
        return { ...prevState, isLoading: true };
      });
      try {
        const response = await UserApi.getMe();
        setAccount({ data: response, isLoading: false, isSuccess: true });
      } catch (error) {
        setAccount({ data: null, isLoading: false, isSuccess: false });
        console.log("fail to fetch information");
      }
    };
    fetchCustomAccount();
    return fetchCustomAccount();
  }, []);

  // if (account.isLoading) {
  //   return <Loading />;
  // } else if (!account.isSuccess) {
  //   return <ErrorLoad />;
  // } else
  return (
    <div className="management-account container">
      <div className="row w-100">
        <div className="tab-switch bg-white col-3">
          <div className="account-name pt-2 ps-2">
            <i className="fad fa-user"></i>
            <span className="ms-2">
              {account.list != null ? account.list.userName : ""}
            </span>
          </div>
          <hr />

          <div className="tab-choosen p-2 cursor-pointer">
            <Link
              to={DEFINELINK.customer}
              className={`${
                location.indexOf(ACCOUNT_PATH) > -1 ? "active" : ""
              }`}
            >
              <i className="fad fa-user  "></i>
              Tài khoản
            </Link>

            <Link
              to={ORDER_PATH}
              className={`${location.indexOf(ORDER_PATH) > -1 ? "active" : ""}`}
            >
              <i className="fad fa-receipt   "></i>
              Đơn hàng
            </Link>

            <Link
              to={ADDRESS_PATH}
              className={`${
                location.indexOf(ADDRESS_PATH) > -1 ? "active" : ""
              }`}
            >
              <i className="fad fa-address-card  "></i>
              Địa chỉ
            </Link>
            <Link
              to={CHANGEPASSWORD_PATH}
              className={`${
                location.indexOf(CHANGEPASSWORD_PATH) > -1 ? "active" : ""
              }`}
            >
              <i className="fad fa-shield"></i>
              Đổi mật khẩu
            </Link>
          </div>
        </div>
        <div className="tab-show  col-9">{children({ ...account })}</div>
      </div>
    </div>
  );
}

export default ManagementAccount;
