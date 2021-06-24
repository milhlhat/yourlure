import React from "react";
import YLButton from "components/custom-field/YLButton";

function ChangeAddress(props) {
  const { address, changeTab } = props;
  return (
    <div className="change-address">
      change address work
      <div className="address-show">
        {address.map((add, index) => (
          <table key={index}>
            <tr>
              <td></td>
              <td>{add ? add.userWardName : "xịt"}</td>
            </tr>
          </table>
        ))}
      </div>
      <YLButton value="Xong" variant="primary" onClick={() => changeTab(3)} />
    </div>
  );
}

export default ChangeAddress;
