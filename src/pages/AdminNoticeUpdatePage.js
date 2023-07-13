import {
  onNoticeAttachmentChange,
  onUpdateTitleOrBodyChange,
  onUpdatedNoticeSubmit,
} from "functions/NoticeFunction";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const [noticeUpdatedAttachmentName, setNoticeupdatedAttachmentName] =
    useState(location.state.data.attachmentName);
  const [isSubmitButton, setIsSubmitButton] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="noticeUpdateLayout">
      {currentNoticeObj === null ? (
        <>Loading...</>
      ) : (
        <div>
          <form
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
              if (isSubmitButton === true) {
                onUpdatedNoticeSubmit(
                  e,
                  currentNoticeObj.id,
                  noticeUpdatedTitle,
                  noticeUpdatedBody,
                  currentNoticeObj.writer,
                  currentNoticeObj.date,
                  currentNoticeObj.view,
                  noticeUpdatedAttachment,
                  noticeUpdatedAttachmentName
                ).then((result) => {
                  if (result) {
                    navigate(-1, { replace: true });
                  }
                });
              } else {
                navigate(-1, { replace: true });
              }
            }}>
            <div className="updateContainer">
              <input
                className="noticeUpdateTitleTextBox"
                type="text"
                name="noticeUpdatedTitle"
                placeholder="제목을 입력하세요"
                value={noticeUpdatedTitle}
                onChange={(e) => {
                  onUpdateTitleOrBodyChange(e, setNoticeUpdatedTitle);
                }}
              />
              <input
                className="noticeUpdateFileChoose"
                type="file"
                onChange={(e) => {
                  onNoticeAttachmentChange(
                    e,
                    setNoticeupdatedAttachment,
                    setNoticeupdatedAttachmentName
                  );
                }}
              />

              <textarea
                className="noticeUpdateBodyTextBox"
                type="text"
                name="noticeUpdatedBody"
                placeholder="게시글을 입력하세요."
                value={noticeUpdatedBody}
                onChange={(e) => {
                  onUpdateTitleOrBodyChange(e, setNoticeUpdatedBody);
                }}
              />
            </div>
            <div id="noticeUpdateBtns">
              <button
                id="noticeUpdateCancelBtn"
                name="cancel"
                onClick={(e) => {
                  setIsSubmitButton(false);
                }}>
                취소하기
              </button>
              <input
                id="noticeUpdateSaveBtn"
                type="submit"
                value="올리기"
                onClick={(e) => {
                  setIsSubmitButton(true);
                }}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminNoticeUpdatePage;
