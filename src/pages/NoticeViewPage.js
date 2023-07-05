import { useEffect, useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { getNotice } from "functions/NoticeFunction";
import { NoticeListRouteName } from "routes/RouteName";
import { readNoticeDocument } from "repositories/NoticeRepository";

const NoticeViewPage = ({}) => {
  const navigate = useNavigate();

  const [readNoticeDetail, setReadNoticeDetail] = useState([]);
  const [detail, setDetail] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    setReadNoticeDetail(readNoticeDocument(id));
    console.log("read: ", readNoticeDetail);
  }, []);
  return (
    <div>
      no: {readNoticeDetail.id} <br />
      title: {readNoticeDetail.title}
      <br />
      body: {readNoticeDetail.body}
      <br />
      <button onClick={() => navigate(NoticeListRouteName)}>
        리스트로 돌아가기
      </button>
    </div>
  );
};

export default NoticeViewPage;
