import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import NoticePagination from "../widgets/NoticePagination";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { HomeRouteName, NoticeWriteRouteName } from "routes/RouteName";
import { getNoticeList } from "functions/NoticeFunction";
import { readNoticeListDocument } from "repositories/NoticeRepository";

const NoticeListPage = () => {
  const [isadmin, setIsAdmin] = useState(true);
  const navigate = useNavigate();
  const [notice, setNotice] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 2;
  const offset = (page - 1) * limit;

  useEffect(() => {
    getNoticeList(setNotice);
  }, []);
  return (
    <Layout style={{ height: "100vh" }}>
      <header>
        <h1>[Notice List]</h1>
      </header>
      {isadmin ? (
        <button onClick={() => navigate(NoticeWriteRouteName)}>작성하기</button>
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
      <br />
      <button onClick={() => navigate(HomeRouteName)}>홈으로 돌아가기</button>
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
