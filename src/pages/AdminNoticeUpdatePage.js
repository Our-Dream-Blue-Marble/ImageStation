import {
  onUpdateTitleChange,
  onUpdatedNoticeSubmit,
  onupdateBodyChange,
} from "functions/NoticeFunction";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const AdminNoticeUpdatePage = () => {
  const location = useLocation();
  const currentNoticeObj = location.state.data;
  const [noticeUpdatedTitle, setNoticeUpdatedTitle] = useState("");
  const [noticeUpdatedBody, setNoticeUpdatedBody] = useState("");

  return (
    <>
      {currentNoticeObj === null ? (
        <>Loading...</>
      ) : (
        <div>
          no: {currentNoticeObj.id} <br />
          writer: {currentNoticeObj.writer} <br />
          <form
            onSubmit={async (e) => {
              onUpdatedNoticeSubmit(
                e,
                "id",
                noticeUpdatedTitle,
                noticeUpdatedBody,
                currentNoticeObj.writer,
                currentNoticeObj.date,
                currentNoticeObj.view
              );
            }}
            className="container sweetEdit">
            <input
              type="text"
              placeholder={currentNoticeObj.title}
              value={currentNoticeObj.title}
              autoFocus
              noticeUpdatedTitle
              onChange={async (e) => {
                onUpdateTitleChange(e, setNoticeUpdatedTitle);
              }}
            />
            <br />
            <input
              type="text"
              placholder={currentNoticeObj.body}
              value={currentNoticeObj.body}
              autoFocus
              onChange={(e) => {
                onupdateBodyChange(e, setNoticeUpdatedBody);
              }}
            />
            <input type="submit" value="Update" />
          </form>
          <br />
          body: {currentNoticeObj.body}
          <br />
        </div>
      )}
    </>
  );
};

export default AdminNoticeUpdatePage;
