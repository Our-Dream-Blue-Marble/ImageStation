import { useEffect, useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { getNotice } from "functions/NoticeFunction";
import {
  NoticeListRouteName,
  NoticeUpdatePageRouteName,
} from "routes/RouteName";
import { readNoticeDocument } from "repositories/NoticeRepository";

const NoticeViewPage = ({}) => {
  const navigate = useNavigate();

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
          <button onClick={() => navigate(NoticeUpdatePageRouteName)}>
            수정하기
          </button>
        </div>
      )}
    </>
  );
};

export default NoticeViewPage;
