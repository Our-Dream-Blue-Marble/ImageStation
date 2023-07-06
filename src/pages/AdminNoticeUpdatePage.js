import {
  onupdateTitleOrBodyChange,
  onUpdatedNoticeSubmit,
} from "functions/NoticeFunction";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AdminNoticeUpdatePage = () => {
  const location = useLocation();
  const currentNoticeObj = location.state.data;
  const [noticeUpdatedTitle, setNoticeUpdatedTitle] = useState(
    location.state.data.title
  );
  const [noticeUpdatedBody, setNoticeUpdatedBody] = useState(
    location.state.data.body
  );
  const navigate = useNavigate();

  return (
    <>
      {currentNoticeObj === null ? (
        <>Loading...</>
      ) : (
        <div>
          no: {currentNoticeObj.id} <br />
          writer: {currentNoticeObj.writer} <br />
          <form
            onSubmit={(e) => {
              onUpdatedNoticeSubmit(
                e,
                currentNoticeObj.id,
                noticeUpdatedTitle,
                noticeUpdatedBody,
                currentNoticeObj.writer,
                currentNoticeObj.date,
                currentNoticeObj.view
              );
              navigate(
                `${process.env.PUBLIC_URL}/notice/${currentNoticeObj.id}`
              );
            }}
            className="container sweetEdit">
            <input
              type="text"
              name="noticeUpdatedTitle"
              placeholder="제목"
              value={noticeUpdatedTitle}
              onChange={(e) => {
                onupdateTitleOrBodyChange(e, setNoticeUpdatedTitle);
              }}
            />
            <br />
            <input
              type="text"
              name="noticeUpdatedBody"
              placeholder="내용"
              value={noticeUpdatedBody}
              onChange={(e) => {
                onupdateTitleOrBodyChange(e, setNoticeUpdatedBody);
              }}
            />
            <input type="submit" value="Update" />
          </form>
        </div>
      )}
    </>
  );
};

export default AdminNoticeUpdatePage;
