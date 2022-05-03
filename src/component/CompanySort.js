import React from "react";
import useData from "../hooks/useData";
import "../App.css";

const SORT_OPTIONS = [
  { value: "rating.desc", label: "Rating Descending" },
  { value: "rating.asc", label: "Rating Ascending" },
];
function CompanySort() {
  let {
    setSort: setSortInput,

    setOrder: setOrderInput,
  } = useData();

  return (
    <div>
      <select
        name="sortBy"
        onChange={(e) => {
          const sortOrder = e.target.value.split(".");
          setSortInput(sortOrder[0]);
          setOrderInput(sortOrder[1]);
        }}
        className="sort-input"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CompanySort;
