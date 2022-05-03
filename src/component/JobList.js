import { Grid, Pagination } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import JobCard from "./JobCard";
import useSearch from "../hooks/useSearch";

const limit = 5;

function JobList() {
  const jobs = useSearch().arr;
  console.log(jobs);
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const pageCount = Math.ceil(jobs.length / limit);

  return (
    <div>
      <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
        {jobs &&
          jobs
            .slice((page - 1) * limit, page * limit)
            .map((job) => <JobCard key={job.id} job={job} />)}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handleChange}
          color="error"
          className="pagination-list"
        />
      </Box>
    </div>
  );
}

export default JobList;
