import NoticeModel, { NoticeModelConverter } from "models/NoticeModel";

const { dbService } = require("fbase");

export const createNewNoticeDocument = async (
  id,
  title,
  body,
  writer,
  date,
  dateupdated,
  view
) => {
  await dbService
    .collection("notices")
    .doc(id)
    .withConverter(NoticeModelConverter)
    .set(new NoticeModel(id, title, body, writer, date, dateupdated, view))
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

export const updateNoticeDocument = async (
  id,
  title,
  body,
  writer,
  date,
  view
) => {
  const noticeDocumentRef = await dbService.collection("notices").doc(id);
  await noticeDocumentRef
    .withConverter(NoticeModelConverter)
    .update(new NoticeModel(id, title, body, writer, date, Date.now(), view))
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
