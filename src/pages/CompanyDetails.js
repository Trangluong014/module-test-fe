import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import useFavorite from "../hooks/useFavorite";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import companyApi from "../app/companyApi";
import LoadingScreen from "./LoadingScreen";
import "../App.css";

const CompanyDetails = () => {
  const [company, setCompany] = useState();
  const { companyId } = useParams();
  let navigate = useNavigate();
  const isLogin = useAuth();
  const idList = useFavorite().idList;
  const setIdList = useFavorite().setIdList;
  const location = useLocation();

  useEffect(() => {
    const getCompanyDetails = async () => {
      try {
        const response = await companyApi.getCompanyDetails(companyId);

        setCompany(response.data);

        console.log("response", response);
      } catch (error) {
        console.log(error);
      }
    };
    getCompanyDetails();
  }, []);

  if (!company) return <LoadingScreen />;

  return (
    <>
      <div className="company-page">
        <div className="company-details">
          <div className="company-content">
            <h1 className="title">{company.name}</h1>{" "}
            <span>
              {idList[company.id] ? (
                <button
                  className="favorite-btn"
                  onClick={() => setIdList({ ...idList, [company.id]: false })}
                >
                  {" "}
                  Remove from Favorite{" "}
                </button>
              ) : (
                <button
                  className="favorite-btn"
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
                  Add To Favorite
                </button>
              )}
            </span>
            <p className="description">{company.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyDetails;
