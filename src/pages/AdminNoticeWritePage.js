import React, { useState } from "react";
import {
  onAdminWriteNewNoticeSubmit,
  onNoticeAttachmentChange,
  onPostTitleOrBodyChange,
} from "functions/NoticeFunction";

import "styles/AdminNoticeWriteStyle.scss";

import { useLocation, useNavigate } from "react-router-dom";
import { NoticeListRouteName } from "routes/RouteName";

const AdminNoticeWritePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const dataOfNotice = location.state.data;
  var newNoticeId;
  const [noticeAttachment, setNoticeAttachment] = useState("");
  const [noticeAttachmentName, setNoticeAttachmentName] = useState("");
  if (dataOfNotice) {
    newNoticeId = (parseInt(dataOfNotice.id) + 1).toString();
  } else {
    newNoticeId = "1";
  }

  return (
    <div className="noticeWriteLayout">
      <form
        onSubmit={async (e) => {
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
              navigate(`${NoticeListRouteName}/${newNoticeId}`);
            }
          });
        }}
      >
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
          <button id="noticeWriteCancelBtn" onClick={() => navigate(-1)}>
            취소하기
          </button>
          <input id="noticeWriteSaveBtn" type="submit" value="올리기" />
        </div>
      </form>
    </div>
  );
};

export default AdminNoticeWritePage;
