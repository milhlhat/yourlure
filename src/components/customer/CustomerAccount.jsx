import React from "react";

function UserInformation(props) {
  const { account, changeTab } = props;
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

export default UserInformation;
