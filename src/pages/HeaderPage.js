import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { logOut } from "functions/UserFunction";
import {
  HomeRouteName,
  logInRouteName,
  NoticeListRouteName,
  OrderCategoryPageRouteName,
  OrderConfirmListRouteName,
  PaperInfoRouteName,
} from "routes/RouteName";
import { ReactComponent as LogoAsset } from "assets/LogoAsset.svg";
import { ReactComponent as GlobalIconAsset } from "assets/icons/GlobalIconAsset.svg";
import { ReactComponent as MyProfileIconAsset } from "assets/icons/MyProfileIconAsset.svg";
import { ReactComponent as EditIconAsset } from "assets/icons/EditIconAsset.svg";
import "styles/HeaderStyle.scss";

const HeaderPage = ({ isLoggedIn, isKorean, setIsKorean, userObject }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMyProfile, setIsMyProfile] = useState(false);

  return (
    <>
      {isMyProfile === true && (
        <div
          id="myProfile-popUp-background"
          onClick={(e) => setIsMyProfile(false)}
        >
          <div id="myProfile-popUp-container">
            <div id="myProfile-popUp-contents">
              <span id="user-name">
                {userObject.name}
                <button>
                  <EditIconAsset id="editIconAsset" />
                </button>
              </span>
              <span id="user-email">{userObject.email}</span>
              <span id="user-phoneNumber">
                {`${userObject.phoneNumber}`.substring(0, 3) +
                  "-" +
                  `${userObject.phoneNumber}`.substring(3, 7) +
                  "-" +
                  `${userObject.phoneNumber}`.substring(7)}
              </span>
              <div id="myProfile-popUp-buttons">
                <button id="left-button">이용약관</button>
                <hr />
                <button id="left-button">개인정보</button>
                <hr />
                <button id="right-button">회원탈퇴</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <header>
        <Link to={`${HomeRouteName}`} replace={true}>
          <LogoAsset width={223} height={46.9} id="logoAsset" />
        </Link>
        <div id="centerButtons">
          <div id="centerButtons_button">
            <button
              className="centerButton"
              onClick={() => navigate(OrderCategoryPageRouteName)}
            >
              주문예약
            </button>
            <button
              className="centerButton"
              onClick={() => navigate(PaperInfoRouteName)}
            >
              종이정보
            </button>
            <button
              className="centerButton"
              onClick={() => navigate(NoticeListRouteName)}
            >
              공지사항
            </button>
            <button
              className="centerButton"
              onClick={() => navigate(OrderConfirmListRouteName)}
            >
              주문내역확인
            </button>
          </div>
          <div id="centerButtons_line">
            <hr
              className="centerLine"
              style={
                location.pathname.includes("order") &&
                !location.pathname.includes("Confirm")
                  ? {}
                  : { backgroundColor: "transparent" }
              }
            />
            <hr
              className="centerLine"
              style={
                location.pathname.includes("paper")
                  ? {}
                  : { backgroundColor: "transparent" }
              }
            />
            <hr
              className="centerLine"
              style={
                location.pathname.includes("notice")
                  ? {}
                  : { backgroundColor: "transparent" }
              }
            />
            <hr
              className="centerLine"
              style={
                location.pathname.includes("orderConfirm")
                  ? {}
                  : { backgroundColor: "transparent" }
              }
            />
          </div>
        </div>
        <div id="rightButtons">
          {isLoggedIn ? (
            <button className="rightButton" onClick={() => logOut()}>
              로그아웃
            </button>
          ) : (
            <button
              className="rightButton"
              onClick={() => navigate(logInRouteName)}
            >
              회원가입 / 로그인
            </button>
          )}
          {isKorean ? (
            <button className="rightButton" onClick={() => setIsKorean(false)}>
              <GlobalIconAsset width={23} height={23} id="globalIconAsset" />
            </button>
          ) : (
            <button className="rightButton" onClick={() => setIsKorean(true)}>
              <GlobalIconAsset width={23} height={23} id="globalIconAsset" />
            </button>
          )}
          <button
            className="rightButton"
            onClick={() => setIsMyProfile((prev) => !prev)}
          >
            <MyProfileIconAsset id="myProfileIconAsset" />
          </button>
        </div>
      </header>
    </>
  );
};

export default HeaderPage;
