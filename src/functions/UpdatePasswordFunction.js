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
    let result = false;
    await sendPasswordResetEmail(authService, email)
      .then(() => {
        result = true;
      })
      .catch((e) => {
        result = false;
      });
    return result;
  }
  return false;
};
