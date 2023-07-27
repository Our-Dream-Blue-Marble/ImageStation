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
  OrderCategoryPageRouteName,
  OrderPageRouteName,
  OrderConfirmListRouteName,
  OrderConfirmViewRouteName,
  PaperInfoRouteName,
} from "./RouteName";
import AdminNoticeWritePage from "pages/AdminNoticeWritePage";
import UpdatePasswordPage from "pages/UpdatePasswordPage";
import AdminNoticeUpdatePage from "pages/AdminNoticeUpdatePage";
import LogInPage from "pages/LogInPage";
import HeaderPage from "pages/HeaderPage";
import OrderPage from "pages/OrderPage";
import OrderCategoryPage from "pages/OrderCategoryPage";
import OrderConfirmListPage from "pages/OrderConfirmListPage";
import OrderConfirmViewPage from "pages/OrderConfirmViewPage";
import PaperInfoPage from "pages/PaperInfoPage";

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
                    <NoticeListPage isAdmin={userObject?.role || false} />
                  </div>
                </div>
              }
            />
            <Route
              path={NoticeListRouteName}
              element={<NoticeListPage isAdmin={userObject?.role || false} />}
            />
            <Route
              path={NoticeViewRouteName}
              element={<NoticeViewPage isAdmin={userObject?.role || false} />}
            />
            <Route
              path={NoticeWriteRouteName}
              element={<AdminNoticeWritePage />}
            />
            <Route
              path={NoticeUpdatePageRouteName}
              element={<AdminNoticeUpdatePage />}
            />
            <Route
              path={OrderCategoryPageRouteName}
              element={<OrderCategoryPage />}
            />
            <Route path={OrderPageRouteName} element={<OrderPage />} />

            <Route
              path={OrderConfirmListRouteName}
              element={
                <OrderConfirmListPage
                  isAdmin={userObject?.role || false}
                  userObject={userObject}
                />
              }
            />

            <Route
              path={OrderConfirmViewRouteName}
              element={
                <OrderConfirmViewPage
                  isAdmin={userObject?.role || false}
                  userObject={userObject}
                />
              }
            />
            <Route
              path={OrderCategoryPageRouteName}
              element={<OrderCategoryPage />}
            />
            <Route path={PaperInfoRouteName} element={<PaperInfoPage />} />
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
                    <NoticeListPage isAdmin={false} />
                  </div>
                </div>
              }
            />
            <Route
              path={NoticeListRouteName}
              element={<NoticeListPage isAdmin={false} />}
            />
            <Route
              path={NoticeViewRouteName}
              element={<NoticeViewPage isAdmin={false} />}
            />
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

            <Route
              path={UpdatePasswordPageRouteName}
              element={<UpdatePasswordPage />}
            />
            <Route
              path={OrderCategoryPageRouteName}
              element={<OrderCategoryPage />}
            />

            <Route path={PaperInfoRouteName} element={<PaperInfoPage />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default AppRouter;
