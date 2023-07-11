import {
  onNoticeAttachmentChange,
  onUpdateTitleOrBodyChange,
  onUpdatedNoticeSubmit,
} from "functions/NoticeFunction";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NoticeListRouteName } from "routes/RouteName";
import "styles/AdminNoticeUpdateStyle.scss";

const AdminNoticeUpdatePage = () => {
  const location = useLocation();
  const currentNoticeObj = location.state.data;
  const [noticeUpdatedTitle, setNoticeUpdatedTitle] = useState(
    location.state.data.title
  );
  const [noticeUpdatedBody, setNoticeUpdatedBody] = useState(
    location.state.data.body
  );
  const [noticeUpdatedAttachment, setNoticeupdatedAttachment] = useState(
    location.state.data.attachment
  );
  const navigate = useNavigate();

  return (
    <div className="noticeUpdatelayout">
      {currentNoticeObj === null ? (
        <>Loading...</>
      ) : (
        <div>
          <form
            onSubmit={(e) => {
              onUpdatedNoticeSubmit(
                e,
                currentNoticeObj.id,
                noticeUpdatedTitle,
                noticeUpdatedBody,
                currentNoticeObj.writer,
                currentNoticeObj.date,
                currentNoticeObj.view,
                noticeUpdatedAttachment
              );
              navigate(`${NoticeListRouteName}/${currentNoticeObj.id}`);
            }}
            className="container sweetEdit"
          >
            <div className="updateContainer">
              <input
                className="noticeUpdateTitleTextBox"
                type="text"
                name="noticeUpdatedTitle"
                placeholder="제목"
                value={noticeUpdatedTitle}
                onChange={(e) => {
                  onUpdateTitleOrBodyChange(e, setNoticeUpdatedTitle);
                }}
              />
              <input
                className="noticeUpeateFileChoose"
                type="file"
                onChange={(e) => {
                  onNoticeAttachmentChange(e, setNoticeupdatedAttachment);
                }}
              />

              <textarea
                className="noticeUpdateBodyTextBox"
                type="text"
                name="noticeUpdatedBody"
                placeholder="내용"
                value={noticeUpdatedBody}
                onChange={(e) => {
                  onUpdateTitleOrBodyChange(e, setNoticeUpdatedBody);
                }}
              />
            </div>
            <div>
              <input
                className="noticeUpdateSaveBtn"
                type="submit"
                value="수정완료"
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminNoticeUpdatePage;
