import { authService } from "fbase";
import { userEmailAuthenticate } from "functions/UserFunction";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserEmailAuthenticationDateDocument } from "repositories/UserRepository";
import { EmailCompletedRouteName } from "routes/RouteName";
import EmailAuthAsset from "assets/EmailAuthAsset.png";
import "styles/EmailAuthenticationStyle.scss";

const EmailAuthenticationPage = ({ isEmailVerified, userObject }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isEmailVerified) {
      updateUserEmailAuthenticationDateDocument(
        authService.currentUser.uid,
        Date.now()
      ).then(() => {
        navigate(EmailCompletedRouteName);
      });
    }
  }, [isEmailVerified, navigate]);

  return (
    <div className="emailAuthentication-background">
      <div className="emailAuthentication-container">
        <div id="emailAuthentication-title">
          <span>이메일 주소</span>를 인증해 주세요.
        </div>

        <div id="emailAuthentication-img">
          <img src={EmailAuthAsset} />
        </div>
        <div id="emailAuthentication-content">
          인증 메일이 <span>{authService.currentUser.email}</span>로<br />
          발송 되었습니다.
          <br />
          이메일 인증을 완료하시면 계정 생성이 완료됩니다.
        </div>
        <div id="emailAuthentication-caption">
          이메일을 받지 못하셨나요?
          <span
            onClick={(e) => {
              userEmailAuthenticate();
            }}
          >
            다시 보내기
          </span>
        </div>
        <button
          id="emailAuthentication-button"
          onClick={(e) => {
            window.location.reload();
          }}
        >
          인증완료
        </button>
      </div>
    </div>
  );
};

export default EmailAuthenticationPage;
