import { authService, dbService } from "fbase";
import OrderModel, { OrderModelConverter } from "models/OrderModel";

export const createNewOrderDocument = async (
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
  attachmentName
) => {
  const docId = Date.now();
  const uid = authService.currentUser.uid;
  await dbService
    .collection("order")
    .doc(docId)
    .withConverter(OrderModelConverter)
    .set(
      new OrderModel(
        docId,
        uid,
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
        1,
        0,
        0
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

export const readOrderDocument = async (docId) => {
  let orderModel;
  await dbService
    .collection("order")
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
    .collection("order")
    .orderBy("state", "desc")
    .get();
  return orderArrayModel;
};

export const updateOrderStateDocument = async (docId, newState) => {
  const orderDocumentRef = await dbService
    .collection("order")
    .doc(String(docId));
  await orderDocumentRef
    .update({ state: newState })
    .then(() => {
      return true;
    })
    .catch((e) => {
      console.log(e);
    });
  return false;
};
