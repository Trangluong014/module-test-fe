import React from "react";
import useData from "../hooks/useData";
import { Stack } from "@mui/material";

function CompanySearch() {
  let { search: searchInput, setSearch: setSearchInput } = useData();

  return (
    <Stack direction="row" spacing={2}>
      <input
        name="searchQuery"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="search-input"
      />
    </Stack>
  );
}

export default CompanySearch;
