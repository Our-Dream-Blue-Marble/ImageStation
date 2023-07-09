import { useEffect, useState } from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { NoticeListRouteName } from "routes/RouteName";
import {
  getNoticeWrittenDate,
  onDeleteNoticeClick,
} from "functions/NoticeFunction";
import { readNoticeDocument } from "repositories/NoticeRepository";

const NoticeViewPage = ({ isAdmin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [noticeViewObj, setNoticeViewObj] = useState(null);
  const { id } = useParams();
  const noticeData = location.state;
  useEffect(() => {
    if (noticeData === null) {
      if (noticeViewObj === null && id !== null) {
        readNoticeDocument(id).then((result) => {
          setNoticeViewObj(result);
        });
      }
    } else {
      if (noticeViewObj === null && id !== null) {
        setNoticeViewObj(noticeData);
      }
    }
  }, []);

  return (
    <>
      {noticeViewObj === null ? (
        <>Loading...</>
      ) : (
        <div>
          공지번호: {noticeViewObj.id} <br />
          공지제목: {noticeViewObj.title}
          <br />
          공지 글: {noticeViewObj.body}
          <br />
          작성 날짜: {getNoticeWrittenDate(noticeViewObj)}
          <br />
          <>
            {noticeViewObj.attachment ? (
              <img src={noticeViewObj.attachment} />
            ) : null}
          </>
          <button onClick={() => navigate(NoticeListRouteName)}>
            리스트로 돌아가기
          </button>
          {isAdmin ? (
            <>
              <button
                onClick={() =>
                  navigate(`${NoticeListRouteName}/update/${id}`, {
                    state: { data: noticeViewObj },
                  })
                }>
                수정하기
              </button>
              <button
                onClick={() => {
                  onDeleteNoticeClick(id);
                  navigate(NoticeListRouteName);
                }}>
                삭제하기
              </button>
            </>
          ) : null}
        </div>
      )}
    </>
  );
};

export default NoticeViewPage;
