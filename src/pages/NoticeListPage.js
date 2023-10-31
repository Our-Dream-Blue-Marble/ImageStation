import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NoticeAllRouteName, NoticeListRouteName } from "routes/RouteName";
import { getNoticeList, getNoticeWrittenDate } from "functions/NoticeFunction";
import "styles/NoticeListStyle.scss";

const NoticeListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [notice, setNotice] = useState([]);
  const [isNoticeLoading, setIsNoticeLoading] = useState(true);

  const [isNoticeDeleted, setIsNoticeDeleted] = useState(location.state);
  useEffect(() => {
    getNoticeList(setNotice).then(() => {
      setIsNoticeLoading(false);
    });
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
    <>
      {isNoticeLoading && <div className="noticeListLayout" />}
      {notice.length !== 0 ? (
        <div className="noticeListLayout">
          <div className="noticeHead">
            <div className="noticeListHead">공지사항</div>
            <div className="noticeListExp">
              이미지스테이션의 새로운 소식을 전해드려요.
            </div>
            <div
              className="AllBtnContainer"
              onClick={() => navigate(NoticeAllRouteName, { state: false })}>
              <div className="noticeListAll">더보기</div>
              <div className="noticeAllArrow"></div>
            </div>
          </div>
          <div className="noticeBoxContainer">
            {notice.slice(0, 4).map((value) => (
              <div className="fadeInAnimation">
                <div
                  className="cardNotice"
                  key={value.id}
                  onClick={() =>
                    navigate(NoticeListRouteName + "/" + value.id, {
                      state: { data: value },
                    })
                  }>
                  <div className="contentCard">
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
      ) : (
        <div className="noticeEmptyLayout">
          <div className="noticeEmptyHeading">
            죄송합니다! 아직 올라온 공지가 없습니다.
          </div>
          <div className="noticeEmptyBody">새로운 공지로 찾아뵙겠습니다!</div>
        </div>
      )}
    </>
  );
};
export default NoticeListPage;
