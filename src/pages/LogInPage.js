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

const LogInPage = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isPossibleSubmit, setIsPossibleSubmit] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isRouteConfirm, setIsRouteConfirm] = useState(false);

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

  return (
    <div className="login-body">
      <div className="LoginContainer">
        <div className="Contents">
          <span>로그인</span>
          <form
            onSubmit={async (e) => {
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
            <div className="SaveIdContainer">
              <input type="checkbox" />
              <label>아이디 저장</label>
            </div>
            <input
              className="SubmitButton"
              type="submit"
              style={
                isPossibleSubmit
                  ? { background: `rgba(90, 145, 255, 1)` }
                  : { background: `rgba(90, 145, 255, 0.50)` }
              }
              value={"로그인"}
            />
          </form>
          <div className="UpdateAndSigninButtonsContainer">
            <button
              className="UpdateAndSigninButtons"
              onClick={() => navigate(UpdatePasswordPageRouteName)}
            >
              비밀번호 찾기
            </button>
            <button
              className="UpdateAndSigninButtons"
              onClick={() => navigate(SignInRouteName)}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
