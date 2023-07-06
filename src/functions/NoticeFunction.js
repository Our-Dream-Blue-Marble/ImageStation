import {
  createNewNoticeDocument,
  readNoticeListDocument,
  updateNoticeDocument,
} from "repositories/NoticeRepository";

export const onAdminWriteNewNoticeSubmit = async (
  event,
  id,
  title,
  body,
  writer
) => {
  event.preventDefault();

  await createNewNoticeDocument(id, title, body, writer, Date.now(), "", 0);
};

export const onPostTitleChange = (event, setPostTitle) => {
  const {
    target: { value },
  } = event;
  setPostTitle(value);
};

export const onPostBodyChange = (event, setPostBody) => {
  const {
    target: { value },
  } = event;
  setPostBody(value);
};

export const getNoticeList = async (setNotice) => {
  const noticeList = await readNoticeListDocument();
  const noticeArray = noticeList.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  setNotice(noticeArray);
};

export const onUpdatedNoticeSubmit = async (
  event,
  id,
  title,
  body,
  writer,
  date,
  view
) => {
  event.preventDefault();
  console.log("1111");
  await updateNoticeDocument(id, title, body, writer, date, view);
  console.log("11121");
};

export const onUpdateTitleChange = (event, setNoticeUpdatedTitle) => {
  const {
    target: { value },
  } = event;
  setNoticeUpdatedTitle(value);
};
export const onupdateBodyChange = (event, setNoticeUpdatedBody) => {
  const {
    target: { value },
  } = event;
  setNoticeUpdatedBody(value);
};
