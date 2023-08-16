import { useEffect, useRef, useState } from "react";
import {
  onNewUserEmailAndPasswordSubmit,
  onUserEmailOrPasswordChange,
} from "functions/SignInFunction";
import { useNavigate } from "react-router-dom";
import {
  EmailAuthenticationRouteName,
  HomeRouteName,
  logInRouteName,
} from "routes/RouteName";
import { ReactComponent as PasswordLockIconAsset } from "assets/icons/PasswordLockIconAsset.svg";
import { ReactComponent as ArrowRightSmallIconAsset } from "assets/icons/ArrowRightSmallIconAsset.svg";
import { buttonHoverStyle } from "widgets/ButtonHoverStyle";
import "styles/ThemeStyles.scss";
import "styles/SignInStyle.scss";
import "styles/PopUpAgreeInfoWidget.scss";
import PopUpAgreeInfoWidget from "widgets/PopUpAgreeInfoWidget";
import { userEmailAuthenticate } from "functions/UserFunction";

const SignInPage = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordConfirm, setUserPasswordConfirm] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);
  const [isFocusPassword, setIsFocusPassword] = useState(false);
  const [isFocusPasswordConfirm, setIsFocusPasswordConfirm] = useState(false);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const [userName, setUserName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [isAgreePersonalInfo, setIsAgreePersonalInfo] = useState(false);
  const [isAgreeUsingInfo, setIsAgreeUsingInfo] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [errorContent, setErrorContent] = useState([false, false, false]);
  const [isShowPersonalInfo, setIsShowPersonalInfo] = useState(false);
  const [isShowUsingInfo, setIsShowUsingInfo] = useState(false);
  const [isPossibleSubmit, setIsPossibleSubmit] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);

  const emailRegEx1 = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@handong.ac.kr$/i;
  const emailRegEx2 = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@handong.edu$/i;
  const passwordRegEx = /^[A-Za-z0-9]{8,40}$/;

  useEffect(() => {
    if (!isNewUser) {
      navigate(logInRouteName);
    }
  });

  useEffect(() => {
    if (
      userName !== "" &&
      userEmail !== "" &&
      userPassword !== "" &&
      userPassword !== "" &&
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

  useEffect(() => {
    setErrorContent([
      emailRegEx1.test(userEmail) || emailRegEx2.test(userEmail),
      passwordRegEx.test(userPassword),
      userPassword === userPasswordConfirm,
    ]);
  }, [userEmail, userPassword, userPasswordConfirm]);

  const handleShowPasswordChecked = async (ref, setValue, value) => {
    const password = await ref.current;
    if (password === null) return;

    setValue((prev) => !prev);
    if (!value) {
      password.type = "text";
    } else {
      password.type = "password";
    }
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <>
      {(isShowPersonalInfo || isShowUsingInfo) && (
        <PopUpAgreeInfoWidget
          isAgreePopUp={true}
          onClickBackgroundFuction={(e) => {
            setIsShowPersonalInfo(false);
            setIsShowUsingInfo(false);
          }}
          isShowPersonalInfo={isShowPersonalInfo}
          onClickButtonFuction={(e) => {
            setIsAgreePersonalInfo(true);
          }}
        />
      )}
      <div className="SignIn">
        <div className="SignInContainer">
          <form
            method="POST"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!errorContent.toString().includes("false")) {
                onNewUserEmailAndPasswordSubmit(
                  e,
                  userEmail,
                  userPassword,
                  userPasswordConfirm,
                  userName,
                  userPhoneNumber,
                  isNewUser,
                  setIsNewUser
                )
                  .then(async (signInAndCreateResult) => {
                    if (signInAndCreateResult) {
                      await userEmailAuthenticate().then((sendEmailResult) => {
                        if (sendEmailResult) {
                          navigate(EmailAuthenticationRouteName);
                        }
                      });
                    }
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              }
            }}
          >
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
            <div className="InputWithLabel">
              <input
                name="userEmail"
                type="email"
                placeholder="학교 이메일"
                required
                value={userEmail}
                style={
                  errorContent[0] === false && isPossibleSubmit
                    ? { borderBottom: "1px solid rgba(221, 82, 87, 1)" }
                    : {}
                }
                onChange={(e) => onUserEmailOrPasswordChange(e, setUserEmail)}
              />
              <label
                style={
                  errorContent[0] === false && isPossibleSubmit
                    ? { color: "rgba(221, 82, 87, 1)" }
                    : {}
                }
              >
                * handong.ac.kr 아니면 handong.edu
              </label>
            </div>
            <div className="InputWithLabel">
              <div className="password-input">
                <input
                  name="userPassword"
                  type="password"
                  placeholder="비밀번호"
                  required
                  value={userPassword}
                  onChange={(e) =>
                    onUserEmailOrPasswordChange(e, setUserPassword)
                  }
                  onFocus={() => setIsFocusPassword(true)}
                  onBlur={() => setIsFocusPassword(false)}
                  ref={passwordRef}
                />
                <PasswordLockIconAsset
                  className="password-asset"
                  onClick={() =>
                    handleShowPasswordChecked(
                      passwordRef,
                      setIsShowPassword,
                      isShowPassword
                    )
                  }
                />
              </div>
              <hr
                className="password-hr"
                style={
                  errorContent[1] === false && isPossibleSubmit
                    ? { background: "rgba(221, 82, 87, 1)" }
                    : isFocusPassword
                    ? { background: "rgba(33, 36, 39, 1)" }
                    : {}
                }
              />
              <label
                style={
                  errorContent[1] === false && isPossibleSubmit
                    ? { color: "rgba(221, 82, 87, 1)" }
                    : {}
                }
              >
                * 영문자, 숫자 포함 8자 이상
              </label>
            </div>
            <div className="InputWithoutLabel">
              <div className="password-input">
                <input
                  name="userPasswordConfirm"
                  type="password"
                  placeholder="비밀번호 재입력"
                  required
                  value={userPasswordConfirm}
                  onChange={(e) =>
                    onUserEmailOrPasswordChange(e, setUserPasswordConfirm)
                  }
                  onFocus={() => setIsFocusPasswordConfirm(true)}
                  onBlur={() => setIsFocusPasswordConfirm(false)}
                  ref={passwordConfirmRef}
                />
                <PasswordLockIconAsset
                  className="password-asset"
                  onClick={() =>
                    handleShowPasswordChecked(
                      passwordConfirmRef,
                      setIsShowPasswordConfirm,
                      isShowPasswordConfirm
                    )
                  }
                />
              </div>
              <hr
                className="password-hr"
                style={
                  (errorContent[1] === false || errorContent[2] === false) &&
                  isPossibleSubmit
                    ? { background: "rgba(221, 82, 87, 1)" }
                    : isFocusPasswordConfirm
                    ? { background: "rgba(33, 36, 39, 1)" }
                    : {}
                }
              />
            </div>

            <div className="InputWithoutLabel">
              <input
                name="userPhoneNumber"
                type="text"
                placeholder="전화번호"
                value={userPhoneNumber}
                onChange={(e) =>
                  onUserEmailOrPasswordChange(e, setUserPhoneNumber)
                }
              />
              <label>* 필수 아님</label>
            </div>

            <div className="checkbox-asset">
              <div className="checkbox-label" style={{ paddingBottom: "16px" }}>
                <input
                  type="checkbox"
                  id="isAgreePersonalInfo"
                  name="isAgreePersonalInfo"
                  value={isAgreePersonalInfo}
                  required
                  onChange={(e) =>
                    onUserEmailOrPasswordChange(e, setIsAgreePersonalInfo)
                  }
                />
                <label
                  for="isAgreePersonalInfo"
                  name="isAgreePersonalInfo"
                ></label>
                개인정보 처리방침에 동의합니다.
              </div>
              <ArrowRightSmallIconAsset
                className="asset"
                onClick={(e) => setIsShowPersonalInfo(true)}
              />
            </div>

            <div className="checkbox-asset">
              <div className="checkbox-label">
                <input
                  type="checkbox"
                  id="isAgreeUsingInfo"
                  name="isAgreeUsingInfo"
                  value={isAgreeUsingInfo}
                  required
                  onChange={(e) =>
                    onUserEmailOrPasswordChange(e, setIsAgreeUsingInfo)
                  }
                />
                <label for="isAgreeUsingInfo" name="isAgreeUsingInfo"></label>
                이용약관에 동의합니다.
              </div>
              <ArrowRightSmallIconAsset
                className="asset"
                onClick={(e) => setIsShowUsingInfo(true)}
              />
            </div>

            <input
              id="SubmitButton"
              type={isPossibleSubmit ? "submit" : "button"}
              style={{
                background: buttonHoverStyle(isPossibleSubmit, isHover),
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              value={"회원가입"}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
