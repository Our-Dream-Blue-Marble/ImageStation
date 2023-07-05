import NoticeModel, { NoticeModelCoveter } from "models/NoticeModel";

const { dbService } = require("fbase");

export const createNewNoticeDocument = async (
  id,
  title,
  body,
  writer,
  date,
  view
) => {
  await dbService
    .collection("notices")
    .doc(id)
    .withConverter(NoticeModelCoveter)
    .set(new NoticeModel(id, title, body, writer, date, view))
    .then(() => {
      return true;
    })
    .catch((e) => {
      console.log(e);
    });
  return false;
};

export const readNoticeDocument = async (id) => {
  await dbService
    .collection("notices")
    .doc(id)
    .withConverter(NoticeModelCoveter)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const noticeModel = doc.data();
        return noticeModel;
      } else {
        return NoticeModel();
      }
    })
    .catch((e) => {
      console.log(e);
    });
  return false;
};

export const updateNoticeDocument = async();
