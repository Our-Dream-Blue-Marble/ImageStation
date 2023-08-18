import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  onUserEmailAndPasswordSubmit,
  onUserEmailOrPasswordChange,
} from "functions/SignInFunction";
import {
  HomeRouteName,
  SignInRouteName,
  UpdatePasswordPageRouteName,
} from "routes/RouteName";
import "styles/LogInStyle.scss";
import {
  deleteUserIdInLocal,
  getUserIdInLocal,
  setUserIdInLocal,
} from "functions/UserFunction";

import { buttonHoverStyle } from "widgets/ButtonHoverStyle";
import PopUpWithOneButtonsWidgets from "widgets/PopUpWithOneButtonWidgets";
import PopUpWithTwoButtonsWidgets from "widgets/PopUpWithTwoButtonsWidgets";

const LogInPage = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isSaveUserId, setIsSaveUserId] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isPossibleSubmit, setIsPossibleSubmit] = useState(false);
  const [isShowPopUpContent, setIsShowPopUpContent] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [isRouteConfirm, setIsRouteConfirm] = useState(false);

  useEffect(() => {
    getUserIdInLocal(setUserEmail);
  }, []);

  useEffect(() => {
    if (isNewUser && isRouteConfirm) {
      navigate(SignInRouteName);
    }
  }, [isNewUser, isRouteConfirm, navigate]);

  useEffect(() => {
    if ((userEmail !== "") & (userPassword !== "")) {
      setIsPossibleSubmit(true);
    } else {
      setIsPossibleSubmit(false);
    }
  }, [userEmail, userPassword]);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <>
      {/* setIsRouteConfirm(); */}
      {isShowPopUpContent === "email" && (
        <PopUpWithOneButtonsWidgets
          headerText={"이메일 형식에 맞지 않습니다!"}
          bodyText={"handong.ac.kr 또는 hadong.edu 형식으로 작성해주세요"}
          buttonText={"닫기"}
          isPrimaryColor={true}
          onClickBackgroundFunction={(e) => setIsShowPopUpContent("")}
          onClickFunction={(e) => setIsShowPopUpContent("")}
        />
      )}
      {isShowPopUpContent === "user-not-found" && (
        <PopUpWithTwoButtonsWidgets
          headerText={"회원가입이 필요합니다!"}
          bodyText={"회원가입을 진행한 다음 로그인 해주세요"}
          leftButtonText={"닫기"}
          rightButtonText={"가입하기"}
          isPrimaryColor={true}
          onClickBackgroundFunction={(e) => setIsShowPopUpContent("")}
          onClickLeftFunction={(e) => {
            setIsShowPopUpContent("");
            setIsRouteConfirm(false);
          }}
          onClickRightFunction={(e) => {
            setIsShowPopUpContent("");
            setIsRouteConfirm(true);
          }}
        />
      )}
      {isShowPopUpContent === "wrong-password" && (
        <PopUpWithOneButtonsWidgets
          headerText={"비밀번호가 맞지 않습니다!"}
          bodyText={"다시 한 번 확인해주세요"}
          buttonText={"닫기"}
          isPrimaryColor={true}
          onClickBackgroundFunction={(e) => setIsShowPopUpContent("")}
          onClickFunction={(e) => setIsShowPopUpContent("")}
        />
      )}
      <div className="PageBackground"></div>
      <div className="login-body">
        <div className="LoginContainer">
          <div className="Contents">
            <form
              onSubmit={async (e) => {
                if (isSaveUserId) {
                  setUserIdInLocal(userEmail);
                }
                // else {
                //   deleteUserIdInLocal();
                // }
                await onUserEmailAndPasswordSubmit(
                  e,
                  userEmail,
                  userPassword,
                  isNewUser,
                  setIsShowPopUpContent,
                  setIsNewUser
                ).then((result) => {
                  if (result) {
                    navigate(HomeRouteName);
                  }
                });
              }}
            >
              <input
                className="InputTextBox"
                name="userEmail"
                type="email"
                placeholder="학교 이메일"
                required
                value={userEmail}
                onChange={(e) => onUserEmailOrPasswordChange(e, setUserEmail)}
              />
              <input
                className="InputTextBox"
                name="userPassword"
                type="password"
                placeholder="비밀번호"
                required
                value={userPassword}
                onChange={(e) =>
                  onUserEmailOrPasswordChange(e, setUserPassword)
                }
              />
              <div className="saveId-checkbox">
                <input
                  id="checkbox"
                  name="checkbox"
                  type="checkbox"
                  value={isSaveUserId}
                  onChange={(e) =>
                    onUserEmailOrPasswordChange(e, setIsSaveUserId)
                  }
                />
                <label for="checkbox"></label>
                <span id="label">아이디저장</span>
              </div>
              <input
                id="submit-button"
                type="submit"
                style={{
                  background: buttonHoverStyle(isPossibleSubmit, isHover),
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                value={"로그인"}
              />
            </form>
            <div className="UpdateAndSigninButtonsContainer">
              <div
                className="UpdateAndSigninButtons"
                onClick={() => navigate(UpdatePasswordPageRouteName)}
              >
                비밀번호 잊으셨나요? <span>비밀번호 찾기</span>
              </div>
              <div
                className="UpdateAndSigninButtons"
                onClick={() => navigate(SignInRouteName)}
              >
                처음이신가요? <span>회원가입</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogInPage;
