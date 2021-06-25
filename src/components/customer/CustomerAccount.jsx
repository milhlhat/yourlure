import React from "react";
import YLButton from "components/custom-field/YLButton";
function UserInformation(props) {
  const { account, changeTab } = props;
  return (
    <div className="bg-box ">
      {account && (
        <table className="table-account">
          <tr>
            <td className="text-end">Tên:</td>
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
              <YLButton variant="primary" width="70px" height="25px" className="float-end">
                Sửa
              </YLButton>
            </td>
            <td>
              <YLButton variant="warning" height="25px">
                Đăng xuất
              </YLButton>
            </td>
          </tr>
        </table>
      )}
    </div>
  );
}

export default UserInformation;
