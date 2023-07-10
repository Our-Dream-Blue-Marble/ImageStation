import React, { useState, useEffect } from "react";
import NoticePagination from "../widgets/NoticePagination";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeRouteName,
  NoticeListRouteName,
  NoticeWriteRouteName,
} from "routes/RouteName";
import { getNoticeList, getNoticeWrittenDate } from "functions/NoticeFunction";
import "styles/NoticeListStyle.scss";

const NoticeListPage = ({ isAdmin }) => {
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
      <div className="noticeListHead">공지사항</div>
      <div>
        {isAdmin ? (
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
      </div>

      <br />
      <div className="noticeBoxContainer">
        {notice.slice(offset, offset + limit).map((value) => (
          <div className="cardNotice" key={value.id}>
            <div className="contentCard">
              <div className=" noticeListTitle">
                <Link to={`${NoticeListRouteName}/${value.id}`} state={value}>
                  {value.title}
                </Link>
              </div>
              <br />
              <div className=" noticeListDate">
                {getNoticeWrittenDate(value)}
              </div>
              <br />
              <div className="noticeListBody">{value.body}</div>
            </div>
          </div>
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
