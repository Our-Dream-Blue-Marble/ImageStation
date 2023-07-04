import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "pages/HomePage";
import SignInPage from "pages/SignInPage";
import NoticListPage from "pages/NoticListPage";
import Navigation from "./Navigation";
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
            <Route path={NotiveListRouteName} element={<NoticListPage />} />
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
