import { dbService } from "fbase";
import OrderModel, { OrderModelConverter } from "models/OrderModel";

export const createNewOrderDocument = async (
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
  state
) => {
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
        state,
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
    .orderBy("docId", "desc")
    .get();
  return orderArrayModel;
};

export const updateOrderStateDocument = async (
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
  state,
  totalMoney,
  completeTime
) => {
  const orderDocumentRef = await dbService.collection("order").doc(docId);
  await orderDocumentRef
    .withConverter(OrderModelConverter)
    .update(
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
        state,
        totalMoney,
        completeTime
      ).toData()
    )
    .then(() => {
      return true;
    })
    .catch((e) => {
      console.log(e);
    });
  return false;
};
