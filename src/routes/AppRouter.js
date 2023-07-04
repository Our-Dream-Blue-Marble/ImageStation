import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "pages/HomePage";
import SignInPage from "pages/SignInPage";
import NoticeListPage from "pages/NoticeListPage";
import Navigation from "./Navigation";
import NoticeViewPage from "pages/NoticeViewPage";
import {
  HomeRouteName,
  NoticeViewRouteName,
  NoticeListRouteName,
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
            <Route path={NoticeListRouteName} element={<NoticeListPage />} />
            <Route path={NoticeViewRouteName} element={<NoticeViewPage />} />
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
