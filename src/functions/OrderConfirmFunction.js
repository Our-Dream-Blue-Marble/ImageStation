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
  if (newDate && newTotalMoney) {
    await updateOrderDataDocument(docId, newDate, newTotalMoney);
  } else if (newDate) {
    await updateOrderDataDocument(docId, newDate, "0");
  } else if (newTotalMoney) {
    await updateOrderDataDocument(docId, "0", newTotalMoney);
  }

  getAdminOrderConfirmList(setOrderConfirmList);
};

export const getOrderDataPageWords = (pageValue) => {
  if (pageValue === "0") {
    return "전체";
  } else if (pageValue === "1") {
    return "짝수";
  } else if (pageValue === "2") {
    return "홀수";
  }
};

export const getOrderDataLayoutWords = (layout) => {
  if (layout) {
    return "가로 방향";
  } else {
    return "세로 방향";
  }
};

export const getOrderDataSizeWords = (pageSize) => {
  if (pageSize === "0") {
    return "A2";
  } else if (pageSize === "1") {
    return "A3";
  } else if (pageSize === "2") {
    return "A4";
  } else if (pageSize === "3") {
    return "A5";
  }
};

export const getOrderDataBindingMethodWords = (bindingMethod) => {
  if (bindingMethod === "0") {
    return "B4";
  } else if (bindingMethod === "1") {
    return "B2";
  }
};

export const getOrderDataPaperWords = (paper) => {
  if (paper === "0") {
    return "일반용지";
  } else if (paper === "1") {
    return <>몽블랑 220g/m{"\xB2"}</>;
  } else if (paper === "2") {
    return <>랑데부 210g/m{"\xB2"}</>;
  } else if (paper === "3") {
    return <>스노우지 120g/m{"\xB2"}</>;
  } else if (paper === "4") {
    return <> 스노우지 200g/m{"\xB2"}</>;
  } else if (paper === "5") {
    return <>마시멜로우지 209g/m{"\xB2"}</>;
  } else if (paper === "6") {
    return <>아트지 220g/m{"\xB2"}</>;
  } else if (paper === "7") {
    return <>모조지 220g/m{"\xB2"}</>;
  } else if (paper === "8") {
    return <>색지 220g/m{"\xB2"}</>;
  }
};

export const convertDateWithDots = (date) => {
  return date.replaceAll("-", ".");
};
