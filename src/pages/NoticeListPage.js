import React, { useState, useEffect } from "react";
import fbase, { dbService } from "fbase";

const NoticeListPage = () => {
  const [notice, setNotice] = useState([]);
  const [page, setPage] = useState([]);

  useEffect(() => {
    dbService
      .collection("notices")
      .orderBy("num", "desc")
      .onSnapshot((snapshot) => {
        const noticeArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotice(noticeArray);
      });
  }, []);

  return (
    <>
      <div>
        {notice.map((value) => (
          <div key={value.id}>
            <h1>{value.title}</h1>
          </div>
        ))}
      </div>
      <div>
        <button>next Page</button>
      </div>
    </>
  );
};

export default NoticeListPage;
