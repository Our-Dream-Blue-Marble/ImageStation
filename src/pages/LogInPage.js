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

const LogInPage = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isSaveUserId, setIsSaveUserId] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isPossibleSubmit, setIsPossibleSubmit] = useState(false);
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
    <div className="login-body">
      <div className="LoginContainer">
        <div className="Contents">
          <form
            onSubmit={async (e) => {
              if (isSaveUserId) {
                setUserIdInLocal(userEmail);
              } else {
                deleteUserIdInLocal();
              }
              await onUserEmailAndPasswordSubmit(
                e,
                userEmail,
                userPassword,
                isNewUser,
                setIsNewUser,
                setIsRouteConfirm
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
              onChange={(e) => onUserEmailOrPasswordChange(e, setUserPassword)}
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
              style={
                isPossibleSubmit
                  ? isHover
                    ? { background: `rgba(77, 125, 220, 1)` }
                    : { background: `rgba(90, 145, 255, 1)` }
                  : isHover
                  ? { background: `rgba(77, 125, 220, 1)` }
                  : { background: `rgba(90, 145, 255, 0.50)` }
              }
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
  );
};

export default LogInPage;
