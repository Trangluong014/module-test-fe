import { Chip, Grid, Box } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Link, useLocation } from "react-router-dom";

function JobCard({ job }) {
  const location = useLocation();

  return (
    <Grid item xs={4}>
      <Card sx={{ minWidth: 200 }} elevation={3}>
        <CardContent>
          <Typography variant="h4" sx={{ fontSize: 14 }} gutterBottom noWrap>
            {job.title}
          </Typography>
          <Divider />
          <Box
            sx={{ display: "flex", justifyContent: "flex-start", mt: 1, mb: 2 }}
          >
            {job.skills.slice(0, 4).map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                className="job-skill"
                color="error"
                size="small"
              />
            ))}
          </Box>

          <Typography variant="body2" paragraph className="job-description">
            {job.description.length > 100
              ? `${job.description.slice(0, 100)}...`
              : job.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            color="warning"
            style={{ margin: "0 auto", display: "flex" }}
          >
            <Link
              to={`/jobs/${job.id}`}
              state={{ backgroundLocation: location }}
            >
              Learn More
            </Link>
          </Button>
          <Button onClick={() => {}}> Delete </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default JobCard;
