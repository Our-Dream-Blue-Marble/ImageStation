import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "styles/ErrorStyles.scss";
const ErrorPage = ({ isLoggedIn }) => {
  const location = useLocation();
  const [isError, setIsError] = useState(true);
  useEffect(() => {
    if (isLoggedIn && location.pathname === "/login") {
      setIsError(false);
    }
  }, [isLoggedIn, location.pathname]);
  return (
    <>
      {isError ? (
        <div className="ErrorPageLayout">
          <div className="ErrorPageHeaderText">페이지를 찾을 수 없습니다. </div>
          <div className="ErrorPageBodyText">
            페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.
          </div>
        </div>
      ) : (
        <div className="NonErrorLayout" />
      )}
    </>
  );
};

export default ErrorPage;
