import React, { useState } from "react";
import YLButton from "components/custom-field/YLButton";
import DEFINELINK from "routes/define-link";
import { Redirect, useHistory } from "react-router-dom";
import { useEffect } from "react";
import UserApi from "api/user-api";
function CustomerAccount(props) {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("yl-accessToken");
    localStorage.removeItem("yl-loginAt");
    history.push(DEFINELINK.home);
  };
  const [account, setAccount] = useState({
    data: null,
    isLoading: false,
    isSuccess: false,
  });
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
  return (
    <div className="bg-box">
      {account && (
        <table className="table-account">
          <tbody>
            <tr>
              <td className="text-end">Họ và Tên:</td>
              <td>{account?.data?.username}</td>
            </tr>
            <tr>
              <td className="text-end">Giới tính:</td>
              <td>
                {account?.data?.gender == null
                  ? "N/A"
                  : account.data.gender
                  ? "Nam"
                  : "Nữ"}
              </td>
            </tr>
            <tr>
              <td className="text-end">Số điện thoại:</td>
              <td>{account?.data?.phone}</td>
            </tr>
            <tr>
              <td className="text-end">Email:</td>
              <td>{account?.data?.userEmail}</td>
            </tr>
            <tr>
              <td className="d-flex justify-content-end">
                <YLButton
                  variant="primary"
                  width="70px"
                  height="30px"
                  className="float-end"
                  to={{
                    pathname: DEFINELINK.customer + DEFINELINK.accountEdit,
                    state: {account:account},
                  }}
                >
                  Sửa
                </YLButton>
              </td>
              <td>
                <YLButton
                  variant="warning"
                  height="30px"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </YLButton>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CustomerAccount;
