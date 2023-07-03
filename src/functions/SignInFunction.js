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
    if (isNewUser) {
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
