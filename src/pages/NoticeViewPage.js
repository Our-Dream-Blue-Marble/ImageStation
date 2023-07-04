import { dbService } from "fbase";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const NoticeViewPage = ({ data }) => {
  const { id } = useParams();
  const noticeDetail = dbService.collection("notices").doc();
  const getNotice = async () => {
    const detail = await noticeDetail.get();
    console.log(detail);
  };
  useEffect(() => {
    getNotice();
  }, []);
  return (
    <>
      hi
      <div>hi</div>
    </>
  );
};

export default NoticeViewPage;
