import { dbService } from "fbase";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const getNotice = async (id, setDetail) => {
  const notice = dbService.collection("notices").doc(id);

  const doc = await notice.get();
  if (doc.exists) {
    const noticeArray = doc.data();
    setDetail(noticeArray);
  } else {
    setDetail([]);
  }
};
