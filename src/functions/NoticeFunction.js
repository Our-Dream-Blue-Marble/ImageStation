import { dbService } from "fbase";
import { NoticeModelConverter } from "models/NoticeModel";
import { createNewNoticeDocument } from "repositories/NoticeRepository";

export const getNotice = async (data, setDetail) => {
  setDetail(data);
};
export const setNewNoticeInList = async (newNotice, setNotice) => {
  setNotice(newNotice);
};

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
