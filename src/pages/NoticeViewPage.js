import { dbService } from "fbase";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const NoticeViewPage = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const getNotice = async () => {
    const notice = dbService.collection("notices").doc(id);
    const doc = await notice.get();
    if (doc.exists) {
      const noticeArray = doc.data();
      setDetail(noticeArray);
    } else {
      setDetail([]);
    }
  };
  useEffect(() => {
    getNotice();
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
