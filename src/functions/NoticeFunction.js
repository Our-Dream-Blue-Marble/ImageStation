import { dbService, storageService } from "fbase";

import {
  createNewNoticeDocument,
  deleteNoticeDocument,
  readNoticeListDocument,
  updateNoticeDocument,
  updateNoticePinDocument,
} from "repositories/NoticeRepository";

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
    attachmentUrl = await uploadAttachmentOnStorage(
      id,
      attachment,
      attachmentName
    );
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

const uploadAttachmentOnStorage = async (id, attachment, attachmentName) => {
  const attachmentRef = storageService
    .ref()
    .child(`notices/${id}/${attachmentName}`);
  const response = await attachmentRef.putString(attachment, "data_url");
  const bucketName = response.ref.bucket;
  const encodedAttachmentName = encodeURIComponent(attachmentName);
  const httpsUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/notices%2F${id}%2F${encodedAttachmentName}?alt=media`;
  return httpsUrl;
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
  noticeArray.sort((a, b) => b.noticePin - a.noticePin);
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
  attachmentName,
  isNewAttachmentUploaded,
  noticePin
) => {
  event.preventDefault();
  let attachmentUrl = attachment;
  if (isNewAttachmentUploaded) {
    attachmentUrl = await uploadAttachmentOnStorage(
      id,
      attachment,
      attachmentName
    );
  }
  let result = false;
  await updateNoticeDocument(
    id,
    title,
    body,
    writer,
    date,
    view,
    attachmentUrl,
    attachmentName,
    noticePin
  )
    .then(() => {
      result = true;
    })
    .catch((e) => {
      console.log(e);
    });
  return result;
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
  await deleteNoticeDocument(id)
    .then(() => {
      return true;
    })
    .catch((e) => {
      console.log(e);
    });
  return false;
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
export const getNoticeWrittenFullDate = (noticeViewObj) => {
  var noticeWrittenDate = noticeViewObj.date;
  var date = new Date(noticeWrittenDate);
  let timeSection;
  let hour = parseInt(("0" + date.getHours()).slice(-2));
  if (hour > 12) {
    timeSection = "오후";
    hour = hour - 12;
  } else {
    timeSection = "오전";
  }
  const dateInString =
    date.getFullYear().toString() +
    "년 " +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "월 " +
    ("0" + date.getDate()).slice(-2) +
    "일 " +
    timeSection +
    " " +
    hour +
    ":" +
    ("0" + date.getMinutes()).slice(-2);
  return dateInString;
};

export const onPinnedNoticeDataClick = async (
  noticeId,
  pinStatus,
  noticeDataArray,
  setNotice,
  setNoticeSearched
) => {
  let pinCount = 0;
  await updateNoticePinDocument(noticeId, pinStatus);
  const updatedNoticeArray = noticeDataArray.map((notice) => {
    if (notice.id === noticeId) {
      return { ...notice, noticePin: pinStatus };
    }
    if (notice.noticePin) {
      pinCount++;
    }
    return notice;
  });
  let noticeArray = [...updatedNoticeArray];
  if (pinStatus || pinCount > 0) {
    noticeArray.sort((a, b) => b.id - a.id);
    noticeArray.sort((a, b) => b.noticePin - a.noticePin);
  } else {
    noticeArray.sort((a, b) => b.id - a.id);
  }

  setNotice(noticeArray);
  setNoticeSearched(noticeArray);
};

export const getNumOfPinnedNotices = (notice) => {
  const countNotice = notice.filter((data) => data.noticePin);
  return countNotice.length;
};
