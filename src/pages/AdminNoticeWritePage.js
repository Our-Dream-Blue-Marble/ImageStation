import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import { async } from "q";

const AdminNoticeWritePage = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const onSubmit = async (event) => {
    if (postTitle === "" || postBody === "") {
      return;
    }
    event.preventDefault();

    await dbService.collection("notice").add({
      title: postTitle,
      body: postBody,
      data: Date.now(),
      writer: "admin",
    });
    setPostTitle("");
    setPostBody("");
  };

  const onChange = (event) => {
    const {
      target: { title, body },
    } = event;
    setPostTitle(title);
    setPostBody(body);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          title={postTitle}
          onChange={onChange}
          type="text"
          placeholder="제목을 입력하세요"
          maxLength={120}
        />
        <input type="submit" />
      </form>
      <br />
      <form onSubmit={onSubmit}>
        <input
          body={postBody}
          onChange={onChange}
          type="text"
          placeholder="게시글을 입력하세요"
          maxLength={2500}
        />
        <input type="submit" body="&rarr;" />
      </form>
    </div>
  );
};

export default AdminNoticeWritePage;
