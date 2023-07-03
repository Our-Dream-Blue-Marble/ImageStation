import React, { useState, useEffect, useId } from "react";
import fbase, { dbService } from "fbase";

const NoticeListPage = () => {
  // const paginateQuery = async () => {
  //   const first = dbService.collection("notices").orderBy("num");
  //   const snapshot = await first.get();

  //   const last = snapshot.docs[snapshot.docs.length - 1];

  //   const next = dbService
  //     .collection("notices")
  //     .orderBy("num")
  //     .startAfter(last.data().num);
  // };
  //const nextSnapshot = await next.get();

  const [notice, setNotice] = useState([]);
  useEffect(() => {
    dbService.collection("notices").onSnapshot((snapshot) => {
      const noticeArray = snapshot.docs.map((doc) => ({
        id: doc.ld,
        ...doc.data(),
      }));
      setNotice(noticeArray);
    });
  });
  const uniqueId = useId();
  const showNotice = notice.map((value) => (
    <div key={uniqueId}>
      <h1>Title: {value.title}</h1>
    </div>
  ));

  return <div>{showNotice}</div>;
};

export default NoticeListPage;
