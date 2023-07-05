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

export const logIn = async (userEmail, userPassword) => {
  var result = false;
  await signInWithEmailAndPassword(authService, userEmail, userPassword).then(
    async () => {
      await updateUserLogInDateDocument(authService.currentUser.uid, Date.now())
        .then(() => {
          result = true;
        })
        .catch((e) => {
          console.log(e);
        });
    }
  );
  return result;
};

export const logOut = () => {
  authService.signOut();
};

export const setUserModel = async () => {
  return await readUserDocument(authService.currentUser.uid);
};

export const deleteAccount = async () => {
  const IsConfirmDeleteAcocunt =
    window.confirm("해당 계정을 삭제하시겠습니까?");

  if (!IsConfirmDeleteAcocunt) return;
  else {
    await deleteUserDocument(authService.currentUser.uid)
      .then(async () => {
        await deleteUser(authService.currentUser)
          .then(() => {})
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
    window.confirm("삭제를 완료하였습니다.");
  }
};

export const updatePassword = async () => {
  const user = authService.currentUser;
  await sendPasswordResetEmail(authService, user, user.email)
    .then(() => {
      window.alert("해당 이메일로 메세지가 전송되었습니다.");
    })
    .catch((e) => {
      window.alert("메세지 전송이 실패되었습니다.");
    });
};
