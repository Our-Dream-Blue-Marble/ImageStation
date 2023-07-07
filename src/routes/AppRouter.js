import React, { useRef } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "pages/HomePage";
import SignInPage from "pages/SignInPage";
import NoticeListPage from "pages/NoticeListPage";
import NoticeViewPage from "pages/NoticeViewPage";
import {
  HomeRouteName,
  NoticeViewRouteName,
  NoticeListRouteName,
  SignInRouteName,
  NoticeWriteRouteName,
  UpdatePasswordPageRouteName,
  NoticeUpdatePageRouteName,
  logInRouteName,
} from "./RouteName";
import AdminNoticeWritePage from "pages/AdminNoticeWritePage";
import UpdatePasswordPage from "pages/UpdatePasswordPage";
import AdminNoticeUpdatePage from "pages/AdminNoticeUpdatePage";
import LogInPage from "pages/LogInPage";
import HeaderPage from "pages/HeaderPage";

const AppRouter = ({ isLoggedIn, isKorean, setIsKorean, userObject }) => {
  const homePagePosition = useRef(null);
  const noticeListPagePosition = useRef(null);

  return (
    <>
      <HeaderPage
        isLoggedIn={isLoggedIn}
        isKorean={isKorean}
        setIsKorean={setIsKorean}
        userObject={userObject}
      />
      <Routes>
        {isLoggedIn ? (
          <>
            <Route
              path={HomeRouteName}
              element={
                <div ref={homePagePosition} className="homePagePosition">
                  <HomePage elementRef={noticeListPagePosition} />
                  <div
                    ref={noticeListPagePosition}
                    className="noticeListPagePosition"
                  >
                    <NoticeListPage />
                  </div>
                </div>
              }
            />
            <Route path={NoticeListRouteName} element={<NoticeListPage />} />
            <Route path={NoticeViewRouteName} element={<NoticeViewPage />} />
            <Route
              path={NoticeWriteRouteName}
              element={<AdminNoticeWritePage />}
            />
            <Route
              path={NoticeUpdatePageRouteName}
              element={<AdminNoticeUpdatePage />}
            />
          </>
        ) : (
          <>
            <Route
              path={HomeRouteName}
              element={
                <div ref={homePagePosition} className="homePagePosition">
                  <HomePage elementRef={noticeListPagePosition} />
                  <div
                    ref={noticeListPagePosition}
                    className="noticeListPagePosition"
                  >
                    <NoticeListPage />
                  </div>
                </div>
              }
            />
            <Route path={NoticeListRouteName} element={<NoticeListPage />} />
            <Route
              path={SignInRouteName}
              replace
              to={logInRouteName}
              element={<SignInPage />}
            />
            <Route
              path={logInRouteName}
              replace
              to={HomeRouteName}
              element={<LogInPage />}
            />
            <Route path={NoticeViewRouteName} element={<NoticeViewPage />} />
            <Route
              path={UpdatePasswordPageRouteName}
              element={<UpdatePasswordPage />}
            />
          </>
        )}
      </Routes>
    </>
  );
};

export default AppRouter;
