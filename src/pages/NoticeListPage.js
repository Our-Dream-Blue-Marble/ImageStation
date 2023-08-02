import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NoticeAllRouteName, NoticeListRouteName } from "routes/RouteName";
import { getNoticeList, getNoticeWrittenDate } from "functions/NoticeFunction";
import "styles/NoticeListStyle.scss";

const NoticeListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [notice, setNotice] = useState([]);
  const page = 1;
  const limit = 4;
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

  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  });

  return (
    <div className="noticeListLayout">
      <div className="noticeHead">
        <div className="noticeListHead">공지사항</div>
        <div className="noticeListExp">
          이미지스테이션의 새로운 소식을 전해드려요
        </div>

        <div
          className="AllBtnContainer"
          onClick={() => navigate(NoticeAllRouteName, { state: false })}
        >
          <div className="noticeListAll">더보기</div>
          <div className="noticeAllArrow"></div>
        </div>
      </div>
      <div
        className={
          scrollPosition < 100 ? "fadeInAnimation" : "noticeBoxContainer"
        }
      >
        {notice.slice(0, 4).map((value) => (
          <div className="fadeInAnimation">
            <div className="cardNotice" key={value.id}>
              <div
                className="contentCard"
                onClick={() =>
                  navigate(NoticeListRouteName + "/" + value.id, {
                    state: { data: value },
                  })
                }
              >
                <pre className=" noticeListTitle">{value.title}</pre>
                <div className=" noticeListDate">
                  {getNoticeWrittenDate(value)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default NoticeListPage;
