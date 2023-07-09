import { useEffect, useState } from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { NoticeListRouteName } from "routes/RouteName";
import { onDeleteNoticeClick } from "functions/NoticeFunction";

const NoticeViewPage = ({ isAdmin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [noticeViewObj, setNoticeViewObj] = useState(null);
  const { id } = useParams();
  const noticeData = location.state;

  useEffect(() => {
    if (noticeViewObj === null && id !== null) {
      setNoticeViewObj(noticeData);
    }
  }, []);
  return (
    <>
      {noticeViewObj === null ? (
        <>Loading...</>
      ) : (
        <div>
          no: {noticeViewObj.id} <br />
          title: {noticeViewObj.title}
          <br />
          body: {noticeViewObj.body}
          <br />
          <br />
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
