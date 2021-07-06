import React from "react";

function ManagerSort(props) {
  const { filter, setFilter,options } = props;
  function handleSelectSort(e) {
    let sort = e.target.value;
    for(let o of options){
        if(sort===o.display){
            setFilter({...filter,isAsc:o.isAsc,sortBy:o.sortBy});
            break;
        }
    }
  }

  return (
    <div>
      <select
        className="form-select select-sort pointer border-0 ms-2"
        onChange={(e) => handleSelectSort(e)}
      >
        {options.map((item, i) => (
          <option key={"option-" + i} className="pointer"
          selected={filter.sortBy === item.sortBy && filter.isAsc===item.sortBy}
          >
            {item.display}
          </option>
        ))}

      </select>
    </div>
  );
}

export default ManagerSort;
