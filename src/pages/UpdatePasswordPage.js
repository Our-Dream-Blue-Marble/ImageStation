import { useState } from "react";
import { checkHandongEmail } from "functions/SignInFunction";
import { sendPasswordResetEmail } from "firebase/auth";
import { authService } from "fbase";

const UpdatePasswordPage = () => {
  const [email, setEmail] = useState("");

  const onChange = (event) => {
    setEmail(event.target.value);
  };

  const onSubmit = async (event, email) => {
    event.preventDefault();
    if (checkHandongEmail(email)) {
      await sendPasswordResetEmail(authService, email)
        .then(() => {
          window.alert("해당 이메일로 메세지가 전송되었습니다.");
        })
        .catch((e) => {
          window.alert("메세지가 전송에 실패하였습니다.");
        });
    }
  };

  return (
    <div>
      <form onSubmit={(event) => onSubmit(event, email)}>
        <input
          onChange={onChange}
          name="userEmail "
          type="email"
          placeholder="Email"
          value={email}
        />
        <input type="submit" value="확인" />
      </form>
    </div>
  );
};

export default UpdatePasswordPage;
