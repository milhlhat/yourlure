import React, { useState } from "react";
import { useGLTF } from "@react-three/drei";
import YLButton from "../../../components/custom-field/YLButton";
import { useForm } from "react-hook-form";
import m3d from "assets/3d-models/moi_thia_dw06.glb";
function Generate3DMaterial(props) {
  const [read, setRead] = useState({ isRead: false, data: null });
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data.model[0]);

    let file = data.model[0];
    let fr = new FileReader();
    fr.onload = (e) => {
      console.log(e.target.result);
      setRead({ isRead: true, data: e.target.result });
    };
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
        })}
      >
        <input type={"file"} {...register("model")} />
        <YLButton variant={"primary"} type={"submit"}>
          Read
        </YLButton>{" "}
        <YLButton variant={"negative"} type={"button"}>
          Cancel
        </YLButton>
      </form>
      {read.isRead && <ReadMaterial file3d={read.data} />}
    </div>
  );
}

function ReadMaterial(file3d) {
  const { materials } = useGLTF(file3d);
  console.log(materials);
  return <div className={"bg-box"}>run</div>;
}

export default Generate3DMaterial;
