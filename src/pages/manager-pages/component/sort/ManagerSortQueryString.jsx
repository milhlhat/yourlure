import React, { useEffect } from "react";
import YLButton from "components/custom-field/YLButton";
import { useForm } from "react-hook-form";
import queryString from "query-string";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { filterConfig } from "constants/filter-setting";

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
ManagerSortQueryString.defaultProps = {
  defaultFilter: {
    keyword: "",
  },
};

function ManagerSortQueryString(props) {
  const { defaultFilter, options, rootPath, plugin } = props;
  const history = useHistory();

  function handleSelectSort(e) {
    let sort = e.target.value;
    let temp = defaultFilter;
    for (let o of options) {
      if (sort === o.display) {
        temp = {
          ...defaultFilter,
          isAsc: o.isAsc,
          sortBy: o.sortBy,
          sortDisplay: sort,
        };
        break;
      }
    }
    temp.page = filterConfig.PAGE_NUMBER_DEFAULT;
    const query = queryString.stringify(temp);
    history.push(`${rootPath}?${query}`);
  }

  const { register, handleSubmit, setValue } = useForm();
  const onsubmit = (data) => {
    const temp = {
      ...defaultFilter,
      keyword: data.keyword.trim(),
      page: filterConfig.PAGE_NUMBER_DEFAULT,
    };
    const query = queryString.stringify(temp);
    console.log(query);
    history.push(`${rootPath}?${query}`);
  };
  useEffect(() => {
    setValue("keyword", defaultFilter.keyword);
  }, [defaultFilter]);

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
                {...register("keyword")}
                placeholder="Tìm kiếm"
              />
            </div>
          </div>
        </div>

        <div className="col-4 mt-2 mt-md-0 ps-3">
          <select
            className="form-select pointer"
            onChange={(e) => handleSelectSort(e)}
            value={defaultFilter.sortDisplay}
          >
            {options.map((item, i) => (
              <option key={"option-" + i} className="pointer">
                {item.display}
              </option>
            ))}
          </select>
        </div>
        {plugin && plugin({ defaultFilter, rootPath })}
      </div>
    </form>
  );
}

export default ManagerSortQueryString;
