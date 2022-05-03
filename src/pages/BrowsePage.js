import { Alert, Container, Grid, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import useData from "../hooks/useData";
import CompanySearch from "../component/CompanySearch";
import CompanySort from "../component/CompanySort";
import CompanyList from "../component/CompanyList";
import LoadingScreen from "./LoadingScreen";
import FormProvider from "../component/form/FormProvider";

const defaultValues = {
  sortBy: "",
  searchQuery: "",
};

function BrowsePage() {
  const methods = useForm({ defaultValues });
  const companies = useData().companies;
  const currentPage = useData().currentPage;
  const setCurrentPage = useData().setCurrentPage;
  const totalPage = useData().totalPage;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // console.log("loading", loading);

  const getcompaniesList = async () => {
    setLoading(true);

    try {
      setError("");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getcompaniesList();
  }, [currentPage]);

  return (
    <Container sx={{ height: "100%", mt: 3 }}>
      <Stack spacing={2}>
        <Stack></Stack>

        <Stack>
          <Grid container spacing={4}>
            <Grid item xs={8}>
              <CompanySearch />
            </Grid>
            <Grid item xs={4}>
              <FormProvider methods={methods}>
                <CompanySort />
              </FormProvider>
            </Grid>
          </Grid>
        </Stack>
      </Stack>

      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <CompanyList
              companies={companies}
              setCurrentPage={setCurrentPage}
              totalPage={totalPage}
              currentPage={currentPage}
            />
          )}
        </>
      )}
    </Container>
  );
}

export default BrowsePage;
