import {
  onNewUserEmailAndPasswordSubmit,
  onUserEmailOrPasswordChange,
} from "functions/SignInFunction";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeRouteName, logInRouteName } from "routes/RouteName";
import "styles/ThemeStyles.scss";
import "styles/SignInStyle.scss";

const SignInPage = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordConfirm, setUserPasswordConfirm] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [isAgreePersonalInfo, setIsAgreePersonalInfo] = useState(false);
  const [isAgreeUsingInfo, setIsAgreeUsingInfo] = useState(false);
  const [isPossibleSubmit, setIsPossibleSubmit] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);

  useEffect(() => {
    if (!isNewUser) {
      navigate(logInRouteName);
    }
  });

  useEffect(() => {
    if (
      userEmail !== "" &&
      userPassword !== "" &&
      userPassword === userPasswordConfirm &&
      userName !== "" &&
      userPhoneNumber !== "" &&
      isAgreePersonalInfo === true &&
      isAgreeUsingInfo === true
    ) {
      setIsPossibleSubmit(true);
    } else {
      setIsPossibleSubmit(false);
    }
  }, [
    userEmail,
    userPassword,
    userPasswordConfirm,
    userName,
    userPhoneNumber,
    isAgreePersonalInfo,
    isAgreeUsingInfo,
  ]);

  return (
    <div className="SignIn">
      <div className="SignInContainer">
        <form
          method="POST"
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
          <div className="InputWithLabel">
            <input
              name="userEmail"
              type="email"
              placeholder="학교 이메일"
              required
              value={userEmail}
              onChange={(e) => onUserEmailOrPasswordChange(e, setUserEmail)}
            />
            <label>* handong.ac.kr 아니면 handong.edu</label>
          </div>
          <div className="InputWithLabel">
            <input
              name="userPassword"
              type="password"
              placeholder="비밀번호"
              required
              value={userPassword}
              onChange={(e) => onUserEmailOrPasswordChange(e, setUserPassword)}
            />
            <label>* 영문자, 숫자 포함 8자 이상</label>
          </div>
          <div className="InputWithoutLabel">
            <input
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
          <div className="InputWithoutLabel">
            <input
              name="userName"
              type="text"
              placeholder="이름"
              required
              value={userName}
              onChange={(e) => onUserEmailOrPasswordChange(e, setUserName)}
            />
          </div>
          <div className="InputWithoutLabel">
            <input
              name="userPhoneNumber"
              type="tel"
              placeholder="전화번호"
              required
              value={userPhoneNumber}
              onChange={(e) =>
                onUserEmailOrPasswordChange(e, setUserPhoneNumber)
              }
            />
            <label>* "-" 제외 11자리 입력</label>
          </div>

          <label
            class="CheckBoxLabel"
            id="PersonalInfoCheckBox"
            for="isAgreePersonalInfo"
          >
            <input
              type="checkbox"
              id="isAgreePersonalInfo"
              name="isAgreePersonalInfo"
              value={isAgreePersonalInfo}
              onClick={(e) =>
                onUserEmailOrPasswordChange(e, setIsAgreePersonalInfo)
              }
            />
            개인정보 처리방침에 동의합니다.
          </label>

          <label class="CheckBoxLabel" for="isAgreeUsingInfo">
            <input
              type="checkbox"
              id="isAgreeUsingInfo"
              name="isAgreeUsingInfo"
              value={isAgreeUsingInfo}
              onClick={(e) =>
                onUserEmailOrPasswordChange(e, setIsAgreeUsingInfo)
              }
            />
            이용약관에 동의합니다.
          </label>
          <input
            id="SubmitButton"
            type={isPossibleSubmit ? "submit" : "button"}
            style={
              isPossibleSubmit
                ? { background: `rgba(90, 145, 255, 1)` }
                : { background: `rgba(90, 145, 255, 0.50)` }
            }
            value={"가입하기"}
          />
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
