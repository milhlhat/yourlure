import { AbilityContext } from "ability/can";
import UserApi from "api/user-api";
import YLButton from "components/custom-field/YLButton";
import Loading from "components/Loading";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DEFINELINK from "routes/define-link";
import { logout } from "utils/user";
function CustomerAccount(props) {
  const history = useHistory();
  const ability = useContext(AbilityContext);
  const handleLogout = () => {
    logout(ability);
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
 
  if (account.isLoading) {
    return <Loading />;
  } else
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
                <td className="d-flex justify-content-end">
                  <YLButton
                    variant="primary"
                    width="70px"
                    height="30px"
                    className="float-end"
                    to={{
                      pathname: DEFINELINK.customer + DEFINELINK.accountEdit,
                      state: { account: account },
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
