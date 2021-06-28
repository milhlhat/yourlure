import React from "react";
import YLButton from "components/custom-field/YLButton";
import DEFINELINK from "routes/define-link";
import { Redirect, useHistory } from "react-router-dom";
function CustomerAccount(props) {
  const { account } = props;
  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("yl-accessToken");
    localStorage.removeItem("yl-loginAt");
    history.push(DEFINELINK.home);
  };
  return (
    <div className="bg-box">
      {account && (
        <table className="table-account">
          <tbody>
            <tr>
              <td className="text-end">Họ và Tên:</td>
              <td>{account.username}</td>
            </tr>
            <tr>
              <td className="text-end">Giới tính:</td>
              <td>
                {account.gender == null ? "N/A" : account.gender ? "Nam" : "Nữ"}
              </td>
            </tr>
            <tr>
              <td className="text-end">Số điện thoại:</td>
              <td>{account.phone}</td>
            </tr>
            <tr>
              <td className="text-end">Email:</td>
              <td>{account.userEmail}</td>
            </tr>
            <tr>
              <td className="d-flex justify-content-end">
                <YLButton
                  variant="primary"
                  width="70px"
                  height="30px"
                  className="float-end"
                  to={DEFINELINK.customer + DEFINELINK.accountEdit}
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
