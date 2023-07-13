import { checkHandongEmail } from "functions/SignInFunction";
import { sendPasswordResetEmail } from "firebase/auth";
import { authService } from "fbase";

export const onEmailChange = (event, setValue) => {
  const {
    target: { name, value },
  } = event;

  if (name === "email") {
    setValue(value);
  }
};

export const onUpdatePasswordSubmitWithEmail = async (event, email) => {
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
