import {
  onNewUserEmailAndPasswordSubmit,
  onUserEmailOrPasswordChange,
} from "functions/SignInFunction";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeRouteName, logInRouteName } from "routes/RouteName";

const SignInPage = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordConfirm, setUserPasswordConfirm] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [isPossibleSubmit, setIsPossibleSubmit] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);

  useEffect(() => {
    if (!isNewUser) {
      navigate(logInRouteName);
    }
  });

  return (
    <div>
      <form
        onSubmit={async (e) => {
          onNewUserEmailAndPasswordSubmit(
            e,
            userEmail,
            userPassword,
            userPasswordConfirm,
            userName,
            userPhoneNumber,
            isNewUser,
            setIsNewUser
          ).then((result) => {
            if (result) {
              navigate(HomeRouteName);
            }
          });
        }}
      >
        <div>
          <input
            name="userEmail"
            type="email"
            placeholder="학교 이메일"
            required
            value={userEmail}
            onChange={(e) => onUserEmailOrPasswordChange(e, setUserEmail)}
          />
          <>* handong.ac.kr ~~</>
        </div>
        <div>
          <input
            name="userPassword"
            type="password"
            placeholder="비밀번호"
            required
            value={userPassword}
            onChange={(e) => onUserEmailOrPasswordChange(e, setUserPassword)}
          />
          <>* 영문자, 숫자 ~~~</>
        </div>
        <div>
          <input
            name="userPasswordConfirm"
            type="password"
            placeholder="비밀번호 확인"
            required
            value={userPasswordConfirm}
            onChange={(e) =>
              onUserEmailOrPasswordChange(e, setUserPasswordConfirm)
            }
          />
        </div>
        <div>
          <input
            name="userName"
            type="text"
            placeholder="이름"
            required
            value={userName}
            onChange={(e) => onUserEmailOrPasswordChange(e, setUserName)}
          />
        </div>
        <div>
          <input
            name="userPhoneNumber"
            type="tel"
            placeholder="전화번호"
            required
            value={userPhoneNumber}
            onChange={(e) => onUserEmailOrPasswordChange(e, setUserPhoneNumber)}
          />
          <>* "-" ~~</>
        </div>
        <div>
          <input type="checkbox" />
          <>개인정보 처리방침에 동의합니다.</>
        </div>
        <div>
          <input type="checkbox" />
          <>이용약관에 동의합니다.</>
        </div>
        <input
          type="submit"
          value={isPossibleSubmit ? "회원 가입 (파란색)" : "회원 가입 (회색)"}
        />
      </form>
    </div>
  );
};

export default SignInPage;
