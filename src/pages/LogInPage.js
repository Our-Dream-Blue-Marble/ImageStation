import {
  onUserEmailAndPasswordSubmit,
  onUserEmailOrPasswordChange,
} from "functions/SignInFunction";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HomeRouteName,
  SignInRouteName,
  UpdatePasswordPageRouteName,
} from "routes/RouteName";
import "styles/LogInPageStyle.scss";

const LogInPage = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    if (isNewUser) {
      navigate(SignInRouteName);
    }
  });

  return (
    <div className="login_container">
      <h1>로그인</h1>
      <div className="login_contents">
        <form
          onSubmit={async (e) => {
            await onUserEmailAndPasswordSubmit(
              e,
              userEmail,
              userPassword,
              isNewUser,
              setIsNewUser
            ).then((result) => {
              if (result) {
                navigate(HomeRouteName);
              }
            });
          }}
        >
          <input
            class="login_emailandpasswordOntextbox"
            name="userEmail"
            type="email"
            placeholder="학교 이메일"
            required
            value={userEmail}
            onChange={(e) => onUserEmailOrPasswordChange(e, setUserEmail)}
          />
          <input
            class="login_emailandpasswordOntextbox"
            name="userPassword"
            type="password"
            placeholder="비밀번호"
            required
            value={userPassword}
            onChange={(e) => onUserEmailOrPasswordChange(e, setUserPassword)}
          />
          <>
            <div className="saveIdContainer">
              <input class="saveIdCheckBox" type="checkbox" />
              <label>아이디 저장</label>
            </div>
          </>
          <input
            className="loginButton"
            type="submit"
            value={isNewUser ? "Sign In" : "로그인"}
          />
        </form>
        <div className="updateAndSigninButtonsContainer">
          <button
            class="updateAndSigninButtons"
            onClick={() => navigate(UpdatePasswordPageRouteName)}
          >
            비밀번호 찾기
          </button>
          <button
            class="updateAndSigninButtons"
            onClick={() => navigate(SignInRouteName)}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
