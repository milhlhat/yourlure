import { events } from "@react-three/fiber";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "redux/product-action/manager/fetch-manager-filter";
import { useForm } from "react-hook-form";
import "./manager-sort.scss";
import YLButton from "components/custom-field/YLButton";
function Sort(props) {
  const { register, handleSubmit } = useForm();
  const sortBy = useSelector(
    (state) => state.managerProductFilter.filter.sortBy
  );
  const isAsc = useSelector((state) => state.managerProductFilter.filter.isAsc);
  const keyword = useSelector(
    (state) => state.managerProductFilter.filter.keyword
  );

  const SORT_OPTIONS = [
    {
      display: "Id sản phẩm",
      isAsc: false,
      sortBy: "productId",
      value: "SORT_PRODUCT_ID",
    },
    {
      display: "Tên giảm dần",
      isAsc: false,
      sortBy: "productName",
      value: "SORT_NAME_PRODUCT_ASC",
    },
    {
      display: "Tên sản phẩm tăng dần",
      isAsc: true,
      sortBy: "productName",
      value: "SORT_NME_PRODUCT_DESC",
    },
  ];
  const dispatch = useDispatch();
  function getSortSelectedByList(list, value) {
    if (list) {
      console.log(value);
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        if (item.value === value) {
          return { sortBy: item.sortBy, isAsc: item.isAsc };
        }
      }
      return {};
    } else {
      return {};
    }
  }
  function handleSelectSort(e) {
    const value = getSortSelectedByList(SORT_OPTIONS, e.target.value);
    const action = setFilter({ ...value });
    dispatch(action);
  }
  const onsubmit = (data) => {
    const value = getSortSelectedByList(SORT_OPTIONS, data.sortBy);
    const finalValue = { ...value, keyword: data.keyWord };
    const action = setFilter({ ...finalValue });
    dispatch(action);
  };
  return (
    <div className="bg-white manager-sort p-2">
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="row">
          <div className="col-4">
            <div className="row">
              <div className="col-4">
                <YLButton
                  type="submit"
                  value="tìm kiếm"
                  varian="primary"
                ></YLButton>
              </div>
              <div className="col-8">
                <select
                  {...register("sortBy")}
                  className="form-select select-sort pointer border-0 ms-2"
                  onChange={(e) => handleSelectSort(e)}
                >
                  {SORT_OPTIONS.map((item, i) => (
                    <option
                      value={item.value}
                      key={`sort-${i}`}
                      className="pointer"
                      selected={item.sortBy === sortBy && item.isAsc === isAsc}
                    >
                      {item.display}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="col-8">
            <input
              className="form-control"
              type="text"
              {...register("keyWord")}
              defaultValue={keyword}
              placeholder="Tìm kiếm"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Sort;
