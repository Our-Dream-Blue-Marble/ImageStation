import UserModel, { UserModelConveter } from "models/UserModel";

const { dbService } = require("fbase");

export const createNewUserDocument = async ({
  uid,
  email,
  name,
  phoneNumber,
  role,
  isReceiveMail,
  signInDate,
  logInDate,
}) => {
  await dbService
    .collection("users")
    .doc(uid)
    .withConverter(UserModelConveter)
    .set(
      new UserModel(
        uid,
        email,
        name,
        phoneNumber,
        role,
        isReceiveMail,
        signInDate,
        logInDate
      )
    )
    .then(() => {
      return true;
    })
    .catch((e) => {
      console.log(e);
    });
  return false;
};

export const deleteUserDocument = async ({ uid }) => {
  await dbService
    .collection("users")
    .doc(uid)
    .delete()
    .then(() => {
      return true;
    })
    .catch((e) => {
      console.log(e);
    });
  return false;
};

export const readUserDocument = async ({ uid }) => {
  await dbService
    .collection("users")
    .doc(uid)
    .withConverter(UserModelConveter)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const userModel = doc.data();
        return userModel;
      } else {
        return UserModel();
      }
    })
    .catch((e) => {
      console.log(e);
    });
  return false;
};

export const updateUserDocument = async ({
  uid,
  email,
  name,
  phoneNumber,
  role,
  isReceiveMail,
  signInDate,
  logInDate,
}) => {
  const userDocumentRef = await dbService.collection("users").doc(uid);
  await userDocumentRef
    .withConverter(UserModelConveter)
    .update(
      new UserModel(
        uid,
        email,
        name,
        phoneNumber,
        role,
        isReceiveMail,
        signInDate,
        logInDate
      )
    )
    .then(() => {
      return true;
    })
    .catch((e) => {
      console.log(e);
    });
  return false;
};

export const updateUserNameDocument = async ({ uid, newName }) => {
  const userDocumentRef = await dbService.collection("users").doc(uid);
  await userDocumentRef
    .update({
      name: newName,
    })
    .then(() => {
      return true;
    })
    .catch((e) => {
      console.log(e);
    });
  return false;
};

export const updateUserPhoneNumberDocument = async ({
  uid,
  newPhoneNumber,
}) => {
  const userDocumentRef = await dbService.collection("users").doc(uid);
  await userDocumentRef
    .update({
      phoneNumber: newPhoneNumber,
    })
    .then(() => {
      return true;
    })
    .catch((e) => {
      console.log(e);
    });
  return false;
};

export const updateUserRoleDocument = async ({ uid, newRole }) => {
  const userDocumentRef = await dbService.collection("users").doc(uid);
  await userDocumentRef
    .update({
      role: newRole,
    })
    .then(() => {
      return true;
    })
    .catch((e) => {
      console.log(e);
    });
  return false;
};

export const updateUserIsReceiveMailDocument = async ({
  uid,
  newIsReceiveMail,
}) => {
  const userDocumentRef = await dbService.collection("users").doc(uid);
  await userDocumentRef
    .update({
      isReceiveMail: newIsReceiveMail,
    })
    .then(() => {
      return true;
    })
    .catch((e) => {
      console.log(e);
    });
  return false;
};

export const updateUserLogInDateDocument = async ({ uid, newLogInDate }) => {
  const userDocumentRef = await dbService.collection("users").doc(uid);
  await userDocumentRef
    .update({
      logInDate: newLogInDate,
    })
    .then(() => {
      return true;
    })
    .catch((e) => {
      console.log(e);
    });
  return false;
};
