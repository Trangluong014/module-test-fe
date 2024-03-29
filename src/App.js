import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import AuthRequire from "./contexts/AuthRequire";
import DataContextProvider from "./contexts/DataContext";
import FavoriteContextProvider from "./contexts/FavoriteContext";
import MainLayout from "./layouts/Layout";
import AccountPage from "./pages/AccountPage";
import BrowsePage from "./pages/BrowsePage";
import CompanyDetails from "./pages/CompanyDetails";

import LoginPage from "./pages/LoginPage";

function App() {
  const location = useLocation();
  const theme = createTheme({
    palette: {
      primary: {
        main: "#00b4cc",
      },
      secondary: {
        main: "#9dbfaf",
      },
    },
  });
  return (
    <div className="App">
      <>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <FavoriteContextProvider>
              <Routes location={location.state?.backgroundLocation || location}>
                <Route
                  element={
                    <DataContextProvider>
                      <MainLayout />
                    </DataContextProvider>
                  }
                >
                  <Route path="/" element={<BrowsePage />} />

                  <Route path="/login" element={<LoginPage />} />
                  <Route
                    path="/favorite"
                    element={
                      <AuthRequire>
                        <AccountPage />
                      </AuthRequire>
                    }
                  />
                  <Route
                    path="/company/:companyId"
                    element={<CompanyDetails />}
                  />
                </Route>
              </Routes>
            </FavoriteContextProvider>
          </AuthProvider>
        </ThemeProvider>
      </>
    </div>
  );
}

export default App;
