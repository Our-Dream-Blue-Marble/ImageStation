import { dbService } from "fbase";
import MyOrderModel, { MyOrderModelConverter } from "models/MyOrderModel";
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
    docId: doc.Id,
    ...doc.data(),
  }));

  userMyOrderDocList.forEach((element) => {
    element.orderDocRef.get().then((value) => {
      element.orderDocRef = value.data();
    });
  });
  console.log(userMyOrderDocList);
  setOrderList(userMyOrderDocList);
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
