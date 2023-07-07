import { logOut } from "functions/UserFunction";
import { useNavigate } from "react-router";
import { logInRouteName } from "routes/RouteName";
import { ReactComponent as LogoAsset } from "assets/LogoAsset.svg";
import { ReactComponent as GlobalIconAsset } from "assets/icons/GlobalIconAsset.svg";
import {} from "react-icons/";
import "styles/HeaderStyle.scss";

const HeaderPage = ({ isLoggedIn, isKorean, setIsKorean, userObject }) => {
  const navigate = useNavigate();
  return (
    <header>
      <LogoAsset width={223} height={46.9} />
      <div id="centerButtons">
        <button className="centerButton">주문예약</button>
        <button className="centerButton">종이정보</button>
        <button className="centerButton">주문내역확인</button>
      </div>
      {isLoggedIn ? (
        <>
          <button className="rightButton" onClick={() => logOut()}>
            로그아웃
          </button>
        </>
      ) : (
        <>
          <button
            className="rightButton"
            onClick={() => navigate(logInRouteName)}
          >
            회원가입 / 로그인
          </button>
        </>
      )}
      {isKorean ? (
        <button className="rightButton" onClick={() => setIsKorean(false)}>
          ENG
          {/* <GlobalIconAsset width={23} height={23} /> */}
        </button>
      ) : (
        <button className="rightButton" onClick={() => setIsKorean(true)}>
          KOR
          {/* <GlobalIconAsset width={23} height={23} id="image" /> */}
        </button>
      )}
    </header>
  );
};

export default HeaderPage;
