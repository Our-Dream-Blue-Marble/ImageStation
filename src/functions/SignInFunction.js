import { logIn, signIn } from "./UserFunction";

export const onUserEmailOrPasswordChange = (event, setValue) => {
  let {
    target: { name, value },
  } = event;
  if (name === "userEmail") {
    setValue(value);
  } else if (name === "userPassword") {
    setValue(value);
  } else if (name === "userPasswordConfirm") {
    setValue(value);
  } else if (name === "userName") {
    setValue(value);
  } else if (name === "userPhoneNumber") {
    value = value.replace(/[^0-9]/g, "");
    setValue(value);
  } else if (name === "isAgreePersonalInfo") {
    setValue((prev) => !prev);
  } else if (name === "isAgreeUsingInfo") {
    setValue((prev) => !prev);
  } else if (name === "checkbox") {
    setValue((prev) => !prev);
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
  setIsShowPopUpContent,
  setIsNewUser,
  setIsRouteConfirm
) => {
  event.preventDefault();
  if (checkHandongEmail(userEmail)) {
    return logIn(userEmail, userPassword, setIsShowPopUpContent, setIsNewUser);
  } else {
    setIsShowPopUpContent("email");
    return false;
  }
};

export const onNewUserEmailAndPasswordSubmit = async (
  event,
  userEmail,
  userPassword,
  userPasswordConfirm,
  userName,
  userPhoneNumber,
  isNewUser,
  setIsNewUser
) => {
  event.preventDefault();
  if (
    checkHandongEmail(userEmail) &&
    isNewUser &&
    userPassword === userPasswordConfirm
  ) {
    return signIn(
      setIsNewUser,
      userEmail,
      userPassword,
      userName,
      userPhoneNumber,
      userEmail === "22000404@handong.ac.kr",
      true
    );
  } else if (checkHandongEmail(userEmail) && !isNewUser) {
    return logIn(userEmail, userPassword);
  } else {
    return false;
  }
};
