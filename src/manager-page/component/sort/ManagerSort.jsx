import React, { useEffect } from "react";
import YLButton from "components/custom-field/YLButton";
import { useForm } from "react-hook-form";

function ManagerSort(props) {
  const { filter, setFilter, options } = props;
  function handleSelectSort(e) {
    let sort = e.target.value;
    for (let o of options) {
      if (sort === o.display) {
        setFilter({ ...filter, isAsc: o.isAsc, sortBy: o.sortBy });
        break;
      }
    }
  }

  const { register, handleSubmit, setValue } = useForm();
  const onsubmit = (data) => {
    setFilter({ ...filter, keyword: data.keyWord });
  };
  useEffect(() => {
    setValue("keyWord", filter.keyword);
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="row">
          <div className="col-12 col-md-8">
            <div className="row">
              <div className="col-3">
                <YLButton
                  type="submit"
                  value="Tìm kiếm"
                  variant="primary"
                ></YLButton>
              </div>
              <div className="col-9">
                <input
                  className="form-control"
                  type="text"
                  {...register("keyWord")}
                  placeholder="Tìm kiếm"
                />
              </div>
            </div>
          </div>

          <div className="col-4 mt-2 mt-md-0">
            <select
              className="form-select select-sort pointer"
              onChange={(e) => handleSelectSort(e)}
            >
              {options.map((item, i) => (
                <option
                  key={"option-" + i}
                  className="pointer"
                  selected={
                    filter.sortBy === item.sortBy && filter.isAsc === item.isAsc
                  }
                >
                  {item.display}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ManagerSort;
