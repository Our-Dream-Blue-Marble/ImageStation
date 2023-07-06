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
  await updateNoticeDocument(id, title, body, writer, date, view);
};

export const onupdateTitleOrBodyChange = (event, setValue) => {
  const {
    target: { name, value },
  } = event;
  if (name === "noticeUpdatedTitle") {
    setValue(value);
  } else if (name === "noticeUpdatedBody") {
    setValue(value);
  }
};
