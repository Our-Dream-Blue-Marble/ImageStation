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
    <div>
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
          name="userEmail"
          type="email"
          placeholder="Email"
          required
          value={userEmail}
          onChange={(e) => onUserEmailOrPasswordChange(e, setUserEmail)}
        />
        <input
          name="userPassword"
          type="password"
          placeholder="Password"
          required
          value={userPassword}
          onChange={(e) => onUserEmailOrPasswordChange(e, setUserPassword)}
        />
        <>
          <input type="checkbox" />
          <>아이디 저장</>
        </>
        <input type="submit" value={isNewUser ? "Sign In" : "Log In"} />
      </form>
      <>
        <button onClick={() => navigate(UpdatePasswordPageRouteName)}>
          비밀번호 찾기
        </button>
        <button onClick={() => navigate(SignInRouteName)}>회원가입</button>
      </>
    </div>
  );
};

export default LogInPage;
