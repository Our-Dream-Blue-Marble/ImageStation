import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import NoticePagination from "../widgets/NoticePagination";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { NoticeWriteRouteName } from "routes/RouteName";
import { getNotice, getNoticeInDb } from "functions/NoticeFunction";

const NoticeListPage = () => {
  const [admin, isAdmin] = useState(true);
  const navigate = useNavigate();
  const [notice, setNotice] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 2;
  const offset = (page - 1) * limit;

  const noticeInDb = dbService.collection("notices");

  useEffect(() => {
    noticeInDb.orderBy("id", "desc").onSnapshot((snapshot) => {
      const noticeArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.title,
        ...doc.data(),
      }));
      setNotice(noticeArray);
    });
  }, []);
  console.log(notice.length);
  return (
    <Layout style={{ height: "100vh" }}>
      <header>
        <h1>[Notice List]</h1>
      </header>
      {admin ? (
        <button
          onClick={() =>
            navigate(NoticeWriteRouteName, {
              noticeListLength: notice,
            })
          }
        >
          작성하기
        </button>
      ) : null}
      <main>
        {notice.slice(offset, offset + limit).map((value) => (
          <div key={value.id}>
            <h4>
              No. {value.id} :
              <Link
                to={`${process.env.PUBLIC_URL}/notice/${value.id}`}
                state={value}
              >
                {value.title}
              </Link>
            </h4>
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
