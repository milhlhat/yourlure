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
    preWardId = getValues("ward");
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
    setValue("ward", "Chọn Phường/Xã");
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

    setValue("ward", "Chọn Phường/Xã");

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
      <tr>
        <td className="text-end title-table">Tỉnh/TP(*)</td>
        <td>
          <select
            className="form-select"
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
              <option
                key={`province-${i}`}
                value={item.userProvinceID}
              >{`${item.type} ${item.userProvinceName}`}</option>
            ))}
          </select>
          {errors.province && (
            <span className="text-danger">(*) Chọn Tỉnh/TP</span>
          )}
        </td>
      </tr>

      <tr>
        <td className="text-end title-table">Quận/Huyện(*)</td>
        <td>
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
              <option
                key={`district-${i}`}
                value={item.userDistrictID}
              >{`${item.type} ${item.userDistrictName}`}</option>
            ))}
          </select>
          {errors.district && (
            <span className="text-danger">(*) Chọn Quận/Huyện</span>
          )}
        </td>
      </tr>
      <tr>
        <td className="text-end title-table">Phường/Xã(*)</td>
        <td>
          <select
            className="form-select"
            aria-label="ward select "
            {...register("ward", {
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
              <option
                key={`ward-${i}`}
                value={item.userWardID}
              >{`${item.type} ${item.userWardName}`}</option>
            ))}
          </select>
          {errors.ward && (
            <span className="text-danger">(*) Chọn Chọn Phường/Xã</span>
          )}
        </td>
      </tr>
    </>
  );
}

export default YLSelectAddress;
