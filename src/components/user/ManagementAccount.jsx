import React, { useState } from "react";
import 'assets/scss/scss-components/user/management-account.scss'

function ManagementAccount(props) {
  const account = {
    address: "string",
    gender: true,
    phone: "string",
    userEmail: "string",
    userID: 0,
    userName: "string",
  };
  const listTab = [
    { name: "tab-account", component: <AccountTab /> },
    { name: "tab-payment", component: <PaymentTab /> },
  ];
  const [tabOpen, setTapOpen] = useState(0);
  const changeTab = (value) => {
    setTapOpen(value);
  };
  return (
    <div className="management-account">
      <div className="tab-switch">
        account work
        <button onClick={() => changeTab(0)}>account</button>
        <button onClick={() => changeTab(1)}>payment</button>
      </div>
      <div className="tab-show">
        <div>{listTab[tabOpen].component}</div>
      </div>
    </div>
  );
}

function AccountTab(props) {
  return (
    <div>
      <span>account tab work</span>
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
