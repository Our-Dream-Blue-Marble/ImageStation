import React, { useRef } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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
} from "./RouteName";
import AdminNoticeWritePage from "pages/AdminNoticeWritePage";
import LoggedOut from "functions/LogoutFunction";
import DeleteAccount from "functions/DeleteAccount";

const AppRouter = ({ isLoggedIn, userObject }) => {
  const homePagePosition = useRef(null);
  const noticeListPagePosition = useRef(null);
  const navigate = useNavigate();

  return (
    <>
      <header>
        {isLoggedIn ? (
          <div>
            <button onClick={() => LoggedOut()}>로그아웃</button>
            <>
              <button onClick={() => DeleteAccount()}>회원탈퇴</button>
            </>
          </div>
        ) : (
          <button onClick={() => navigate(SignInRouteName)}>
            회원가입 / 로그인
          </button>
        )}
      </header>
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
              to={HomeRouteName}
              element={<SignInPage />}
            />
            <Route path={NoticeViewRouteName} element={<NoticeViewPage />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default AppRouter;
