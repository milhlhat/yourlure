import React, { useEffect, useState } from "react";
import "assets/scss/scss-components/user/management-account.scss";
import UserApi from "api/user-api";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import YLButton from "components/custom-field/YLButton";

function ManagementAccount(props) {
  const id = 1;
  const [account, setAccount] = useState(null);
  const [addressList, setAddressList] = useState([]);
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
  const fetchUserAddress = async () => {
    try {
      const response = await UserApi.getAddress(id);
      if (response.error) {
        throw new Error(response.error);
      } else {
        setAddressList(response);
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
    {
      name: "change-info",
      component: <ChangeInfomation account={account} changeTab={changeTab} />,
    },
    { name: "tab-payment", component: <PaymentTab /> },
    {
      name: "show-address",
      component: <ShowAddress account={account} changeTab={changeTab} />,
    },
    {
      name: "change-address",
      component: <ChangeAddress account={account} changeTab={changeTab} />,
    },
  ];
  const [tabOpen, setTabOpen] = useState(0);
  useEffect(() => {
    fetchUser();
    fetchUserAddress();
    console.log("addressList");
    console.log(addressList);
    return fetchUser(), fetchUserAddress();
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

//
//
//
//

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
          <td>Email</td>
          <td>{account ? account.userEmail : ""}</td>
        </tr>
        <tr>
          <td>
            <a className="cursor-pointer" onClick={() => changeTab(1)}>
              Sửa thông tin
            </a>
          </td>
          <td></td>
        </tr>
      </table>
    </div>
  );
}

//
//
//
//

function ChangeInfomation(props) {
  const { account, changeTab } = props;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });
  const onSubmit = (data) => {
    console.log(data);
    console.log("done");
  };

  const Select = React.forwardRef(({ onChange, onBlur, name, label }, ref) => (
    <>
      <label>{label}</label>
      <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
        <option selected={account ? !account.gender : ""} value="false">
          Nữ
        </option>
        <option selected={account ? account.gender : "true"} value="true">
          Nam
        </option>
      </select>
    </>
  ));
  return (
    <div className="change-infomation  m-lg-5 m-2 m-md-4">
      <span>Sửa thông tin</span>

      <div className="info-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <table>
            <tr>
              <td>Tên</td>
              <td>
                <input
                  defaultValue={account ? account.userName : ""}
                  placeholder="Tên"
                  {...register("userName", {
                    required: "Trường bắt buộc.",
                    // pattern: {
                    //   value: /\d+/,
                    //   message: "This input is number only.",
                    // },
                    // minLength: {
                    //   value: 10,
                    //   message: "This input must exceed 10 characters",
                    // },
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="userName"
                  render={({ messages }) => {
                    console.log("messages", messages);
                    return messages
                      ? Object.entries(messages).map(([type, message]) => (
                          <p key={type}>{message}</p>
                        ))
                      : null;
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Giới tính</td>
              <td>
                <Select {...register("gender")} />
              </td>
            </tr>
            <tr>
              <td>Số điện thoại</td>
              <td>{account ? account.phone : ""}</td>
            </tr>
            {/* <tr>
              <td>Địa chỉ</td>
              <td>{account?account.userAddressCollection[0].userProvinceName:"xịt"}</td>
            </tr>
            <tr>
              <td></td>
              <td>{account?account.userAddressCollection[0].userDistrictName:"xịt"}</td>
            </tr>
            <tr>
              <td></td>
              <td>{account?account.userAddressCollection[0].userWardName:"xịt"}</td>
            </tr>
            <tr>
              <td></td>
              <td>{account?account.userAddressCollection[0].description:"xịt"}</td>
            </tr> */}
            <tr>
              <td>Email</td>
              <td>
                <input
                  defaultValue={account ? account.userEmail : ""}
                  placeholder="Email"
                  {...register("userEmail", {
                    required: "Trường bắt buộc.",
                    pattern: {
                      value: /\d+/,
                      message: "Dạng email không đúng.",
                    },
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="userEmail"
                  render={({ messages }) => {
                    console.log("messages", messages);
                    return messages
                      ? Object.entries(messages).map(([type, message]) => (
                          <p key={type}>{message}</p>
                        ))
                      : null;
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <YLButton variant="primary" type="submit" value="Xong" />
              </td>
              <td>
                <a className="cursor-pointer" onClick={() => changeTab(0)}>
                  Hủy
                </a>
              </td>
            </tr>
          </table>
          <br />
        </form>
      </div>
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
function ShowAddress(props) {
  const { account, changeTab } = props;

  return (
    <div className="change-address">
      address show work
      <YLButton
        value="Chỉnh sửa"
        variant="primary"
        onClick={() => changeTab(4)}
      />
    </div>
  );
}
function ChangeAddress(props) {
  const { account, changeTab } = props;

  return (
    <div className="change-address">
      change address work
      <div className="address-show">
        <table>
          <tr>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
      <YLButton value="Xong" variant="primary" onClick={() => changeTab(3)} />
    </div>
  );
}

export default ManagementAccount;
