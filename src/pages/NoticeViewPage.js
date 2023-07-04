import { dbService } from "fbase";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNotice } from "functions/NoticeFunction";

const NoticeViewPage = () => {
  const [detail, setDetail] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    getNotice(id, setDetail);
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
