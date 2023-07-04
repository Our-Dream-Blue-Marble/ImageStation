import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getNotice } from "functions/NoticeFunction";

const NoticeViewPage = ({}) => {
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
    </div>
  );
};

export default NoticeViewPage;
