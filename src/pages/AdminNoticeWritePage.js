import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import { async } from "q";
import {
  onAdminWriteNewNoticeSubmit,
  setNewNoticeInList,
} from "functions/NoticeFunction";

const AdminNoticeWritePage = (noticeListLength) => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const onPostTitleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPostTitle(value);
  };
  const onPostBodyChange = (event) => {
    const {
      target: { value },
    } = event;
    setPostBody(value);
  };

  return (
    <div>
      <form
        onSubmit={async (e) => {
          onAdminWriteNewNoticeSubmit(e, "id", postTitle, postBody, "writer");
        }}>
        <input
          title={postTitle}
          onChange={onPostTitleChange}
          type="text"
          placeholder="제목을 입력하세요"
          maxLength={120}
        />
        <br />

        <input
          body={postBody}
          onChange={onPostBodyChange}
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
