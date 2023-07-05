import { logIn, signIn } from "./UserFunction";

export const onUserEmailOrPasswordChange = (event, setValue) => {
  const {
    target: { name, value },
  } = event;
  if (name === "userEmail") {
    setValue(value);
  } else if (name === "userPassword") {
    setValue(value);
  }
};

export const checkHandongEmail = (userEmail) => {
  const data = `${userEmail}`.split("@");
  if (data[1] === "handong.ac.kr" || data[1] === "handong.edu") {
    return true;
  } else {
    return false;
  }
};

export const onUserEmailAndPasswordSubmit = async (
  event,
  userEmail,
  userPassword,
  isNewUser,
  setIsNewUser
) => {
  event.preventDefault();
  if (checkHandongEmail(userEmail) && isNewUser) {
    // TO DO : 회원 가입 시 정보 받기
    return signIn(
      setIsNewUser,
      userEmail,
      userPassword,
      "email",
      "010",
      true,
      false
    );
  } else if (checkHandongEmail(userEmail) && !isNewUser) {
    return logIn(userEmail, userPassword);
  } else {
    return false;
  }
};
