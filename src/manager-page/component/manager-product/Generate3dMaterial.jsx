import React, { useState } from "react";
import YLButton from "../../../components/custom-field/YLButton";
import { useForm } from "react-hook-form";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

function Generate3DMaterial(props) {
  const [read, setRead] = useState({ isRead: false, data: null });
  const { register, handleSubmit } = useForm();

  function readFile(data) {
    let file = data.model[0];

    let url = URL.createObjectURL(file);
    let loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/examples/js/libs/draco/");
    loader.setDRACOLoader(dracoLoader);
    loader.load(url, function (gltf) {
      const materials = [];
      const scene = gltf.scene;

      scene.traverse(function (object) {
        if (object.material) materials.push(object.material.name);
      });
      setRead(materials);
    });
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          readFile(data);
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
      <div className={"bg-box"}>
        {read?.length > 0 &&
          read.map((item, index) => <p key={index}>{item}</p>)}
      </div>
    </div>
  );
}

export default Generate3DMaterial;
