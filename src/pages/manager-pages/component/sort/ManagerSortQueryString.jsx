import React, { useState } from "react";
import YLButton from "components/custom-field/YLButton";
import { useForm } from "react-hook-form";
import queryString from "query-string";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

ManagerSortQueryString.propTypes = {
  defaultFilter: PropTypes.shape({
    isAsc: PropTypes.bool,
    keyword: PropTypes.string,
    limit: PropTypes.number,
    page: PropTypes.number,
    sortBy: PropTypes.string,
    typeSearch: PropTypes.string,
  }).isRequired,
  options: PropTypes.array.isRequired,
  rootPath: PropTypes.string,
  plugin: PropTypes.any,
};

function ManagerSortQueryString(props) {
  const { defaultFilter, options, rootPath, plugin } = props;
  const history = useHistory();
  const [filter, setFilter] = useState(defaultFilter);

  function handleSelectSort(e) {
    let sort = e.target.value;
    let temp = { ...filter };
    for (let o of options) {
      if (sort === o.display) {
        temp = { ...temp, isAsc: o.isAsc, sortBy: o.sortBy };
        break;
      }
    }
    setFilter(temp);
    const query = queryString.stringify(temp);

    history.push(`${rootPath}?${query}`);
  }

  const { register, handleSubmit } = useForm();
  const onsubmit = (data) => {
    let temp = { ...filter };
    temp = { ...temp, keyword: data.keyWord.trim() };
    setFilter(temp);
    const query = queryString.stringify(temp);
    console.log(query);
    history.push(`${rootPath}?${query}`);
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)} className={"w-100"}>
      <div className="d-flex flex-wrap ">
        <div className="col-12 col-md-8">
          <div className="row">
            <div className="col-3">
              <YLButton
                type="submit"
                value="Tìm kiếm"
                variant="primary"
                width={"100%"}
              />
            </div>
            <div className="col-9">
              <input
                className="form-control"
                type="text"
                {...register("keyWord")}
                placeholder="Tìm kiếm"
                // value={filter.keyword}
                // onChange={(e) =>
                //   setFilter({ ...filter, keyword: e.target.value })
                // }
              />
            </div>
          </div>
        </div>

        <div className="col-4 mt-2 mt-md-0 ps-3">
          <select
            className="form-select pointer"
            onChange={(e) => handleSelectSort(e)}
          >
            {options.map((item, i) => (
              <option
                key={"option-" + i}
                className="pointer"
                // selected={
                //   filter.sortBy === item.sortBy && filter.isAsc === item.isAsc
                // }
              >
                {item.display}
              </option>
            ))}
          </select>
        </div>
        {plugin && plugin({ filter, setFilter, rootPath })}
      </div>
    </form>
  );
}

export default React.memo(ManagerSortQueryString, (prevProps, nextProps) => {
  return (prevProps.defaultFilter.page = nextProps.defaultFilter.page);
});
