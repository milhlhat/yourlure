import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import YLButton from "components/custom-field/YLButton";

function ChangeInformation(props) {
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

export default ChangeInformation;
