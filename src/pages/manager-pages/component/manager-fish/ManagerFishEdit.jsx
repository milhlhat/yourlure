import { yupResolver } from "@hookform/resolvers/yup";
import ManagerFishAPI from "api/manager-fish-api";
import YLButton from "components/custom-field/YLButton";
import YlInputFormHook from "components/custom-field/YLInputFormHook";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

ManagerFishEdit.propTypes = {};

function ManagerFishEdit(props) {
  const history = useHistory();
  const [fishName, setFishName] = useState("");
  const fishID = props.match.params.id;
  const schema = yup.object().shape({
    fishName: yup.string().required("Tên loại cá không được để trống"),
  });
  const [fish, setFish] = useState({
    data: [],
    isLoading: false,
    isSuccess: true,
  });
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = methods;

  const fetchFish = async () => {
    try {
      const response = await ManagerFishAPI.getById(fishID);
      if (response.error) {
        throw new Error(response.error);
      } else {
        setFish({
          data: response,
          success: true,
        });
        setValue("fishName",response?.fishName)
      }
    } catch (error) {
      console.log("fail to fetch fish ");
    }
  };

  useEffect(() => {
    fetchFish();
  }, [fishID]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await ManagerFishAPI.update(data, fishID);
      if (response.error) {
        throw new Error(response.error);
      } else if (!response) {
        throw new Error("loi");
      } else {
        alert("update thành công");
        history.push("/manager/fish");
      }
    } catch (error) {
      alert("update thất bại");
      console.log("fail to fetch add fish");
    }
  };

  return (
    <div>
      <h3>Tạo danh sách cá</h3>
      <div className="bg-box bg-shadow">
        <h3>
          Thông tin cá: {fishName !== "" ? fishName : fish?.data?.fishName}
        </h3>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <YlInputFormHook
            methods={methods}
            placeholder="Nhập tên cá"
            name="fishName"
            label="Tên cá(*)"
            isRequired
            onBlur={(e) => {
              e.target.value = e.target.value.trim();
              register("fishName", {
                required: "Vui lòng nhập tên cá",
              });
              setValue("fishName", e.target.value.trim());
            }}
          />
          <YLButton variant="primary" type="submit" value="Xong" />
        </form>
      </div>
    </div>
  );
}

export default ManagerFishEdit;
