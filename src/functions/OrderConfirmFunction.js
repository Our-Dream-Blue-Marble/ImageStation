import {
  readOrderListDocument,
  updateOrderStateDocument,
} from "repositories/OrderRepository";

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

export const onOrderConfirmClick = async (
  order,
  orderConfirmList,
  setOrderConfirmList,
  i
) => {
  const currentOrderState = order.state;
  let newOrderState;
  if (currentOrderState === 1) {
    newOrderState = 2;
  } else if (currentOrderState === 2) {
    newOrderState = 0;
  }
  if (currentOrderState !== newOrderState) {
    await updateOrderStateDocument(order.docId, newOrderState);
    orderConfirmList[i].state = newOrderState;
    console.log(orderConfirmList[i].state);
    setOrderConfirmList([...orderConfirmList]);
  }
};

export const getOrderConfirmStateWord = (orderState) => {
  if (orderState === 0) {
    return "완료";
  }
  if (orderState === 1) {
    return "주문";
  }
  if (orderState === 2) {
    return "접수";
  }
};
