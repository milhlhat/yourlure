import React, { useEffect, useState } from "react";
import "assets/scss/scss-components/user/management-account.scss";
import UserApi from "api/user-api";

function ManagementAccount(props) {
  const id = 1;
  const [account, setAccount] = useState(null);
  const fetchUser = async () => {
    try {
      const response = await UserApi.get(id);
      if (response.error) {
        throw new Error(response.error);
      } else {
        setAccount(response);
      }
    } catch (error) {
      console.log("fail to fetch customer list");
    }
  };
  const changeTab = (value) => {
    setTabOpen(value);
  };
  const listTab = [
    {
      name: "tab-account",
      component: <AccountTab account={account} changeTab={changeTab} />,
    },
    { name: "tab-payment", component: <PaymentTab /> },
    {
      name: "change-info",
      component: <ChangeInfomation changeTab={changeTab} />,
    },
  ];
  const [tabOpen, setTabOpen] = useState(0);
  useEffect(() => {
    fetchUser();
    return fetchUser();
  }, []);
  return (
    <div className="management-account container">
      <div className="tab-switch">
        <div className="account-name">
          <i class="fa fa-user-circle"></i>
          <span className="ms-2">
            {account != null ? account.userName : ""}
          </span>
        </div>
        <hr />
        <div className="tab-choosen row">
          <div
            className={`my-account col-6 col-md-12 ${
              tabOpen != 1 ? "active" : ""
            }`}
            onClick={() => changeTab(0)}
          >
            <i class="fa fa-user-circle "></i>
            <span className="cursor-pointer ms-2">Tài khoản</span>
          </div>
          <div
            className={`my-account col-6 col-md-12 ${
              tabOpen == 1 ? "active" : ""
            }`}
            onClick={() => changeTab(1)}
          >
            <i class="fa fa-clipboard cursor-pointer"></i>
            <span className="cursor-pointer ms-2">Đơn hàng</span>
          </div>
        </div>
      </div>
      <div className="tab-show bg-white">
        <div>{listTab[tabOpen].component}</div>
      </div>
    </div>
  );
}

function AccountTab(props) {
  const { account, changeTab } = props;

  useEffect(() => {}, []);
  return (
    <div className="account-tab m-lg-5 m-2 m-md-4">
      <span>account tab work</span>
      <table>
        <tr>
          <td>Tên</td>
          <td>{account ? account.userName : ""}</td>
        </tr>
        <tr>
          <td>Giới tính</td>
          <td>{account ? (account.gender ? "Nam" : "Nữ") : ""}</td>
        </tr>
        <tr>
          <td>Số điện thoại</td>
          <td>{account ? account.phone : ""}</td>
        </tr>
        <tr>
          <td>Địa chỉ</td>
          <td>{account ? account.address : ""}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{account ? account.userEmail : ""}</td>
        </tr>
        <tr>
          <td>
            <a className="cursor-pointer" onClick={() => changeTab(2)}>
              Sửa thông tin
            </a>
          </td>
          <td></td>
        </tr>
      </table>
    </div>
  );
}
function ChangeInfomation(props) {
  const { account, changeTab } = props;
  return (
    <div>
      <span>change infomation tab work</span>
      <a className="cursor-pointer" onClick={() => changeTab(0)}>
        Hủy
      </a>
    </div>
  );
}
function PaymentTab(props) {
  return (
    <div>
      <span>payment tab work</span>
    </div>
  );
}

export default ManagementAccount;
