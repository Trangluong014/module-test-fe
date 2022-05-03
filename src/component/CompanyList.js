import { Grid, Pagination } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CompanyCard from "./CompanyCard";

function CompanyList({ companies, setCurrentPage, totalPage, currentPage }) {
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  return (
    <>
      <Grid container spacing={2} mt={1}>
        {companies.map((company) => (
          <Grid item key={company.id} xs={6} md={4} lg={3}>
            <CompanyCard company={company} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 3 }}>
        <Pagination
          count={totalPage}
          page={currentPage}
          onChange={handleChange}
          color="primary"
        />
      </Box>
    </>
  );
}

export default CompanyList;
