import React, { useState, useEffect } from "react";
import NoticePagination from "../widgets/NoticePagination";
import { useLocation, useNavigate } from "react-router-dom";
import {
  NoticeAllRouteName,
  NoticeListRouteName,
  NoticeWriteRouteName,
} from "routes/RouteName";
import { getNoticeList, getNoticeWrittenDate } from "functions/NoticeFunction";
import "styles/NoticeListStyle.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";

const NoticeListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [notice, setNotice] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 3;
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
    <div className="noticeListLayout">
      <div className="noticeHead">
        <div className="noticeListHead">이미지스테이션의 소식을 전해드려요</div>
        <div
          className="noticeListAll"
          onClick={() => navigate(NoticeAllRouteName, { state: false })}
        >
          모든 공지
        </div>
      </div>
      <div className="noticeBoxContainer">
        {notice.slice(offset, offset + limit).map((value) => (
          <div className="cardNotice" key={value.id}>
            <div
              className="contentCard"
              onClick={() =>
                navigate(NoticeListRouteName + "/" + value.id, {
                  state: { data: value },
                })
              }
            >
              <div className=" noticeListTitle">{value.title}</div>
              <div className=" noticeListDate">
                {getNoticeWrittenDate(value)}
              </div>
              <pre className="noticeListBody">{value.body}</pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default NoticeListPage;
