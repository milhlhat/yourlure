import React, { useEffect, useState } from "react";
import "assets/scss/scss-components/customer/management-account.scss";
import UserApi from "api/user-api";
import Loading from "components/Loading";
import ErrorLoad from "components/ErrorLoad";
import CustomerAddress from "../components/customer/CustomerAddress";
import ChangeAddress from "../components/customer/ChangeAddress";
import CutomerOrder from "../components/customer/CutomerOrder";
import ChangeInformation from "../components/customer/ChangeInformation";
import UserInformation from "../components/customer/CustomerAccount";
import AddNewAddress from "components/customer/AddNewAddress";
function ManagementAccount(props) {
  const id = 1;
  const [account, setAccount] = useState({
    data: null,
    isLoading: false,
    isSuccess: false,
  });
  const [properties, setProperties] = useState({
    addressId: null,
  });
  const changeTab = (value, pro) => {
    setTabOpen(value);
    if (pro) setProperties(pro);
  };
  const listTab = [
    {
      id: 0,
      name: "tab-account",
      component: (
        <UserInformation account={account.data} changeTab={changeTab} />
      ),
    },
    {
      id: 1,
      name: "change-info",
      component: (
        <ChangeInformation account={account.data} changeTab={changeTab} />
      ),
    },
    { id: 2, name: "tab-payment", component: <CutomerOrder /> },
    {
      id: 3,
      name: "show-address",
      component: (
        <CustomerAddress
          address={account.data && account.data.userAddressCollection}
          changeTab={changeTab}
        />
      ),
    },
    {
      id: 4,
      name: "add-new-address",
      component: <AddNewAddress changeTab={changeTab} />,
    },
    {
      id: 5,
      name: "change-address",
      component: (
        <ChangeAddress properties={properties} changeTab={changeTab} />
      ),
    },
  ];
  const [tabOpen, setTabOpen] = useState(0);
  useEffect(() => {
    const fetchCustomAccount = async () => {
      setAccount((prevState) => {
        return { ...prevState, isLoading: true };
      });
      try {
        const response = await UserApi.getMe(id);

        setAccount({ data: response, isLoading: false, isSuccess: true });
      } catch (error) {
        setAccount({ isLoading: true });
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
            <i class="fad fa-user"></i>
            <span className="ms-2">
              {account.list != null ? account.list.userName : ""}
            </span>
          </div>
          <hr />

          <div className="tab-choosen p-2 cursor-pointer">
            <div
              className={`mb-3  ${tabOpen < 2 ? "active" : ""}`}
              onClick={() => changeTab(0)}
            >
              <i class="fad fa-user me-1"></i>
              <span className=" ms-2">Tài khoản</span>
            </div>

            <div
              className={`mb-3 ${tabOpen == 2 ? "active" : ""}`}
              onClick={() => changeTab(2)}
            >
              <i class="fad fa-receipt me-2"></i>
              <span className=" ms-2">Đơn hàng</span>
            </div>

            <div
              className={`mb-3   ${tabOpen >= 3 ? "active" : ""}`}
              onClick={() => changeTab(3)}
            >
              <i class="fad fa-address-card "></i>
              <span className=" ms-2">Địa chỉ</span>
            </div>
          </div>
        </div>
        <div className="tab-show  col-9">
          <div>{listTab[tabOpen].component}</div>
        </div>
      </div>
    </div>
  );
}

export default ManagementAccount;
