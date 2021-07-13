import React, { useState, useEffect } from "react";
import ProductAPI from "../../../api/product-api";

function FishCheckBoxFormHook(props) {
  const { methods, name, message } = props;
  const {
    register,
    formState: { errors },
  } = methods;
  const [fishList, setFishList] = useState({
    list: [],
    loading: true,
    success: false,
  });
  useEffect(() => {
    const fetchFish = async () => {
      try {
        const response = await ProductAPI.getAllFish();
        setFishList({
          list: response,
          loading: false,
          success: true,
        });
      } catch (error) {
        console.log("fail to fetch customer list");
      }
    };
    fetchFish();
  }, []);

  return (
    <>
      <hr className={"mb-1"} />
      <div className="form-check cate-fish">
        {fishList?.list?.map((fish, i) => (
          <div key={name + i}>
            <input
              className="form-check-input pointer"
              type="checkbox"
              value={fish.fishID}
              id={name + fish.fishID}
              {...register(name)}
            />
            <label
              className="form-check-label pointer text-ellipsis w-100"
              htmlFor={name + fish.fishID}
            >
              {fish.fishName}
            </label>
          </div>
        ))}
      </div>{" "}
      <hr className={"mt-1"} />
      <span className="error-message">
        {message ? message : errors[name]?.message}
      </span>
    </>
  );
}

export default FishCheckBoxFormHook;
