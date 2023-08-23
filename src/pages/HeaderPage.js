import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  logOut,
  onUpdateUserDataChange,
  onUpdateUserDataSubmit,
} from "functions/UserFunction";
import {
  HomeRouteName,
  logInRouteName,
  NoticeAllRouteName,
  OrderCategoryPageRouteName,
  OrderConfirmListRouteName,
  PaperInfoRouteName,
  UserLeaveRouteName,
} from "routes/RouteName";
import { ReactComponent as LogoAsset } from "assets/LogoAsset.svg";
import { ReactComponent as GlobalIconAsset } from "assets/icons/GlobalIconAsset.svg";
import { ReactComponent as MyProfileIconAsset } from "assets/icons/MyProfileIconAsset.svg";
import { ReactComponent as MyProfileEditSaveIconAsset } from "assets/icons/MyProfileEditSaveIconAsset.svg";
import { ReactComponent as EditIconAsset } from "assets/icons/EditIconAsset.svg";
import "styles/HeaderStyle.scss";

const HeaderPage = ({ isLoggedIn, isKorean, setIsKorean, userObject }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [updateIconClicked, setUpdateIconClicked] = useState(false);
  const [updateUserDataSave, setUpdateUserDataSave] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [newUserName, setNewUserName] = useState();
  const [newUserPhoneNumber, setNewUserPhoneNumber] = useState();
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    if (userObject) {
      setNewUserName(userObject.name);
      setNewUserPhoneNumber(userObject.phoneNumber);
    }
  }, [userObject]);
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  });

  return (
    <>
      {isMyProfile === true && (
        <>
          <div
            id="myProfile-popUp-background"
            onClick={(e) => {
              setIsMyProfile(false);
              setUpdateIconClicked(false);
              if (!updateUserDataSave) {
                setNewUserName(userObject.name);
                setNewUserPhoneNumber(userObject.phoneNumber);
              }
            }}
          />
          <div id="myProfile-popUp-container">
            <form
              id="myProfile-popUp-contents"
              onSubmit={(e) => {
                e.preventDefault();
                if (updateUserDataSave) {
                  onUpdateUserDataSubmit(
                    userObject.uid,
                    newUserName,
                    newUserPhoneNumber
                  ).then(() => {
                    window.location.replace(HomeRouteName);
                  });
                }
              }}
            >
              <span id="user-name">
                {updateIconClicked ? (
                  <>
                    {
                      <>
                        <input
                          className="user-name-input"
                          type="text"
                          name="userNameUpdate"
                          placeholder={userObject.name}
                          value={newUserName}
                          onChange={(e) => {
                            onUpdateUserDataChange(e, setNewUserName);
                          }}
                        />
                      </>
                    }
                  </>
                ) : (
                  <>{newUserName}</>
                )}
                <button
                  onClick={() => {
                    if (updateIconClicked) {
                      setUpdateUserDataSave(true);
                      setUpdateIconClicked(false);
                    } else {
                      setUpdateIconClicked(true);
                    }
                  }}
                >
                  {updateIconClicked ? (
                    <MyProfileEditSaveIconAsset id="editIconAsset" />
                  ) : (
                    <EditIconAsset id="editIconAsset" />
                  )}
                </button>
              </span>
              <span id="user-email">{userObject.email}</span>

              <span id="user-phoneNumber">
                {updateIconClicked ? (
                  <>
                    {
                      <input
                        className="user-phoneNumber-input"
                        type="text"
                        name="userPhoneNumberUpdate"
                        placeholder={userObject.phoneNumber}
                        value={newUserPhoneNumber}
                        onChange={(e) => {
                          onUpdateUserDataChange(e, setNewUserPhoneNumber);
                        }}
                      />
                    }
                  </>
                ) : (
                  <>
                    {userObject.phoneNumber !== "" ? (
                      <>
                        {`${newUserPhoneNumber}`.substring(0, 3) +
                          "-" +
                          `${newUserPhoneNumber}`.substring(3, 7) +
                          "-" +
                          `${newUserPhoneNumber}`.substring(7)}
                      </>
                    ) : (
                      <>번호 미입력</>
                    )}
                  </>
                )}
              </span>

              <div id="myProfile-popUp-buttons">
                <button id="left-button">이용약관</button>
                <hr />
                <button id="left-button">개인정보</button>
                <hr />
                <button
                  id="right-button"
                  onClick={(e) => navigate(UserLeaveRouteName)}
                >
                  회원탈퇴
                </button>
              </div>
            </form>
          </div>
        </>
      )}
      <header
        className={scrollPosition < 10 ? "original_header" : "change_header"}
      >
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
              onClick={() => navigate(NoticeAllRouteName)}
            >
              공지사항
            </button>
            <button
              className="centerButton"
              onClick={() => navigate(PaperInfoRouteName)}
            >
              종이정보
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
                location.pathname.includes("notice")
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
                location.pathname.includes("orderConfirm")
                  ? {}
                  : { backgroundColor: "transparent" }
              }
            />
          </div>
        </div>
        <div id="rightButtons">
          {isLoggedIn ? (
            <button
              className="rightButton"
              style={{ wordBreak: "keep-all" }}
              onClick={() => logOut()}
            >
              로그아웃
            </button>
          ) : (
            <button
              className="rightButton"
              style={{ wordBreak: "keep-all" }}
              onClick={() => navigate(logInRouteName)}
            >
              회원가입 / 로그인
            </button>
          )}
          {/* {isKorean ? (
            <button className="rightButton" onClick={() => setIsKorean(false)}>
              <GlobalIconAsset width={23} height={23} id="globalIconAsset" />
            </button>
          ) : (
            <button className="rightButton" onClick={() => setIsKorean(true)}>
              <GlobalIconAsset width={23} height={23} id="globalIconAsset" />
            </button>
          )} */}

          {isLoggedIn && (
            <button
              className="rightButton"
              onClick={() => setIsMyProfile((prev) => !prev)}
            >
              <MyProfileIconAsset id="myProfileIconAsset" />
            </button>
          )}
        </div>
      </header>
    </>
  );
};

export default HeaderPage;
