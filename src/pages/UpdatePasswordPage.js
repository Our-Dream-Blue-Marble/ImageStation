import { useState } from "react";
import {
  onEmailChange,
  onUpdatePasswordSubmitWithEmail,
} from "functions/UpdatePasswordFunction";
import "styles/UpdatePasswordStyle.scss";

const UpdatePasswordPage = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="UpdatePassWordContainer">
      <h1>비밀번호 재설정</h1>
      <p>비밀번호 재설정 링크가 회원님의 메일로 발송됩니다!</p>
      <form onSubmit={(event) => onUpdatePasswordSubmitWithEmail(event, email)}>
        <div className="InputDataContainer">
          <label>학교 이메일</label>
          <input
            className="InputTextBox"
            onChange={(e) => onEmailChange(e, setEmail)}
            name="email"
            type="email"
            placeholder="handong.ac.kr / handong.edu"
            value={email}
          />
          <input type="submit" value="비밀번호 재설정" />
          <ul>
            <li>
              <label className="OptionLabel">
                로그인하고 싶은가요?<button>로그인 하기</button>
              </label>
            </li>
            <li>
              <label>
                회원가입은 하셨나요?<button>회원가입 하기</button>
              </label>
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default UpdatePasswordPage;
