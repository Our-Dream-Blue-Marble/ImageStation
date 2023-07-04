import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "pages/HomePage";
import SignInPage from "pages/SignInPage";
import NoticeListPage from "pages/NoticeListPage";
import Navigation from "./Navigation";
import NoticeViewPage from "pages/NoticeViewPage";
import {
  HomeRouteName,
  NotiveListRouteName,
  SignInRouteName,
} from "./RouteName";

const AppRouter = ({ isLoggedIn, userObject }) => {
  return (
    <Router>
      {<Navigation />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path={HomeRouteName} element={<HomePage />} />
            <Route path={NotiveListRouteName} element={<NoticeListPage />} />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/notice/:num`}
              replace
              to={`${process.env.PUBLIC_URL}/`}
              element={<NoticeViewPage />}
            />
          </>
        ) : (
          <>
            <Route path={HomeRouteName} element={<HomePage />} />
            <Route path={SignInRouteName} element={<SignInPage />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
