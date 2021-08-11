import React from "react";
import { filterConfig } from "constants/filter-setting";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "store/product-action/fetch-filter";

function Sort(props) {
  const totalProduct = useSelector(
    (state) => state.productFilter.data.totalProduct
  );
  const sortBy = useSelector((state) => state.productFilter.filter.sortBy);
  const isAsc = useSelector((state) => state.productFilter.filter.isAsc);

  const dispatch = useDispatch();
  function getSortSelectedByList(list, value) {
    if (list) {
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
  async function handleSelectSort(e) {
    const value = getSortSelectedByList(
      filterConfig.SORT_OPTIONS,
      e.target.value
    );
    console.log(value);
    const action = await setFilter({ ...value });
    await dispatch(action);
  }

  return (
    <div className="bg-white bg-shadow d-flex align-items-center p-2">
      <div className="d-flex align-items-center ">
        <span className="text-nowrap ">Sắp xếp theo: </span>

        <select
          className="form-select select-sort pointer border-0 ms-2"
          onChange={(e) => handleSelectSort(e)}
        >
          {filterConfig.SORT_OPTIONS.map((item, i) => (
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
      <span className="ms-auto">{`${
        totalProduct ? totalProduct : 0
      } sản phẩm`}</span>
    </div>
  );
}

export default Sort;
