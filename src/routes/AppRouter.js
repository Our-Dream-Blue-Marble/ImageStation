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
  UpdatePasswordPageRouteName,
} from "./RouteName";
import AdminNoticeWritePage from "pages/AdminNoticeWritePage";
import { deleteAccount, logOut, updatePassword } from "functions/UserFunction";
import UpdatePasswordPage from "pages/UpdatePasswordPage";

const AppRouter = ({ isLoggedIn, userObject }) => {
  const homePagePosition = useRef(null);
  const noticeListPagePosition = useRef(null);
  const navigate = useNavigate();

  return (
    <>
      <header>
        {isLoggedIn ? (
          <div>
            <button onClick={() => logOut()}>로그아웃</button>
            <>
              <button onClick={() => deleteAccount()}>회원탈퇴</button>
              <button onClick={() => updatePassword()}>비밀번호 변경</button>
            </>
          </div>
        ) : (
          <div>
            <button onClick={() => navigate(SignInRouteName)}>
              회원가입 / 로그인
            </button>
            <button onClick={() => navigate(UpdatePasswordPageRouteName)}>
              비밀번호 찾기
            </button>
          </div>
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
