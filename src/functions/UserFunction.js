import { authService } from "fbase";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  createNewUserDocument,
  deleteUserDocument,
  readUserDocument,
  updateUserLogInDateDocument,
} from "repositories/UserRepository";
import CryptoJS from "crypto-js";

export const signIn = async (
  setIsNewUser,
  userEmail,
  userPassword,
  name,
  phoneNumber,
  role,
  isReceiveMail
) => {
  var result = false;
  await createUserWithEmailAndPassword(authService, userEmail, userPassword)
    .then(async () => {
      await createNewUserDocument(
        authService.currentUser.uid,
        userEmail,
        name,
        phoneNumber,
        role,
        isReceiveMail,
        Date.now(),
        Date.now()
      )
        .then(() => {
          result = true;
        })
        .catch((e) => {
          console.log(e);
        });
    })
    .catch((e) => {
      if (`${e.message}`.includes("email-already-in-use")) {
        setIsNewUser(false);
      }
    });
  return result;
};

export const logIn = async (
  userEmail,
  userPassword,
  setIsNewUser,
  setIsRouteConfirm
) => {
  var result = false;
  await signInWithEmailAndPassword(authService, userEmail, userPassword)
    .then(async () => {
      await updateUserLogInDateDocument(authService.currentUser.uid, Date.now())
        .then(() => {
          result = true;
        })
        .catch((e) => {
          console.log(e);
        });
    })
    .catch((e) => {
      console.log(e);
      if (`${e.message}`.includes("user-not-found")) {
        setIsNewUser(true);
        setIsRouteConfirm(
          window.confirm("회원가입 화면으로 이동하시겠습니까?")
        );
      } else if (`${e.message}`.includes("wrong-password")) {
        setIsRouteConfirm(window.confirm("비밀번호를 다시 확인해주십시오"));
      }
    });
  return result;
};

export const logOut = () => {
  authService.signOut();
};

export const setUserIdInLocal = (userEmail) => {
  window.localStorage.setItem("USER_ID_VALUE", userEmail);
};

export const getUserIdInLocal = (setUserEmail) => {
  const data = window.localStorage.getItem("USER_ID_VALUE");
  if (data !== null) setUserEmail(data);
};

export const deleteUserIdInLocal = () => {
  window.localStorage.clear();
};

export const setUserModel = async (setUserObject) => {
  await readUserDocument(authService.currentUser.uid).then((result) => {
    setUserObject(result);
  });
};

export const deleteAccount = async () => {
  const IsConfirmDeleteAcocunt =
    window.confirm("해당 계정을 삭제하시겠습니까?");

  if (!IsConfirmDeleteAcocunt) return;
  else {
    await deleteUserDocument(authService.currentUser.uid)
      .then(async () => {
        await deleteUser(authService.currentUser)
          .then(() => {
            logOut();
            window.confirm("삭제를 완료하였습니다.");
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }
};

export const updatePassword = async () => {
  const user = authService.currentUser;
  await sendPasswordResetEmail(authService, user.email)
    .then(() => {
      window.alert("해당 이메일로 메세지가 전송되었습니다.");
    })
    .catch((e) => {
      window.alert("메세지 전송이 실패되었습니다.");
    });
};

export const getEncryptedData = (uid, userData) => {
  const privateKey = uid;
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(userData),
    privateKey
  ).toString();
  return encryptedData;
};

export const getDecryptedData = (uid, userData) => {
  const privateKey = uid;
  const bytes = CryptoJS.AES.decrypt(userData, privateKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};
