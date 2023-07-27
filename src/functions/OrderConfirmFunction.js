import { dbService, storageService } from "fbase";
import MyOrderModel, { MyOrderModelConverter } from "models/MyOrderModel";
import moment from "moment";
import { useCallback } from "react";
import {
  readOrderListDocument,
  updateOrderStateDocument,
} from "repositories/OrderRepository";

export const getAdminOrderConfirmList = async (setOrderList) => {
  const orderConfirmList = await readOrderListDocument();
  let orderConfirmArray = orderConfirmList.docs.map((doc) => ({
    docId: doc.docId,
    ...doc.data(),
  }));
  orderConfirmArray.forEach((element) => {
    element.userDocRef.get().then((value) => {
      element.userDocRef = value.data();
    });
  });
  setOrderList(orderConfirmArray);
};

export const getNotAdminOrderConfirmList = async (userObject, setOrderList) => {
  const userMyOrderDocRef = await dbService
    .collection("users")
    .doc(userObject.uid)
    .collection("myOrders")
    .get();
  const userMyOrderDocList = userMyOrderDocRef.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));

  const userMyOrderDocArray = await Promise.all(
    userMyOrderDocList.map(async (doc) => {
      const docData = await doc.orderDocRef.get();
      return {
        docId: doc.docId,
        uid: doc.uid,
        ...docData.data(),
      };
    })
  );
  userMyOrderDocArray.forEach((element) => {
    element.userDocRef = null;
  });
  setOrderList(userMyOrderDocArray);
};

export const getOrderSubmitDate = (orderConfirm) => {
  var orderSubmitDate = orderConfirm.docId;
  var date = new Date(orderSubmitDate);
  const dateInString =
    date.getFullYear().toString() +
    "." +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "." +
    ("0" + date.getDate()).slice(-2);
  return dateInString;
};

export const onOrderConfirmStateSelect = async (
  e,
  order,
  orderConfirmList,
  setOrderConfirmList,
  i
) => {
  let newOrderState = e.target.value;
  await updateOrderStateDocument(order.docId, newOrderState);
  orderConfirmList[i].state = newOrderState;
  setOrderConfirmList([...orderConfirmList]);
};

export const getAttachmentDownLoad = (orderData) => {
  var filename = orderData.attachmentName;
  var fileLength = filename.length;
  var lastDot = filename.lastIndexOf(".");
  var type = filename.substring(lastDot + 1, fileLength);
  let attachmentNameInStorage = orderData.docId + "." + type;
  const orderTime = moment().format("YYYYMMDD");
  storageService
    .ref()
    .child(`orders/${orderTime}/${attachmentNameInStorage}`)
    .getDownloadURL()
    .then((url) => {
      return url;
    });
};
