import { Can } from "ability/can";
import UserApi from "api/user-api";
import YLButton from "components/custom-field/YLButton";
import React, { useEffect, useState } from "react";
import PaymentAddNewAddress from "components/payment/PaymentAddNewAddress";
import Loading from "components/Loading";
import ErrorLoad from "components/error-notify/ErrorLoad";

function CustomerAddressInput(props) {
  const formatAddress = (address) => {
    return (
      address.description +
      ", " +
      address.userWardName +
      ", " +
      address.userDistrictName +
      ", " +
      address.userProvinceName
    );
  };
  let {
    register,
    formState: { errors },
  } = props;

  const [address, setAddress] = useState({
    data: [],
    isLoading: false,
    isSuccess: true,
  });
  const fetchCustomAddress = async () => {
    setAddress((prevState) => {
      return { ...prevState, isLoading: true };
    });
    try {
      const response = await UserApi.getAddress();
      setAddress({ data: response, isLoading: false, isSuccess: true });
    } catch (error) {
      console.log(error);
      setAddress({ data: null, isLoading: false, isSuccess: false });
      console.log("fail to fetch address");
    }
  };
  useEffect(() => {
    fetchCustomAddress();
  }, []);
  if (address.isLoading) {
    return <Loading />;
  } else if (!address.isSuccess) {
    return <ErrorLoad />;
  }
  return (
    <div>
      <div>
        <div className="head-address d-flex justify-content-between align-items-end">
          <h5>
            <i className="fas fa-map-marker-check"></i> ĐỊA CHỈ GIAO HÀNG
          </h5>
          {address?.data.length > 0 && (
            <PaymentAddNewAddress
              fetchCustomAddress={fetchCustomAddress}
              noAddress={false}
            />
          )}
        </div>
      </div>
      <div className="address-list">
        {address?.data.length < 1 && (
          <div className="d-flex flex-wrap justify-content-center mt-5">
            <span className="mb-3 col-12">
              Bạn chưa có địa chỉ nào, vui lòng thêm địa chỉ mới
            </span>
            <PaymentAddNewAddress
              fetchCustomAddress={fetchCustomAddress}
              noAddress={true}
            />
          </div>
        )}
        {address?.data?.map((item, i) => (
          <div className="form-check my-3" key={"address-item-" + i}>
            <input
              className="form-check-input"
              type="radio"
              name="addressRadios"
              id={`addressRadios${i}`}
              value={formatAddress(item)}
              {...register("address")}
              defaultChecked={item.isDefault}
            />
            <label
              className="form-check-label pointer"
              htmlFor={`addressRadios${i}`}
            >
              <b>
                {item.userName}
                {", "}
                {item.phone}
                {" - "}
              </b>{" "}
              {formatAddress(item)}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerAddressInput;
