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
    <div className="noticeListLayout">
      <div className="noticeHead">
        <div className="noticeListHead">공지사항</div>
        <div>
          {isAdmin ? (
            <button
              className="noticeWriteBtn"
              onClick={() =>
                navigate(NoticeWriteRouteName, {
                  state: { data: notice[0] },
                })
              }
            >
              +
            </button>
          ) : null}
        </div>
      </div>

      <div className="noticeBoxContainer">
        {notice.slice(offset, offset + limit).map((value) => (
          <div className="cardNotice" key={value.id}>
            <div
              className="contentCard"
              onClick={() => (
                navigate(NoticeListRouteName + "/" + value.id),
                { state: { data: value } }
              )}
            >
              <div className=" noticeListTitle">{value.title}</div>
              <div className=" noticeListDate">
                {getNoticeWrittenDate(value)}
              </div>
              <div className="noticeListBody">{value.body}</div>
            </div>
          </div>
        ))}
      </div>

      <footer>
        <NoticePagination
          total={notice.length}
          notices={limit}
          page={page}
          setPage={setPage}
        />
      </footer>
    </div>
  );
};

export default NoticeListPage;
