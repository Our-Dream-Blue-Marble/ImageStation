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
