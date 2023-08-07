import {
  onNewUserEmailAndPasswordSubmit,
  onUserEmailOrPasswordChange,
} from "functions/SignInFunction";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeRouteName, logInRouteName } from "routes/RouteName";
import { ReactComponent as PasswordLockIconAsset } from "assets/icons/PasswordLockIconAsset.svg";
import "styles/ThemeStyles.scss";
import "styles/SignInStyle.scss";
import PopUpWithOneButtonsWidgets from "widgets/PopUpWithOneButtonWidgets";
import { buttonHoverStyle } from "widgets/ButtonHoverStyle";

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
  const [isShowPopUpContent, setIsShowPopUpContent] = useState("");
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
      (emailRegEx1.test(userEmail) || emailRegEx2.test(userEmail)) &&
      passwordRegEx.test(userPassword) &&
      userPassword === userPasswordConfirm &&
      userName !== "" &&
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
    emailRegEx1,
    emailRegEx2,
    passwordRegEx,
  ]);

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

  const handleClickSubmitButton = () => {
    if (userName === "") {
      setIsShowPopUpContent("이름을 입력해주세요.");
    } else if (!emailRegEx1.test(userEmail) && !emailRegEx2.test(userEmail)) {
      setIsShowPopUpContent(
        "이메일을 handong.ac.kr 아니면 handong.edu로 입력해주세요."
      );
    } else if (!passwordRegEx.test(userPassword)) {
      setIsShowPopUpContent(
        "비밀번호를 영문자, 숫자 포함 8자 이상으로 입력해주세요."
      );
    } else if (userPassword !== userPasswordConfirm) {
      setIsShowPopUpContent("비밀번호를 다시 확인해주세요.");
    } else if (isAgreePersonalInfo === false) {
      setIsShowPopUpContent("개인정보 처리방침에 동의해주세요.");
    } else if (isAgreeUsingInfo === false) {
      setIsShowPopUpContent("이용약관에 동의해주세요.");
    }
    console.log(isShowPopUpContent);
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <>
      {isShowPopUpContent !== "" && (
        <div
          id="signIn-popUp-background"
          onClick={(e) => setIsShowPopUpContent("")}
        >
          <PopUpWithOneButtonsWidgets
            headerText={isShowPopUpContent}
            buttonText={"돌아가기"}
            themeColor={"#5A91FF"}
            onClickFuncButton={() => setIsShowPopUpContent("")}
          />
        </div>
      )}
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
                onChange={(e) => onUserEmailOrPasswordChange(e, setUserEmail)}
              />
              <label>* handong.ac.kr 아니면 handong.edu</label>
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
                  isFocusPassword ? { background: "rgba(33, 36, 39, 1)" } : {}
                }
              />
              <label>* 영문자, 숫자 포함 8자 이상</label>
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
                  isFocusPasswordConfirm
                    ? { background: "rgba(33, 36, 39, 1)" }
                    : {}
                }
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

            <div class="CheckBoxLabel" style={{ paddingBottom: "16px" }}>
              <input
                type="checkbox"
                id="isAgreePersonalInfo"
                name="isAgreePersonalInfo"
                value={isAgreePersonalInfo}
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

            <div class="CheckBoxLabel">
              <input
                type="checkbox"
                id="isAgreeUsingInfo"
                name="isAgreeUsingInfo"
                value={isAgreeUsingInfo}
                onChange={(e) =>
                  onUserEmailOrPasswordChange(e, setIsAgreeUsingInfo)
                }
              />
              <label for="isAgreeUsingInfo" name="isAgreeUsingInfo"></label>
              이용약관에 동의합니다.
            </div>
            <input
              id="SubmitButton"
              type={isPossibleSubmit ? "submit" : "button"}
              style={{
                background: buttonHoverStyle(isPossibleSubmit, isHover),
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClickSubmitButton()}
              value={"회원가입"}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
