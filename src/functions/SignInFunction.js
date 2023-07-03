import { authService } from "fbase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

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
  try {
    let data;
    if (checkHandongEmail(userEmail) && isNewUser) {
      data = await createUserWithEmailAndPassword(
        authService,
        userEmail,
        userPassword
      );
    } else {
      data = await signInWithEmailAndPassword(
        authService,
        userEmail,
        userPassword
      );
    }
    console.log(data);
  } catch (e) {
    console.log(e);
    if (`${e.message}`.includes("email-already-in-use")) {
      setIsNewUser(false);
    }
  }
};
