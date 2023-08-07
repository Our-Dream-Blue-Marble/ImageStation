import { useState } from "react";
import {
  onEmailChange,
  onUpdatePasswordSubmitWithEmail,
} from "functions/UpdatePasswordFunction";
import "styles/UpdatePasswordStyle.scss";
import { useNavigate } from "react-router-dom";
import { logInRouteName, SignInRouteName } from "routes/RouteName";

const UpdatePasswordPage = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  return (
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
            value="비밀번호 재설정"
            onClick={(e) => onUpdatePasswordSubmitWithEmail(e, userEmail)}
          />
          <div className="otherPage-routing-buttons">
            <div
              className="otherPage-routing-button"
              onClick={() => navigate(logInRouteName)}
            >
              로그인하고 싶으신가요? <span>로그인</span>
            </div>
            <div
              className="otherPage-routing-button"
              onClick={() => navigate(SignInRouteName)}
            >
              회원가입 하셨나요? <span>회원가입</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordPage;
