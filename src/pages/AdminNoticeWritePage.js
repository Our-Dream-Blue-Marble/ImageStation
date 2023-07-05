import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import { async } from "q";
import { setNewNoticeInList } from "functions/NoticeFunction";

const AdminNoticeWritePage = (noticeListLength) => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    const newNoticeObj = {
      title: postTitle,
      body: postBody,
      date: Date.now(),
      writer: "image Station",
    };

    await dbService.collection("notices").add(newNoticeObj);
    setPostTitle("");
    setPostBody("");
  };

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
      <form onSubmit={onSubmit}>
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
