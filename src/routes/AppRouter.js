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
  NoticeUpdatePageRouteName,
} from "./RouteName";
import AdminNoticeWritePage from "pages/AdminNoticeWritePage";
import { logOut } from "functions/UserFunction";
import UpdatePasswordPage from "pages/UpdatePasswordPage";
import AdminNoticeUpdatePage from "pages/AdminNoticeUpdatePage";

const AppRouter = ({ isLoggedIn, isKorean, userObject }) => {
  const homePagePosition = useRef(null);
  const noticeListPagePosition = useRef(null);
  const navigate = useNavigate();

  return (
    <>
      <header>
        <>IMAGE STATION</>
        <>
          <button>주문예약</button>
          <button>종이정보</button>
          <button>주문내역확인</button>
        </>
        {isLoggedIn ? (
          <>
            <button onClick={() => logOut()}>로그아웃</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate(SignInRouteName)}>
              회원가입 / 로그인
            </button>
          </>
        )}
        {isKorean ? <button>ENG</button> : <button>KOR</button>}
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
