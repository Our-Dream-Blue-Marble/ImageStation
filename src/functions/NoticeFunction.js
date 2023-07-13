import { storageService } from "fbase";
import { redirect } from "react-router-dom";
import {
  createNewNoticeDocument,
  deleteNoticeDocument,
  readNoticeListDocument,
  updateNoticeDocument,
} from "repositories/NoticeRepository";
import { NoticeListRouteName } from "routes/RouteName";
import { v4 as uuidv4 } from "uuid";

export const onAdminWriteNewNoticeSubmit = async (
  event,
  id,
  title,
  body,
  writer,
  attachment,
  attachmentName
) => {
  event.preventDefault();
  let attachmentUrl = "";
  let result = false;
  if (attachment !== "") {
    attachmentUrl = await uploadAttachmentOnStorage(id, attachment);
  }
  await createNewNoticeDocument(
    id,
    title,
    body,
    writer,
    Date.now(),
    "",
    0,
    attachmentUrl,
    attachmentName
  )
    .then(() => {
      result = true;
    })
    .catch((e) => {
      console.log(e);
    });
  window.confirm("작성 되었습니다");
  return result;
};

const uploadAttachmentOnStorage = async (id, attachment) => {
  const attachmentRef = storageService.ref().child(`notices/${id}/${uuidv4()}`);
  const response = await attachmentRef.putString(attachment, "data_url");
  return await response.ref.getDownloadURL();
};

export const onPostTitleOrBodyChange = (event, setValue) => {
  const {
    target: { name, value },
  } = event;
  if (name === "") {
    setValue(value);
  } else if (name === "") {
    setValue(value);
  }
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
  view,
  attachment,
  attachmentName
) => {
  event.preventDefault();
  await updateNoticeDocument(
    id,
    title,
    body,
    writer,
    date,
    view,
    attachment,
    attachmentName
  );
};

export const onUpdateTitleOrBodyChange = (event, setValue) => {
  const {
    target: { name, value },
  } = event;
  if (name === "noticeUpdatedTitle") {
    setValue(value);
  } else if (name === "noticeUpdatedBody") {
    setValue(value);
  }
};

export const onDeleteNoticeClick = async (id) => {
  const confirmDeleteNotice = window.confirm("해당 공지를 삭제하시겠습니까?");
  if (!confirmDeleteNotice) return;
  else {
    await deleteNoticeDocument(id)
      .then(() => {
        window.confirm("삭제를 완료하였습니다.");
        return redirect(NoticeListRouteName);
      })
      .catch((e) => {
        console.log(e);
      });
  }
};

export const onNoticeAttachmentChange = (
  event,
  setNoticeAttachment,
  setNoticeAttachmentName
) => {
  const {
    target: { files },
  } = event;
  const noticeFile = files[0];
  setNoticeAttachmentName(noticeFile.name);
  const noticeFileReader = new FileReader();
  noticeFileReader.onloadend = (finishedEvent) => {
    const {
      currentTarget: { result },
    } = finishedEvent;
    setNoticeAttachment(result);
  };
  noticeFileReader.readAsDataURL(noticeFile);
};

export const getNoticeWrittenDate = (noticeViewObj) => {
  var noticeWrittenDate = noticeViewObj.date;
  var date = new Date(noticeWrittenDate);
  const dateInString =
    date.getFullYear().toString() +
    "." +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "." +
    ("0" + date.getDate()).slice(-2);
  return dateInString;
};
