import React, { useState } from "react";
import {
  onAdminWriteNewNoticeSubmit,
  onNoticeAttachmentChange,
  onPostTitleOrBodyChange,
} from "functions/NoticeFunction";

import "styles/AdminNoticeWriteStyle.scss";

import { useLocation, useNavigate } from "react-router-dom";

const AdminNoticeWritePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const dataOfNotice = location.state.data;
  var newNoticeId;
  const [noticeAttachment, setNoticeAttachment] = useState("");
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
            "writer",
            noticeAttachment
          ).then((result) => {
            if (result) {
              navigate(`${process.env.PUBLIC_URL}/notice/${newNoticeId}`);
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
            placeholder="제목을 입력하세요               "
            maxLength={200}
          />
          <input
            className="noticeWriteFileChoose"
            type="file"
            onChange={(e) => {
              onNoticeAttachmentChange(e, setNoticeAttachment);
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
            placeholder="게시글을 입력하세요"
            maxLength={2500}
          />
        </div>
        <div>
          <input className="noticeWriteSaveBtn" type="submit" value="올리기" />
        </div>
      </form>
    </div>
  );
};

export default AdminNoticeWritePage;
