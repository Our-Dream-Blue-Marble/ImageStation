import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import NoticePagination from "../widgets/NoticePagination";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { HomeRouteName, NoticeWriteRouteName } from "routes/RouteName";
import { getNoticeList } from "functions/NoticeFunction";
import { readNoticeListDocument } from "repositories/NoticeRepository";
import "styles/NoticeListStyle.scss";

const NoticeListPage = () => {
  const [isadmin, setIsAdmin] = useState(true);
  const navigate = useNavigate();
  const [notice, setNotice] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 3;
  const offset = (page - 1) * limit;

  useEffect(() => {
    getNoticeList(setNotice);
  }, []);
  return (
    <div className="layout" style={{ height: "100vh" }}>
      <header className="noticeTitle">
        <h1>공지사항</h1>
      </header>

      {isadmin ? (
        <button
          onClick={() =>
            navigate(NoticeWriteRouteName, {
              state: { data: notice[0] },
            })
          }
        >
          작성하기
        </button>
      ) : null}
      <div className="noticeBoxContainer">
        {notice.slice(offset, offset + limit).map((value, i) => (
          <>
            <div className="cardNotice" key={value.id}>
              <h4>
                <div>
                  No. {value.id} :
                  <Link
                    to={`${process.env.PUBLIC_URL}/notice/${value.id}`}
                    state={value}
                  >
                    {value.title}
                  </Link>
                </div>
                <br />
                <div>date: {value.date}</div>
                <br />
                <div>body: {value.body}</div>
              </h4>
            </div>
          </>
        ))}
      </div>
      <br />
      <footer>
        <NoticePagination
          total={notice.length}
          notices={limit}
          page={page}
          setPage={setPage}
        />
      </footer>
      <br />

      <div>
        <button onClick={() => navigate(HomeRouteName)}>홈으로 돌아가기</button>
      </div>
    </div>
  );
};

export default NoticeListPage;
