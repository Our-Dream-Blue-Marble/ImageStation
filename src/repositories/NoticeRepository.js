import NoticeModel, { NoticeModelConverter } from "models/NoticeModel";
import { dbService } from "fbase";

export const createNewNoticeDocument = async (
  id,
  title,
  body,
  writer,
  date,
  dateupdated,
  view,
  attachment
) => {
  await dbService
    .collection("notices")
    .doc(id)
    .withConverter(NoticeModelConverter)
    .set(
      new NoticeModel(
        id,
        title,
        body,
        writer,
        date,
        dateupdated,
        view,
        attachment
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

export const readNoticeDocument = async (id) => {
  let noticeModel;
  await dbService
    .collection("notices")
    .doc(id)
    .withConverter(NoticeModelConverter)
    .get()
    .then((doc) => {
      if (doc.exists) {
        noticeModel = doc.data().id;
      }
    })
    .catch((e) => {
      console.log(e);
    });

  return noticeModel;
};

export const readNoticeListDocument = async () => {
  const noticeArrayModel = await dbService
    .collection("notices")
    .orderBy("date", "desc")
    .get();
  return noticeArrayModel;
};

export const updateNoticeDocument = async (
  id,
  title,
  body,
  writer,
  date,
  view,
  attachment
) => {
  const noticeDocumentRef = await dbService.collection("notices").doc(id);
  await noticeDocumentRef
    .withConverter(NoticeModelConverter)
    .update(
      new NoticeModel(
        id,
        title,
        body,
        writer,
        date,
        Date.now(),
        view,
        attachment
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

export const updateNoticeTitleDocument = async (id, newTitle) => {
  const noticeDocumentRef = await dbService.collection("notices").doc(id);
  await noticeDocumentRef
    .update({ title: newTitle })
    .then(() => {
      return true;
    })
    .catch((e) => {
      console.log(e);
    });
  return false;
};

export const updateNoticeBodyDocument = async (id, newBody) => {
  const noticeDocumentRef = await dbService.collection("notices").doc(id);
  await noticeDocumentRef
    .update({ body: newBody })
    .then(() => {
      return true;
    })
    .catch((e) => {
      console.log(e);
    });
  return false;
};

export const deleteNoticeDocument = async (id) => {
  await dbService
    .collection("notices")
    .doc(id)
    .delete()
    .then(() => {
      return true;
    })
    .catch((e) => {
      console.log(e);
    });
  return false;
};
