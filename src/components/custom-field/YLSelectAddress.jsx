import UserApi from "api/user-api";
import React, { useEffect, useState } from "react";
import "assets/scss/scss-components/customer/add-new-addres.scss";

function YLSelectAddress(props) {
  let {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = props;
  //state
  const [allprovince, setAllprovince] = useState([]);
  const [districtByProv, setDistrictByProv] = useState([]);
  const [wardByDistrict, setWardByDistrict] = useState([]);

  const [provSelected, setProvSelected] = useState(false);
  const [districtSelected, setDistrictSelected] = useState(false);

  const [provDefault, setProvDefault] = useState("Chọn Tỉnh/TP");
  const [disDefault, setDisDefault] = useState("Chọn Quận/Huyện");
  const [wardDefault, setWdDefault] = useState("Chọn Phường/Xã");

  //react-hook-form
  let preProvId = null;
  let preDisId = null;
  let preWardId = null;

  //edit initial value

  let address = props.address;
  const initialData = () => {
    setProvDefault(address?.userProvinceId);
    setDisDefault(address?.userDistrictId);
    setWdDefault(address?.userWardId);
    fetchDistrictByProvinceId(address?.userProvinceId);
    setProvSelected(true);
    setDistrictSelected(false);
    fetchWardByDistrictId(address?.userDistrictId);
    setDistrictSelected(true);
    setValue("province", address?.userProvinceId);
    setValue("district", address?.userDistrictId);
    setValue("userWardId", address?.userWardId);
  };
  useEffect(() => {
    if (address) initialData();
  }, [address]);

  useEffect(() => {
    const fetchAllProvive = async () => {
      try {
        const response = await UserApi.getAllProvince();
        setAllprovince(response);
      } catch (e) {
        console.error(e.response);
      }
    };
    fetchAllProvive();
    preProvId = getValues("province");
    preDisId = getValues("district");
    preWardId = getValues("userWardId");
  }, []);

  useEffect(() => {
    if (preProvId && preDisId && preWardId) {
      fetchDistrictByProvinceId(preProvId);
      fetchWardByDistrictId(preDisId);
      setProvSelected(true);
      setDistrictSelected(true);

      setProvDefault(preProvId);
      setDisDefault(preDisId);
      setWdDefault(preWardId);
    }
  }, [preProvId, preDisId, preWardId]);

  const fetchDistrictByProvinceId = async (id) => {
    if (Number.isInteger(parseInt(id))) {
      try {
        const response = await UserApi.getDistrictByProvinceId(id);

        setDistrictByProv(response);
      } catch (e) {
        console.error(e.response);
      }
    }
  };
  const fetchWardByDistrictId = async (id) => {
    if (Number.isInteger(parseInt(id))) {
      try {
        const response = await UserApi.getWardByDistrictId(id);
        setWardByDistrict(response);
        setDisDefault(id);
      } catch (e) {
        console.error(e.response);
      }
    }
  };

  function handleChangeProv(e) {
    const provId = e.target.value;
    setDistrictByProv([]);
    setWardByDistrict([]);

    setValue("district", "Chọn Quận/Huyện");
    setValue("userWardId", "Chọn Phường/Xã");
    setProvDefault(provId);
    if (Number.isInteger(parseInt(provId))) {
      fetchDistrictByProvinceId(provId);

      setProvSelected(true);
      setDistrictSelected(false);
    } else {
      setProvSelected(false);
    }
  }
  function handleChangeDistrict(e) {
    const disId = e.target.value;

    setWardByDistrict([]);

    setValue("userWardId", "Chọn Phường/Xã");

    if (Number.isInteger(parseInt(disId))) {
      fetchWardByDistrictId(disId);
      setDistrictSelected(true);
    } else {
      setDistrictSelected(false);
      setDisDefault(disId);
    }
  }

  function handleChangeWard(e) {
    setWdDefault(e.target.value);
  }
  return (
    <>
      {/* <tr>
        <td className="text-end title-table">Tỉnh/TP(*)</td> */}
      <div>
        <select
          className="form-select mt-3"
          aria-label="province select "
          {...register("province", {
            validate: (value) => {
              const isnum = Number(value);
              return isnum === Number(value);
            },
          })}
          onChange={handleChangeProv}
          value={provDefault}
        >
          <option>Chọn Tỉnh/TP</option>
          {allprovince?.map((item, i) => (
            <option key={`province-${i}`} value={item.userProvinceID}>
              {item.userProvinceName}
            </option>
          ))}
        </select>
        {errors.province && (
          <span className="text-danger">(*) Vui lòng chọn Tỉnh/TP</span>
        )}
      </div>
      {/* </tr> */}

      {/* <tr>
        <td className="text-end title-table">Quận/Huyện(*)</td> */}
      <div className="my-3">
        <select
          className="form-select"
          aria-label="district select "
          {...register("district", {
            validate: (value) => {
              const isnum = Number(value);
              return isnum === Number(value);
            },
          })}
          onChange={handleChangeDistrict}
          value={disDefault}
          disabled={!provSelected}
        >
          <option>Chọn Quận/Huyện</option>
          {districtByProv?.map((item, i) => (
            <option key={`district-${i}`} value={item.userDistrictID}>
              {item.userDistrictName}
            </option>
          ))}
        </select>
        {errors.district && (
          <span className="text-danger">(*) Vui lòng chọn Quận/Huyện</span>
        )}
      </div>
      {/* </tr> */}
      {/* <tr>
        <td className="text-end title-table">Phường/Xã(*)</td> */}
      <div>
        <select
          className="form-select"
          aria-label="ward select "
          {...register("userWardId", {
            validate: (value) => {
              const isnum = Number(value);
              return isnum === Number(value);
            },
          })}
          onChange={handleChangeWard}
          value={wardDefault}
          disabled={!districtSelected || !provSelected}
        >
          <option>Chọn Phường/Xã</option>
          {wardByDistrict?.map((item, i) => (
            <option key={`ward-${i}`} value={item.userWardID}>
              {item.userWardName}
            </option>
          ))}
        </select>
        {errors.userWardId && (
          <span className="text-danger">(*) Vui lòng chọn Phường/Xã</span>
        )}
      </div>
      {/* </tr> */}
    </>
  );
}

export default YLSelectAddress;
