import { readOrderListDocument } from "repositories/OrderRepository";

export const getOrderConfirmList = async (setOrderList) => {
  const orderConfirmList = await readOrderListDocument();
  const orderConfirmArray = orderConfirmList.docs.map((doc) => ({
    docId: doc.docId,
    ...doc.data(),
  }));
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

export const onOrderConfirmClick = (order, setUpdatedOrderConfirmState) => {
  const currentOrderState = order.state;
  if (currentOrderState === 1) {
    setUpdatedOrderConfirmState(2);
  } else if (currentOrderState === 2) {
    setUpdatedOrderConfirmState(0);
  }
};
export const getOrderConfirmStateWord = (updatedOrderConfirmState) => {};