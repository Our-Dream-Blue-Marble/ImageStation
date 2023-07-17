import { logOut } from "functions/UserFunction";
import { useNavigate } from "react-router";
import {
  HomeRouteName,
  logInRouteName,
  OrderCategoryPageRouteName,
  OrderConfirmListRouteName,
} from "routes/RouteName";
import { ReactComponent as LogoAsset } from "assets/LogoAsset.svg";
import { ReactComponent as GlobalIconAsset } from "assets/icons/GlobalIconAsset.svg";
import "styles/HeaderStyle.scss";
import { Link } from "react-router-dom";
import OrderConfirmListPage from "./OrderConfirmListPage";

const HeaderPage = ({ isLoggedIn, isKorean, setIsKorean, userObject }) => {
  const navigate = useNavigate();
  return (
    <header>
      <Link to={`${HomeRouteName}`} replace={true}>
        <LogoAsset width={223} height={46.9} id="logoAsset" />
      </Link>
      <div id="centerButtons">
        <button
          className="centerButton"
          onClick={() => navigate(OrderCategoryPageRouteName)}>
          주문예약
        </button>
        <button className="centerButton">종이정보</button>
        <button
          className="centerButton"
          onClick={() => navigate(OrderConfirmListRouteName)}>
          주문내역확인
        </button>
      </div>
      <div id="rightButtons">
        {isLoggedIn ? (
          <button className="rightButton" onClick={() => logOut()}>
            로그아웃
          </button>
        ) : (
          <button
            className="rightButton"
            onClick={() => navigate(logInRouteName)}>
            회원가입 / 로그인
          </button>
        )}
        {isKorean ? (
          <button className="rightButton" onClick={() => setIsKorean(false)}>
            ENG
            <GlobalIconAsset width={20} height={20} id="globalIconAsset" />
          </button>
        ) : (
          <button className="rightButton" onClick={() => setIsKorean(true)}>
            KOR
            <GlobalIconAsset width={20} height={20} id="globalIconAsset" />
          </button>
        )}
      </div>
    </header>
  );
};

export default HeaderPage;
