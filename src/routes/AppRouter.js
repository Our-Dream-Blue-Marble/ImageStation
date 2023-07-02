import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "pages/HomePage";
import SignInPage from "pages/SignInPage";
import NoticeListPage from "pages/NoticListPage";
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/`}
              element={<HomePage />}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/notice`}
              replace
              to={`${process.env.PUBLIC_URL}/`}
              element={<NoticeListPage />}
            />
          </>
        ) : (
          <>
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/`}
              element={<HomePage />}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/signIn`}
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
