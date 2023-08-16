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
  logInRouteName,
  OrderCategoryPageRouteName,
  OrderPageRouteName,
  OrderConfirmListRouteName,
  OrderConfirmViewRouteName,
  PaperInfoRouteName,
  NoticeAllRouteName,
  UserLeaveRouteName,
  EmailAuthenticationRouteName,
  EmailCompletedRouteName,
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
import NoticeAllPage from "pages/NoticeAllPage";
import UserLeavePage from "pages/UserLeavePage";
import EmailAuthenticationPage from "pages/EmailAuthenticationPage";
import EmailCompletedPage from "pages/EmailCompletedPage";
import { useEffect } from "react";

const AppRouter = ({
  isLoggedIn,
  isEmailVerified,
  isKorean,
  setIsKorean,
  userObject,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && isEmailVerified) {
      navigate(HomeRouteName);
    } else if (isLoggedIn && !isEmailVerified) {
      navigate(EmailAuthenticationRouteName);
    }
  }, [isLoggedIn, isEmailVerified, navigate]);

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
            <Route path={HomeRouteName} element={<HomePage />} />
            <Route
              path={EmailAuthenticationRouteName}
              element={
                <EmailAuthenticationPage
                  isEmailVerified={isEmailVerified}
                  userObject={userObject}
                />
              }
            />
            <Route
              path={EmailCompletedRouteName}
              element={<EmailCompletedPage />}
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
            <Route
              path={NoticeAllRouteName}
              element={<NoticeAllPage isAdmin={userObject?.role || false} />}
            />
            <Route
              path={UserLeaveRouteName}
              element={<UserLeavePage userObject={userObject} />}
            />
          </>
        ) : (
          <>
            <Route path={HomeRouteName} element={<HomePage />} />
            <Route path={NoticeListRouteName} element={<NoticeListPage />} />
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
            <Route
              path={NoticeAllRouteName}
              element={<NoticeAllPage isAdmin={false} />}
            />
            <Route
              path={UserLeaveRouteName}
              element={<UserLeavePage userObject={userObject} />}
            />
          </>
        )}
      </Routes>
    </>
  );
};

export default AppRouter;
