import React from "react";
import YLButton from "components/custom-field/YLButton";
import AxiosClient from "api/axios-client";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function UserAddress(props) {
  const { changeTab } = props;
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const fetchProvince = async () => {
    try {
      const response = await AxiosClient.get("http://localhost:3000/provinces");
      if (response.error) {
        throw new Error(response.error);
      } else {
        setProvince(response);
      }
    } catch (error) {
      console.log("fail to fetch customer list");
    }
  };
  const fetchDistric = async (id) => {
    try {
      const response = await AxiosClient.get(
        `http://localhost:3000/districts?provinceId=${id}`
      );
      if (response.error) {
        throw new Error(response.error);
      } else {
        setDistrict(response);
      }
    } catch (error) {
      console.log("fail to fetch customer list");
    }
  };
  // const fetchWard = async () => {
  //   try {
  //     const response = await AxiosClient.get("http://localhost:3000/provinces");
  //     if (response.error) {
  //       throw new Error(response.error);
  //     } else {
  //       setProvince(response);
  //     }
  //   } catch (error) {
  //     console.log("fail to fetch customer list");
  //   }
  // };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  const SelectProvince = React.forwardRef(
    ({ onChange, onBlur, name, label, province }, ref) => (
      <>
        <label>{label}</label>
        <select
          name={name}
          ref={ref}
          onChange={(event) => handleChangeProvince(event)}
          onBlur={onBlur}
        >
          {console.log(province)}
          {province.map((pro, i) => (
            <option value={pro.id} key={"pro" + i}>
              {pro.name}
            </option>
          ))}
        </select>
      </>
    )
  );
  const SelectDistrict = React.forwardRef(
    ({ onChange, onBlur, name, label }, ref) => (
      <>
        <label>{label}</label>
        <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
          {district &&
            district.map((pro, i) => (
              <option value={pro.id} key={"district" + i}>
                {pro.name}
              </option>
            ))}
        </select>
      </>
    )
  );
  const Selectward = React.forwardRef(
    ({ onChange, onBlur, name, label }, ref) => (
      <>
        <label>{label}</label>
        <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
          {/* {province.map((pro,i)=>(
            
          <option value={pro.id}>
            {pro.name}
          </option>
          ))} */}
        </select>
      </>
    )
  );

  const handleChangeProvince = (e) => {
    // fetchDistric(e.target.value);
    // console.log(district);
  };
  useEffect(() => {
    fetchProvince();
  }, []);
  return (
    <div className="change-address">
      address show work
      <div className="address-show">
        <form onSubmit={handleSubmit(onSubmit)}>
          <table>
            <tr>
              <td>Tỉnh</td>
              <td>
                <SelectProvince
                  province={province}
                  {...register("provinceid")}
                />
              </td>
            </tr>
            <tr>
              <td>Huyện</td>
              <td>
                <SelectDistrict {...register("districtid")} />
              </td>
            </tr>
            {/* <tr>
              <td>Xã</td>
              <td>
                <Selectward {...register("wardid")} />
              </td>
            </tr>
            <tr>
              <td>
                <YLButton variant="primary" type="submit" value="Xong" />
              </td>
            </tr> */}
          </table>
          <br />
        </form>

        {/* {console.log(address)}
        {address.map((add, index) => (
          <table key={index}>
            <tr>
              <td></td>
              <td>{add ? add.userWardName : "xịt"}</td>
            </tr>
          </table>
        ))} */}
      </div>
      {/* <YLButton
        value="Chỉnh sửa"
        variant="primary"
        onClick={() => changeTab(4)}
      /> */}
    </div>
  );
}

export default UserAddress;
