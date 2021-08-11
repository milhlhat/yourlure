import React, { useEffect, useState } from "react";
import ProductAPI from "../../../../api/product-api";

function FishCheckBoxFormHook(props) {
  const { methods, name, message } = props;
  const {
    register,
    watch,
    formState: { errors },
    control,
  } = methods;

  const [fishList, setFishList] = useState({
    list: [],
    loading: true,
    success: false,
  });

  const watchFishIds = watch(name);
  useEffect(async () => {
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
    await fetchFish();
  }, []);

  return (
    <>
      <hr className={"mb-1"} />
      <div className="form-check cate-fish">
        {fishList?.list?.length > 0 &&
          fishList?.list?.map((fish, index) => (
            <div key={"fish.fishID" + index}>
              <input
                className="form-check-input pointer"
                type="checkbox"
                key={index}
                value={fish.fishID}
                id={name + fish.fishID}
                {...register(`${name}[${index}]`)}
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
