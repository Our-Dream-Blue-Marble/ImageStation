import { useEffect, useState } from "react";
import {
  onEmailChange,
  onUpdatePasswordSubmitWithEmail,
} from "functions/UpdatePasswordFunction";
import "styles/UpdatePasswordStyle.scss";
import { useNavigate } from "react-router-dom";
import {
  HomeRouteName,
  logInRouteName,
  SignInRouteName,
} from "routes/RouteName";
import { buttonHoverStyle } from "widgets/ButtonHoverStyle";
import PopUpWithOneButtonsWidgets from "widgets/PopUpWithOneButtonWidgets";
import PopUpWithTwoButtonsWidgets from "widgets/PopUpWithTwoButtonsWidgets";

const UpdatePasswordPage = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [isPossibleSubmit, setIsPossibleSubmit] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [emailNotSaved, setEmailNotSaved] = useState(false);
  const [mailSent, setMailSent] = useState(false);

  const emailRegEx1 = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@handong.ac.kr$/i;
  const emailRegEx2 = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@handong.edu$/i;

  useEffect(() => {
    if (emailRegEx1.test(userEmail) || emailRegEx2.test(userEmail)) {
      setIsPossibleSubmit(true);
    } else {
      setIsPossibleSubmit(false);
    }
  }, [userEmail]);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <>
      {mailSent && (
        <PopUpWithOneButtonsWidgets
          headerText={"메일이 전송되었습니다!"}
          bodyText={"스팸메일함도 확인해주세요"}
          buttonText={"로그인"}
          onClickFuncButton={() => navigate(logInRouteName)}
        />
      )}
      {emailNotSaved && (
        <PopUpWithTwoButtonsWidgets
          headerText={"등록된 회원정보가 없습니다."}
          bodyText={"회원가입이 되지 않은\n메일입니다. "}
          leftButtonText={"홈"}
          rightButtonText={"회원가입"}
          lefttButtonFunction={() => {
            navigate(HomeRouteName);
          }}
          rightButtonFunction={() => {
            navigate(SignInRouteName);
          }}
        />
      )}
      <div className="updatePassword-background">
        <div className="updatePassWord-container">
          <h1>비밀번호를 잊으셨나요?</h1>
          <p>
            비밀번호 재설정 링크가 회원님의 메일로 발송됩니다!
            <br />
            스팸메일함도 확인해주세요.
          </p>
          <div className="InputDataContainer">
            <label>학교 이메일</label>
            <input
              className="InputTextBox"
              onChange={(e) => onEmailChange(e, setUserEmail)}
              name="email"
              type="email"
              placeholder="handong.ac.kr / handong.edu"
              value={userEmail}
            />
            <input
              type="submit"
              style={{
                background: buttonHoverStyle(isPossibleSubmit, isHover),
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={(e) =>
                onUpdatePasswordSubmitWithEmail(e, userEmail).then((result) => {
                  if (result) {
                    setMailSent(true);
                  } else {
                    setEmailNotSaved(true);
                  }
                })
              }
              value="비밀번호 재설정"
            />
            <div className="otherPage-routing-buttons">
              <div
                className="otherPage-routing-button"
                onClick={() => navigate(logInRouteName)}>
                로그인하고 싶으신가요? <span>로그인</span>
              </div>
              <div
                className="otherPage-routing-button"
                onClick={() => navigate(SignInRouteName)}>
                회원가입 하셨나요? <span>회원가입</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePasswordPage;
