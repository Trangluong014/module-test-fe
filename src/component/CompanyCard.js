import { Chip, Grid, Box } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useAuth from "../hooks/useAuth";
import useFavorite from "../hooks/useFavorite";
import companyApi from "../app/companyApi";

function CompanyCard({ company }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = useAuth();
  const idList = useFavorite().idList;
  const setIdList = useFavorite().setIdList;
  const deleteCompany = async (id) => {
    try {
      const results = await companyApi.deleteCompanyId(id);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = () => {
    if (isLogin.isAuthenticated) {
      deleteCompany(company.id);
    } else navigate("/login");
  };

  return (
    <Grid item xs={4}>
      <Card sx={{ minWidth: 200 }} elevation={3}>
        <CardContent>
          <Typography variant="h4" sx={{ fontSize: 14 }} gutterBottom noWrap>
            {company.name}
          </Typography>
          <Divider />

          <Typography variant="body2" paragraph className="company-description">
            Company Description:{" "}
            {company.description.length > 100
              ? `${company.description.slice(0, 100)}...`
              : company.description}
          </Typography>
          <Typography variant="body2" paragraph className="num-of-jobs">
            Number of Jobs: {company.numOfJobs}
          </Typography>
          <Typography variant="body2" paragraph className="num-of-jobs">
            Average Rating: {company.averageRating}
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
              to={`/company/${company.id}`}
              state={{ backgroundLocation: location }}
            >
              Learn More
            </Link>
          </Button>

          <Button id="delete" onClick={handleClick}>
            Delete
          </Button>

          {idList[company.id] ? (
            <button
              onClick={() => setIdList({ ...idList, [company.id]: false })}
            >
              {" "}
              <FavoriteIcon />
            </button>
          ) : (
            <button
              onClick={
                isLogin.isAuthenticated
                  ? () =>
                      setIdList({
                        ...idList,
                        [company.id]: company,
                      })
                  : () => navigate("/login")
              }
              state={{ backgroundLocation: location }}
            >
              <FavoriteBorderIcon />
            </button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}

export default CompanyCard;
