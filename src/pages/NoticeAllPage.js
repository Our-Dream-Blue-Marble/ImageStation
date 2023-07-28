import "styles/NoticeAllStyle.scss";
import NoticePagination from "../widgets/NoticePagination";
import React, { useState, useEffect } from "react";
import {
  getNoticeList,
  getNoticeWrittenDate,
  onSearchNoticeChange,
} from "functions/NoticeFunction";
import { useLocation, useNavigate } from "react-router-dom";
import { NoticeListRouteName, NoticeWriteRouteName } from "routes/RouteName";

const NoticeAllPage = ({ isAdmin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [notice, setNotice] = useState([]);
  const [noticeSearched, setNoticeSearched] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6;
  const offset = (page - 1) * limit;
  const [isNoticeDeleted, setIsNoticeDeleted] = useState(location.state);

  useEffect(() => {
    getNoticeList(setNotice);
    getNoticeList(setNoticeSearched);
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
        <form
          className="searchContainer"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            className="searchInput"
            name="noticeSearch"
            type="text"
            placeholder="검색"
            onChange={(e) => {
              onSearchNoticeChange(e, setSearch);
            }}
          />
          <button
            className="searchBtn"
            onClick={() => {
              const filteredData = notice.filter(
                (data) =>
                  data.title.includes(search) || data.body.includes(search)
              );
              setNoticeSearched(filteredData);
            }}
          >
            Q
          </button>
        </form>
        <hr id="NoticeDevice_line" />

        <div className="noticesContainer">
          {noticeSearched.slice(offset, offset + limit).map((value) => (
            <>
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
                  <div className="noticeListDate">게시일시:</div>
                  <div className="noticeListDate">
                    {getNoticeWrittenDate(value)}
                  </div>
                </div>
              </div>
            </>
          ))}
          <hr id="OrderConfirmView_line" />
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
