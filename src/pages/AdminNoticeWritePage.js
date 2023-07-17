import React, { useEffect, useState } from "react";
import {
  onAdminWriteNewNoticeSubmit,
  onNoticeAttachmentChange,
  onPostTitleOrBodyChange,
} from "functions/NoticeFunction";
import { useLocation, useNavigate } from "react-router-dom";
import { NoticeListRouteName } from "routes/RouteName";
import "styles/AdminNoticeWriteStyle.scss";

const AdminNoticeWritePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const dataOfNotice = location.state.data;
  var newNoticeId;
  const [noticeAttachment, setNoticeAttachment] = useState("");
  const [noticeAttachmentName, setNoticeAttachmentName] = useState("");
  const [isSubmitButton, setIsSubmitButton] = useState(false);
  const [isPossibleSubmit, setIsPossibleSubmit] = useState(false);

  if (dataOfNotice) {
    newNoticeId = (parseInt(dataOfNotice.id) + 1).toString();
  } else {
    newNoticeId = "1";
  }

  useEffect(() => {
    if (postTitle !== "" && postBody !== "") {
      setIsPossibleSubmit(true);
    } else {
      setIsPossibleSubmit(false);
    }
  }, [postTitle, postBody]);

  return (
    <div className="noticeWriteLayout">
      <form
        method="POST"
        onSubmit={async (e) => {
          e.preventDefault();
          if (isSubmitButton === true) {
            onAdminWriteNewNoticeSubmit(
              e,
              newNoticeId,
              postTitle,
              postBody,
              "사장님",
              noticeAttachment,
              noticeAttachmentName
            ).then((result) => {
              if (result) {
                navigate(`${NoticeListRouteName}/${newNoticeId}`, {
                  state: { data: null },
                  replace: true,
                });
              }
            });
          } else {
            navigate(NoticeListRouteName, { replace: true });
          }
        }}>
        <div className="writeContainer">
          <input
            className="noticeTitleTextBox"
            title={postTitle}
            onChange={async (e) => {
              onPostTitleOrBodyChange(e, setPostTitle);
            }}
            type="text"
            placeholder="제목을 입력하세요"
            maxLength={200}
          />
          <input
            className="noticeWriteFileChoose"
            type="file"
            onChange={(e) => {
              onNoticeAttachmentChange(
                e,
                setNoticeAttachment,
                setNoticeAttachmentName
              );
            }}
          />

          <textarea
            className="noticeBodyTextBox"
            body={postBody.split("\n").map((line) => {
              return (
                <span>
                  {line}
                  <br />
                </span>
              );
            })}
            onChange={(e) => {
              onPostTitleOrBodyChange(e, setPostBody);
            }}
            type="text"
            placeholder="게시글을 입력하세요."
            maxLength={2500}
          />
        </div>
        <div className="noticeWriteBtns">
          <button
            className="noticeWriteCancelBtn"
            name="cancel"
            onClick={(e) => {
              setIsSubmitButton(false);
            }}>
            취소하기
          </button>
          <input
            className="noticeWriteSaveBtn"
            type={isPossibleSubmit ? "submit" : "button"}
            style={
              isPossibleSubmit
                ? { background: `rgba(90, 145, 255, 1)` }
                : { background: `rgba(33, 36, 39, 0.5)` }
            }
            value={"올리기"}
            onClick={(e) => {
              setIsSubmitButton(true);
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default AdminNoticeWritePage;
