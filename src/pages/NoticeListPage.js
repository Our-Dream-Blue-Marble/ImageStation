import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import NoticePagination from "../widgets/NoticePagination";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NoticeListPage = () => {
  const [notice, setNotice] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 5;
  const offset = (page - 1) * limit;

  useEffect(() => {
    dbService
      .collection("notices")
      .orderBy("id", "desc")
      .onSnapshot((snapshot) => {
        const noticeArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.title,
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
      <main>
        {notice.slice(offset, offset + limit).map((value) => (
          <div key={value.id}>
            <h1>
              No. {value.id} :
              <Link to={`${process.env.PUBLIC_URL}/notice/${value.id}`}>
                {value.title}
              </Link>
            </h1>
          </div>
        ))}
      </main>
      <footer>
        <NoticePagination
          total={notice.length}
          notices={limit}
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
