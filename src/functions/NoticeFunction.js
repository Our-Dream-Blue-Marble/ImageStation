import { dbService } from "fbase";

export const getNotice = async (data, setDetail) => {
  setDetail(data);
};
export const setNewNoticeInList = async (newNotice, setNotice) => {
  setNotice(newNotice);
};
