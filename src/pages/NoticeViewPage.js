import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getNotice } from "functions/NoticeFunction";
import { NoticeListRouteName } from "routes/RouteName";

const NoticeViewPage = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const noticeData = location.state;
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    console.log(noticeData);
    getNotice(noticeData, setDetail);
  }, []);
  return (
    <div>
      no: {detail.id} <br />
      title: {detail.title}
      <br />
      body: {detail.body}
      <br />
      <button onClick={() => navigate(NoticeListRouteName)}>
        리스트로 돌아가기
      </button>
    </div>
  );
};

export default NoticeViewPage;
