import React from "react";

function ManagementAccount(props) {
  const account = {
    address: "string",
    gender: true,
    phone: "string",
    userEmail: "string",
    userID: 0,
    userName: "string",
  };
  return (
    <div>
        account work
      <div className="tab-manage">
            {/* {AccountTab} */}
      </div>
    </div>
  );
}


// function AccountTab(props){

//     return (
//         <div>
//             <span>account tab work</span>
//         </div>
//     );

// }
// function PaymentTab(props){

//     return (
//         <div>
//             <span>payment tab work</span>
//         </div>
//     );

// }

export default ManagementAccount;
