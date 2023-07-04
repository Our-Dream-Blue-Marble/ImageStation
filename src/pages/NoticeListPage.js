import React, { useState, useEffect } from "react";
import fbase, { dbService } from "fbase";
import NoticePagination from "../widgets/NoticePagination";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import NoticeViewPage from "./NoticeViewPage";
import { showNoticeList } from "functions/NoticeListFunction";

const NoticeListPage = () => {
  const [notice, setNotice] = useState([]);
  const [page, setPage] = useState(1);
  const [notices, setNotices] = useState(5);
  const offset = (page - 1) * notices;

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
    <Layout>
      <header>
        <h1>[Notice List]</h1>
      </header>
      <main>{showNoticeList({ notice, offset, notices })}</main>
      <footer>
        <NoticePagination
          total={notice.length}
          notices={notices}
          page={page}
          setPage={setPage}
        />
      </footer>
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  max-width: 800px;
  margin: 0 auto;
`;

export default NoticeListPage;
