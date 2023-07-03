import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "pages/HomePage";
import SignInPage from "pages/SignInPage";
import NoticListPage from "pages/NoticListPage";
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn, userObject }) => {
  return (
    <Router>
      {<Navigation />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path={`${process.env.PUBLIC_URL}/`} element={<HomePage />} />
            <Route
              path={`${process.env.PUBLIC_URL}/notice`}
              element={<NoticListPage />}
            />
          </>
        ) : (
          <>
            <Route path={`${process.env.PUBLIC_URL}/`} element={<HomePage />} />
            <Route
              path={`${process.env.PUBLIC_URL}/signin`}
              replace
              to={`${process.env.PUBLIC_URL}/`}
              element={<SignInPage />}
            />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
