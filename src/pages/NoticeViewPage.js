import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { NoticeListRouteName } from "routes/RouteName";
import { readNoticeDocument } from "repositories/NoticeRepository";
import { onDeleteNoticeClick } from "functions/NoticeFunction";

const NoticeViewPage = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(true);
  const [noticeViewObj, setNoticeViewObj] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (noticeViewObj === null && id !== null) {
      readNoticeDocument(id).then((result) => {
        setNoticeViewObj(result);
      });
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
          <button onClick={() => navigate(NoticeListRouteName)}>
            리스트로 돌아가기
          </button>
          {isAdmin ? (
            <>
              <button
                onClick={() =>
                  navigate(`${process.env.PUBLIC_URL}/notice/update/${id}`, {
                    state: { data: noticeViewObj },
                  })
                }>
                수정하기
              </button>
              <button onClick={onDeleteNoticeClick(id)}>삭제하기</button>
            </>
          ) : null}
        </div>
      )}
    </>
  );
};

export default NoticeViewPage;
