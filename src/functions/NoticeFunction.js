import {
  createNewNoticeDocument,
  readNoticeListDocument,
} from "repositories/NoticeRepository";

export const onAdminWriteNewNoticeSubmit = async (
  event,
  id,
  title,
  body,
  writer
) => {
  event.preventDefault();

  await createNewNoticeDocument(
    id,
    title,
    body,
    writer,
    Date.now(),
    "",
    0
  ).then(async () => {
    await createNewNoticeDocument(id, title, body, writer, Date.now(), "", 0);
  });
};

export const getNoticeList = async (setNotice) => {
  const noticeList = await readNoticeListDocument();
  const noticeArray = noticeList.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  setNotice(noticeArray);
};
