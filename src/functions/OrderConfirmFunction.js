import { dbService } from "fbase";
import {
  readOrderListDocument,
  updateOrderDataDocument,
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

export const getOrderStateWords = (orderState) => {
  if (orderState === "0") {
    return "완료";
  } else if (orderState === "1") {
    return "접수중";
  } else if (orderState === "2") {
    return "준비중";
  }
};

export const onEditOrderDataSaveClick = async (
  docId,
  newDate,
  newTotalMoney,
  setOrderConfirmList
) => {
  await updateOrderDataDocument(docId, newDate, newTotalMoney);
  getAdminOrderConfirmList(setOrderConfirmList);
};
