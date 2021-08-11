import { yupResolver } from "@hookform/resolvers/yup";
import ManagerFishAPI from "api/manager-fish-api";
import YLButton from "components/custom-field/YLButton";
import YlInputFormHook from "components/custom-field/YLInputFormHook";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

ManagerFishAddNew.propTypes = {};

function ManagerFishAddNew(props) {
  const history = useHistory();
  const schema = yup.object().shape({
    fishName: yup.string().required("Tên loại cá không được để trống"),
  });
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = methods;
  const onSubmit = async (data) => {
    try {
      const response = await ManagerFishAPI.add(data);
      if (response.error) {
        throw new Error(response.error);
      } else {
        alert("Thêm cá thành công");
        history.push("/manager/fish");
      }
    } catch (error) {
      alert("Thêm cá thất bại");
      console.log("fail to fetch add fish");
    }
  };
  return (
    <div>
      <h3>Tạo loại cá</h3>
      {console.log("hihihi")}
      <div className="bg-box bg-shadow">
        <h3>Thông tin cá</h3>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <YlInputFormHook
            methods={methods}
            placeholder="Nhập tên cá"
            name="fishName"
            label="Tên cá(*)"
            required={true}
          />
          <div className="mt-3 d-flex justify-content-center">
            <YLButton variant="primary" type="submit" value="Xong" />
            <YLButton variant="link" to="/manager/fish" value="Hủy" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ManagerFishAddNew;
