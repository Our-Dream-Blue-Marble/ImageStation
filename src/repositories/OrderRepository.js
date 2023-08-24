import { authService, dbService } from "fbase";
import MyOrderModel, { MyOrderModelConverter } from "models/MyOrderModel";
import OrderModel, { OrderModelConverter } from "models/OrderModel";

export const createNewOrderDocument = async (
  docId,
  category,
  title,
  page,
  layout,
  size,
  bindingMethod,
  coating,
  paper,
  color,
  moreInfo,
  attachment,
  attachmentName,
  userRequestTime
) => {
  const userDocRef = dbService
    .collection("users")
    .doc(authService.currentUser.uid);
  await dbService
    .collection("orders")
    .doc(String(docId))
    .withConverter(OrderModelConverter)
    .set(
      new OrderModel(
        docId,
        userDocRef,
        category,
        title,
        page,
        layout,
        size,
        bindingMethod,
        coating,
        paper,
        color,
        moreInfo,
        attachment,
        attachmentName,
        "2",
        "0",
        "0",
        userRequestTime
      )
    )
    .then(async () => {
      const myOrderRef = dbService.collection("orders").doc(String(docId));
      await userDocRef
        .collection("myOrders")
        .doc(String(docId))
        .withConverter(MyOrderModelConverter)
        .set(new MyOrderModel(docId, authService.currentUser.uid, myOrderRef))
        .then(() => {
          return true;
        })
        .catch((e) => {
          console.log(e);
        });
    })
    .catch((e) => {
      console.log(e);
    });
  return false;
};

export const readOrderDocument = async (docId) => {
  let orderModel;
  await dbService
    .collection("orders")
    .doc(docId)
    .withConverter(OrderModelConverter)
    .get()
    .then((doc) => {
      if (doc.exists) {
        orderModel = doc.data().docId;
      }
    })
    .catch((e) => {
      console.log(e);
    });
  return orderModel;
};

export const readOrderListDocument = async () => {
  const orderArrayModel = await dbService
    .collection("orders")
    .orderBy("state", "desc")
    .get();
  return orderArrayModel;
};

export const updateOrderStateDocument = async (docId, newState) => {
  const orderDocumentRef = await dbService
    .collection("orders")
    .doc(String(docId));
  let result = false;
  await orderDocumentRef
    .update({ state: newState })
    .then(() => {
      result = true;
    })
    .catch((e) => {
      console.log(e);
    });
  return result;
};

export const updateOrderDataDocument = async (
  docId,
  newDate,
  newTotalMoney
) => {
  const orderDocumentRef = await dbService
    .collection("orders")
    .doc(String(docId));
  let retult = false;
  await orderDocumentRef
    .update({ adminCompleteTime: newDate, totalMoney: newTotalMoney })
    .then(() => {
      retult = true;
    })
    .catch((e) => {
      console.log(e);
    });
  return retult;
};
