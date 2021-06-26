import React, { useEffect, useState } from "react";
import YLButton from "components/custom-field/YLButton";
import "assets/scss/scss-components/customer/add-new-addres.scss";
import { useForm } from "react-hook-form";
import UserApi from "api/user-api";

function AddNewAddress(props) {
  const defaultValues = { name: "" };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: defaultValues });
  const onSubmit = (data) => {
    console.log(data);
  };

  const [allProvice, setAllProvice] = useState([]);
  const [districtByProv, setDistrictByProv] = useState([]);
  const [wardByDistrict, setWardByDistrict] = useState([]);

  const [provSelected, setProvSelected] = useState(false);
  const [districtSelected, setDistrictSelected] = useState(false);

  useEffect(() => {
    const fetchAllProvive = async () => {
      try {
        const response = await UserApi.getAllProvice();

        setAllProvice(response);
      } catch (e) {
        console.log(e.response);
      }
    };
    fetchAllProvive();
  }, []);

  const fetchDistrictByProvinceId = async (id) => {
    try {
      const response = await UserApi.getDistrictByProvinceId(id);

      setDistrictByProv(response);
    } catch (e) {
      console.error(e.response);
    }
  };
  const fetchWardByDistrictId = async (id) => {
    try {
      const response = await UserApi.getWardByDistrictId(id);

      setWardByDistrict(response);
    } catch (e) {
      console.error(e.response);
    }
  };

  function handleChangeProv(e) {
    const provId = e.target.value;
    setDistrictByProv([]);
    setValue("district", "Chọn Quận/Huyện");
    setValue("ward", "Chọn Phường/Xã");

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
    }
  }

  return (
    <div className="bg-box">
      <form onSubmit={handleSubmit(onSubmit)}>
        <table className="add-address-table">
          <tbody>
            <tr>
              <td className="text-end title-table align-top">Họ Và Tên(*)</td>
              <td>
                <input
                  className="form-control"
                  {...register("name", {
                    required: "Trường bắt buộc",
                  })}
                ></input>
                {errors.name && (
                  <span className="text-danger">(*){errors.name.message}</span>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-end title-table">Số Điện Thoại(*)</td>
              <td>
                <input
                  className="form-control"
                  {...register("phone", {
                    required: true,
                    pattern: /^([+|\d]){1}[0-9]{8,11}$/g,
                  })}
                  type="number"
                ></input>
                {errors.phone && (
                  <span className="text-danger">
                    (*)Số điện thoại 9-11 chữ số
                  </span>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-end title-table">Tỉnh/TP(*)</td>
              <td>
                <select
                  className="form-select"
                  aria-label="provice select "
                  {...register("provice", {
                    validate: (value) => {
                      const isnum = Number(value);
                      return isnum === Number(value);
                    },
                  })}
                  onChange={handleChangeProv}
                >
                  <option>Chọn Tỉnh/TP</option>
                  {allProvice?.map((item, i) => (
                    <option
                      key={`provice-${i}`}
                      value={item.userProvinceID}
                    >{`${item.type} ${item.userProvinceName}`}</option>
                  ))}
                </select>
                {errors.provice && (
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
            <tr>
              <td className="text-end title-table">Địa Chỉ(*)</td>
              <td>
                <input
                  className="form-control"
                  {...register("address", {
                    required: "Trường bắt buộc",
                  })}
                ></input>
                {errors.address && (
                  <span className="text-danger">
                    (*){errors.address.message}
                  </span>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-end title-table">Email</td>
              <td>
                <input
                  type="email"
                  className="form-control"
                  {...register("email")}
                ></input>
              </td>
            </tr>
            <tr>
              <td className="text-end title-table"></td>
              <td>
                <YLButton variant="primary" type="submit">
                  Thêm
                </YLButton>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default AddNewAddress;
