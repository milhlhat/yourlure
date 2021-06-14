import React, { useEffect, useState } from "react";
import "assets/scss/scss-components/user/management-account.scss";
import UserApi from "api/user-api";
import Loading from "components/loading";
import ErrorLoad from "components/ErrorLoad";
import UserAddress from "./UserAddress";
import ChangeAddress from './ChangeAddress';
import UserPayment from "./UserPayment";
import ChangeInformation from "./ChangeInformation";
import UserInformation from "./UserInformation";

function ManagementAccount(props) {
  const id = 1;
  const [account, setAccount] = useState({
    list: null,
    isFetched: false,
    failFetch: false,
  });
  const [addressList, setAddressList] = useState({
    list: [],
    isFetched: false,
    failFetch: false,
  });
  const fetchUser = async () => {
    try {
      const response = await UserApi.get(id);
      if (response.error) {
        setAccount({ ...account, failFetch: true });
        throw new Error(response.error);
      } else {
        setAccount({
          list: response,
          isFetched: true,
          failFetch: false,
        });
      }
    } catch (error) {
      setAccount({ failFetch: true });
      console.log("fail to fetch customer list");
    }
  };
  const [u, setU] = useState();
  const fetchUserAddress = async () => {
    try {
      const response = await UserApi.getAddress(id);
      if (response.error) {
        setAddressList({ ...addressList, failFetch: true });
        throw new Error(response.error);
      } else {
        setU(response);
        setAddressList({
          list: response,
          isFetched: true,
          failFetch: false,
        });
      }
    } catch (error) {
      setAddressList({ failFetch: true });
      console.log("fail to fetch customer list");
    }
  };
  const changeTab = (value) => {
    setTabOpen(value);
  };
  const listTab = [
    {
      name: "tab-account",
      component: <UserInformation account={account.list} changeTab={changeTab} />,
    },
    {
      name: "change-info",
      component: (
        <ChangeInformation account={account.list} changeTab={changeTab} />
      ),
    },
    { name: "tab-payment", component: <UserPayment /> },
    {
      name: "show-address",
      component: <UserAddress address={addressList.list} changeTab={changeTab} />,
    },
    {
      name: "change-address",
      component: (
        <ChangeAddress address={addressList.list} changeTab={changeTab} />
      ),
    },
  ];
  const [tabOpen, setTabOpen] = useState(0);
  useEffect(() => {
    fetchUser();
    fetchUserAddress();
    console.log(u);
    return fetchUser(), fetchUserAddress();
  }, []);
  // if (fetchUserAddress.failFetch || fetchUser.failFetch) {
  //   return <ErrorLoad />;
  // } else if (!fetchUserAddress.isFetched || !fetchUser.isFetched) {
  //   return <Loading />;
  // } else
  return (
    <div className="management-account container">
      <div className="tab-switch">
        <div className="account-name">
          <i class="fa fa-user-circle"></i>
          <span className="ms-2">
            {account.list != null ? account.list.userName : ""}
          </span>
        </div>
        <hr />
        <div className="tab-choosen row">
          <div
            className={`my-account col-6 col-md-12 ${
              tabOpen < 2 ? "active" : ""
            }`}
            onClick={() => changeTab(0)}
          >
            <i class="fa fa-user-circle "></i>
            <span className="cursor-pointer ms-2">Tài khoản</span>
          </div>
          <div
            className={`my-payment col-6 col-md-12 ${
              tabOpen == 2 ? "active" : ""
            }`}
            onClick={() => changeTab(2)}
          >
            <i class="fa fa-clipboard cursor-pointer"></i>
            <span className="cursor-pointer ms-2">Đơn hàng</span>
          </div>
          <div
            className={`my-address col-6 col-md-12 ${
              tabOpen == 3 || tabOpen == 4 ? "active" : ""
            }`}
            onClick={() => changeTab(3)}
          >
            <i class="fa fa-address-card cursor-pointer"></i>
            <span className="cursor-pointer ms-2">Địa chỉ</span>
          </div>
        </div>
      </div>
      <div className="tab-show bg-white">
        <div>{listTab[tabOpen].component}</div>
      </div>
    </div>
  );
}

export default ManagementAccount;
