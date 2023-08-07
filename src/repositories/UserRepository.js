import UserModel, { UserModelConveter } from "models/UserModel";

import { dbService } from "fbase";
import { getDecryptedData, getEncryptedData } from "functions/UserFunction";

export const createNewUserDocument = async (
  uid,
  email,
  name,
  phoneNumber,
  role,
  isReceiveMail,
  signInDate,
  logInDate
) => {
  const encryptUserName = getEncryptedData(uid, name);
  const encryptPhoneNumber = getEncryptedData(uid, phoneNumber);
  await dbService
    .collection("users")
    .doc(uid)
    .withConverter(UserModelConveter)
    .set(
      new UserModel(
        uid,
        email,
        encryptUserName,
        encryptPhoneNumber,
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

export const deleteUserDocument = async (uid) => {
  const userDataCollection = await dbService.collection("users").doc(uid);

  const userMyOrderDataCollection = userDataCollection.collection("myOrders");

  const myOrdersSanpshot = await userMyOrderDataCollection.get();
  if (!myOrdersSanpshot.empty) {
    myOrdersSanpshot.docs.forEach((doc) => {
      userMyOrderDataCollection.doc(String(doc.data().docId)).delete();
    });
  }
  userDataCollection
    .delete()
    .then(() => {
      return true;
    })
    .catch((e) => {
      console.log(e);
    });
  return false;
};

export const readUserDocument = async (uid) => {
  let userModel;
  await dbService
    .collection("users")
    .doc(uid)
    .withConverter(UserModelConveter)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userModel = doc.data().uid;
      }
    })
    .catch((e) => {
      console.log(e);
    });
  userModel.name = getDecryptedData(uid, userModel.name);
  userModel.phoneNumber = getDecryptedData(uid, userModel.phoneNumber);
  return userModel;
};

export const updateUserDocument = async (
  uid,
  email,
  name,
  phoneNumber,
  role,
  isReceiveMail,
  signInDate,
  logInDate
) => {
  const userDocumentRef = await dbService.collection("users").doc(uid);
  const encryptUserName = getEncryptedData(uid, name);
  const encryptPhoneNumber = getEncryptedData(uid, phoneNumber);
  await userDocumentRef
    .withConverter(UserModelConveter)
    .update(
      new UserModel(
        uid,
        email,
        encryptUserName,
        encryptPhoneNumber,
        role,
        isReceiveMail,
        signInDate,
        logInDate
      ).toData()
    )
    .then(() => {
      return true;
    })
    .catch((e) => {
      console.log(e);
    });
  return false;
};

export const updateUserNameDocument = async (uid, newName) => {
  const userDocumentRef = await dbService.collection("users").doc(uid);
  const encryptNewUserName = getEncryptedData(uid, newName);
  await userDocumentRef
    .update({
      name: encryptNewUserName,
    })
    .then(() => {
      return true;
    })
    .catch((e) => {
      console.log(e);
    });
  return false;
};

export const updateUserPhoneNumberDocument = async (uid, newPhoneNumber) => {
  const userDocumentRef = await dbService.collection("users").doc(uid);
  const encryptNewPhoneNumber = getEncryptedData(uid, newPhoneNumber);
  await userDocumentRef
    .update({
      phoneNumber: encryptNewPhoneNumber,
    })
    .then(() => {
      return true;
    })
    .catch((e) => {
      console.log(e);
    });
  return false;
};

export const updateUserRoleDocument = async (uid, newRole) => {
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

export const updateUserIsReceiveMailDocument = async (
  uid,
  newIsReceiveMail
) => {
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

export const updateUserLogInDateDocument = async (uid, newLogInDate) => {
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
