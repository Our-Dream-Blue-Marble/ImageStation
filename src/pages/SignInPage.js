import {
  onNewUserEmailAndPasswordSubmit,
  onUserEmailOrPasswordChange,
} from "functions/SignInFunction";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeRouteName, logInRouteName } from "routes/RouteName";
import "styles/SignInPageStyle.scss";

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
    <div className="signin_container">
      <div className="signin_contents">
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
          <div className="withLable">
            <input
              className="signin_textbox"
              name="userEmail"
              type="email"
              placeholder="학교 이메일"
              required
              value={userEmail}
              onChange={(e) => onUserEmailOrPasswordChange(e, setUserEmail)}
            />
            <label className="label_style">
              * handong.ac.kr 혹은 handong.edu
            </label>
          </div>
          <div className="withLable">
            <input
              className="signin_textbox"
              name="userPassword"
              type="password"
              placeholder="비밀번호"
              required
              value={userPassword}
              onChange={(e) => onUserEmailOrPasswordChange(e, setUserPassword)}
            />
            <label className="label_style">* 영문자, 숫자 포함 8자 이상</label>
          </div>
          <div className="withoutLabel">
            <input
              className="signin_textbox"
              name="userPasswordConfirm"
              type="password"
              placeholder="비밀번호 재입력"
              required
              value={userPasswordConfirm}
              onChange={(e) =>
                onUserEmailOrPasswordChange(e, setUserPasswordConfirm)
              }
            />
          </div>
          <div className="withoutLabel">
            <input
              className="signin_textbox"
              name="userName"
              type="text"
              placeholder="이름"
              required
              value={userName}
              onChange={(e) => onUserEmailOrPasswordChange(e, setUserName)}
            />
          </div>
          <div className="withoutLabel">
            <input
              className="signin_textbox"
              name="userPhoneNumber"
              type="tel"
              placeholder="전화번호"
              required
              value={userPhoneNumber}
              onChange={(e) =>
                onUserEmailOrPasswordChange(e, setUserPhoneNumber)
              }
            />
            <label className="label_style">* "-"제외 11자리 입력</label>
          </div>
          <div className="confirmCheckBox">
            <div>
              <input type="checkbox" />
              <>개인정보 처리방침에 동의합니다.</>
            </div>
            <div>
              <input class="Input_confirm_checkBox" type="checkbox" />
              <>이용약관에 동의합니다.</>
            </div>
            <input
              className="singinButton"
              type="submit"
              value={
                isPossibleSubmit ? "회원 가입 (파란색)" : "회원 가입 (회색)"
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
