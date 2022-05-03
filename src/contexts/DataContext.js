import React, { useState, createContext, useEffect } from "react";
import companyApi from "../app/companyApi";

let companies = [];
const contextdata = {
  companies: companies,
  currentPage: "",
  totalPage: "",
  setCurrentPage: () => {},
  search: "",
  sort: "",

  setSearch: () => {},
  setSort: () => {},
};

export const DataContext = createContext(contextdata);
const MAX_PAGES = 5;

function DataContextProvider({ children }) {
  const [companies, setCompanies] = useState([]);
  const [searchDataInput, setSearchDataInput] = useState("");
  const [sortDataInput, setSortDataInput] = useState("");
  const [orderDataInput, setOrderDataInput] = useState("");

  let loading = false;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  console.log("loading", loading);

  useEffect(() => {
    const getData = async (params = {}) => {
      try {
        const fetchParams = {
          page: currentPage,
          sortBy: sortDataInput,
          city: searchDataInput,
          order: orderDataInput,
          ...params,
        };
        const response = await companyApi.getCompanies(fetchParams);
        console.log("response", response);
        console.log("company", response.data);
        setCompanies(response.data.companies);
        setTotalPage(
          response.data.total_pages > MAX_PAGES
            ? MAX_PAGES
            : response.data.total_pages
        );

        if (params.page && currentPage !== params.page) {
          setCurrentPage(params.page);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    console.log("sort", [
      sortDataInput,
      searchDataInput,
      currentPage,
      orderDataInput,
    ]);
  }, [sortDataInput, searchDataInput, currentPage, orderDataInput]);

  return (
    <DataContext.Provider
      value={{
        companies: companies,
        currentPage: currentPage,
        totalPage: totalPage,
        setCurrentPage: setCurrentPage,
        search: searchDataInput,
        sort: sortDataInput,
        order: orderDataInput,
        setOrder: setOrderDataInput,
        setSearch: setSearchDataInput,
        setSort: setSortDataInput,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContextProvider;
