import { authService, dbService } from "fbase";
import {
  readOrderListDocument,
  updateOrderDataDocument,
  updateOrderStateDocument,
} from "repositories/OrderRepository";

export const getAdminOrderConfirmList = async (
  setOrderList,
  setOrderConfirmSwitchList
) => {
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
  const proceedingList = orderConfirmArray.filter((data) => data.state > 0);
  setOrderConfirmSwitchList(proceedingList);

  setOrderList(orderConfirmArray);
};

export const getNotAdminOrderConfirmList = async (
  setOrderList,
  setOrderConfirmSwitchList
) => {
  const userMyOrderDocRef = await dbService
    .collection("users")
    .doc(authService.currentUser.uid)
    .collection("myOrders")
    .orderBy("docId", "desc")
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
    element.userDocRef.get().then((value) => {
      element.userDocRef = value.data();
    });
  });
  setOrderConfirmSwitchList(userMyOrderDocArray);
  setOrderList(userMyOrderDocArray);
};

export const getOrderSubmitDate = (orderData) => {
  var date = new Date(orderData);
  let timeSection;
  let hour = parseInt(("0" + date.getHours()).slice(-2));
  if (hour > 12) {
    timeSection = "오후";
    hour = hour - 12;
  } else {
    timeSection = "오전";
  }
  const dateInString =
    date.getFullYear().toString() +
    "." +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "." +
    ("0" + date.getDate()).slice(-2) +
    "\n" +
    timeSection +
    " " +
    hour +
    ":" +
    ("0" + date.getMinutes()).slice(-2);
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
    return "준비중";
  } else if (orderState === "2") {
    return "접수중";
  } else if (orderState === "-1") {
    return "취소";
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
    return "단면";
  } else if (pageValue === "1") {
    return "양면";
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
    return "파일원본크기";
  } else if (pageSize === "1") {
    return "상담요청";
  } else if (pageSize === "2") {
    return "A3";
  } else if (pageSize === "3") {
    return "A4";
  } else if (pageSize === "4") {
    return "A5";
  } else if (pageSize === "5") {
    return "A6";
  } else if (pageSize === "6") {
    return "B4";
  } else if (pageSize === "7") {
    return "B5";
  } else if (pageSize === "8") {
    return "A0";
  } else if (pageSize === "9") {
    return "A1";
  } else if (pageSize === "10") {
    return "A2";
  } else if (pageSize === "11") {
    return "B1";
  } else if (pageSize === "12") {
    return "B2";
  } else if (pageSize === "13") {
    return "B3";
  } else if (pageSize === "14") {
    return "전지";
  } else if (pageSize === "15") {
    return "2절";
  } else if (pageSize === "16") {
    return "4절";
  } else if (pageSize === "17") {
    return "8절";
  } else if (pageSize === "18") {
    return "사진인화(최대)";
  } else if (pageSize === "19") {
    return "사진인화(일반)";
  } else if (pageSize === "20") {
    return "증명사진";
  } else if (pageSize === "21") {
    return "반명함판";
  } else if (pageSize === "22") {
    return "명함판";
  } else if (pageSize === "23") {
    return "여권";
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
    return <>아트지 150g/m{"\xB2"}</>;
  } else if (paper === "7") {
    return <>모조지 80g/m{"\xB2"}</>;
  } else if (paper === "8") {
    return <>모조지 100g/m{"\xB2"}</>;
  } else if (paper === "9") {
    return <>모조지 120g/m{"\xB2"}</>;
  } else if (paper === "10") {
    return <>모조지 150g/m{"\xB2"}</>;
  } else if (paper === "11") {
    return <>색지 80g/m{"\xB2"}</>;
  } else if (paper === "12") {
    return <>색지 100g/m{"\xB2"}</>;
  } else if (paper === "13") {
    return <>색지 120g/m{"\xB2"}</>;
  } else if (paper === "14") {
    return <>색지 150g/m{"\xB2"}</>;
  }
};

export const convertDateWithDots = (date) => {
  return date.replaceAll("-", ".");
};
