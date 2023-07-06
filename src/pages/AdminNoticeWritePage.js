import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import { async } from "q";
import {
  onAdminWriteNewNoticeSubmit,
  onPostBodyChange,
  onPostTitleChange,
  setNewNoticeInList,
} from "functions/NoticeFunction";
import { useNavigate, useParams } from "react-router-dom";
import { NoticeViewRouteName } from "routes/RouteName";

const AdminNoticeWritePage = (noticeListLength) => {
  const navigate = useNavigate();
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  return (
    <div>
      <form
        onSubmit={async (e) => {
          onAdminWriteNewNoticeSubmit(e, "id", postTitle, postBody, "writer");
          navigate(`${process.env.PUBLIC_URL}/notice/id`);
        }}>
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
        <input type="submit" value="SAVE" />
      </form>
    </div>
  );
};

export default AdminNoticeWritePage;
