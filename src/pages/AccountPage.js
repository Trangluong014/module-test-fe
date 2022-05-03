import { Grid } from "@mui/material";
import React from "react";
import useFavorite from "../hooks/useFavorite";

import useAuth from "../hooks/useAuth";
import CompanyCard from "../component/CompanyCard";
function AccountPage() {
  const companies = Object.values(useFavorite().idList);
  console.log("companies", companies);
  const userName = useAuth().user.username;
  console.log(userName);
  return (
    <>
      <h1 className="favorite-title"> {userName}'s Favorite Company List</h1>
      <Grid container spacing={2} mt={1}>
        {companies?.filter(Boolean).map((company) => (
          <Grid item key={company.id} xs={6} md={4} lg={3}>
            <CompanyCard company={company} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default AccountPage;
