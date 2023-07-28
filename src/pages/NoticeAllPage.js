import "styles/NoticeAllStyle.scss";
import NoticePagination from "../widgets/NoticePagination";
import React, { useState, useEffect } from "react";
import { getNoticeList, getNoticeWrittenDate } from "functions/NoticeFunction";
import { useLocation, useNavigate } from "react-router-dom";
import { NoticeListRouteName, NoticeWriteRouteName } from "routes/RouteName";

const NoticeAllPage = ({ isAdmin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [notice, setNotice] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 6;
  const offset = (page - 1) * limit;
  const [isNoticeDeleted, setIsNoticeDeleted] = useState(location.state);

  useEffect(() => {
    getNoticeList(setNotice);
  }, []);
  useEffect(() => {
    if (isNoticeDeleted) {
      getNoticeList(setNotice).then((result) => {
        if (result) {
          setIsNoticeDeleted(false);
        }
      });
    }
  }, [isNoticeDeleted]);
  return (
    <div className="NoticeAllLayout">
      <div className="NoticeAllHeadContainer">
        <div className="NoticeAllTitle">
          이미지스테이션의 공지를 확인해보세요
        </div>
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

      <div className="NoticeAllContainer">
        <div className="noticeBoxContainer">
          {notice.slice(offset, offset + limit).map((value) => (
            <div
              className="eachNoticeContent"
              key={value.id}
              onClick={() =>
                navigate(NoticeListRouteName + "/" + value.id, {
                  state: { data: value },
                })
              }
            >
              <div className="noticeTitleAndBodyContainer">
                <div className=" noticeListTitle">{value.title}</div>
                <pre className="noticeListBody">{value.body}</pre>
              </div>

              <div className="noticeDateContainer">
                <div className=" noticeListDate">
                  {getNoticeWrittenDate(value)}
                </div>
              </div>
            </div>
          ))}
        </div>
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

export default NoticeAllPage;
