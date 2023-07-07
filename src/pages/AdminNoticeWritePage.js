import React, { useState, useEffect } from "react";
import {
  onAdminWriteNewNoticeSubmit,
  onNoticeFileChange,
  onPostBodyChange,
  onPostTitleChange,
} from "functions/NoticeFunction";

import "styles/AdminNoticeWriteStyle.scss";

import { useLocation, useNavigate } from "react-router-dom";

const AdminNoticeWritePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const dataOfNotice = location.state.data;
  const newNoticeId = (parseInt(dataOfNotice.id) + 1).toString();
  const [noticeAttachment, setNoticeAttachment] = useState("");

  return (
    <div>
      <form
        onSubmit={async (e) => {
          onAdminWriteNewNoticeSubmit(
            e,
            newNoticeId,
            postTitle,
            postBody,
            "writer",
            noticeAttachment,
            setPostTitle,
            setPostBody,
            setNoticeAttachment
          ).then((result) => {
            if (result) {
              navigate(`${process.env.PUBLIC_URL}/notice/${newNoticeId}`);
            }
          });
        }}
      >
        <input
          title={postTitle}
          onChange={async (e) => {
            onPostTitleChange(e, setPostTitle);
          }}
          type="text"
          placeholder="제목을 입력하세요"
          maxLength={120}
        />
        <br />

        <input
          body={postBody}
          onChange={async (e) => {
            onPostBodyChange(e, setPostBody);
          }}
          type="text"
          placeholder="게시글을 입력하세요"
          maxLength={2500}
          size="50"
        />

        <br />

        <span>사진을 첨부하세요</span>
        <input
          type="file"
          onChange={(e) => {
            onNoticeFileChange(e, setNoticeAttachment);
          }}
        />
        <input className="saveButton" type="submit" value="SAVE" />
      </form>
    </div>
  );
};

export default AdminNoticeWritePage;
