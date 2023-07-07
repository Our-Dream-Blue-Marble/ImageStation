import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import { async } from "q";
import {
  onAdminWriteNewNoticeSubmit,
  onPostBodyChange,
  onPostTitleChange,
  setNewNoticeInList,
} from "functions/NoticeFunction";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { NoticeViewRouteName } from "routes/RouteName";

const AdminNoticeWritePage = (noticeListLength) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const dataOfNotice = location.state.data;
  const newNoticeId = (parseInt(dataOfNotice.id) + 1).toString();

  return (
    <div>
      {console.log(newNoticeId)}
      <form
        onSubmit={async (e) => {
          onAdminWriteNewNoticeSubmit(
            e,
            newNoticeId,
            postTitle,
            postBody,
            "writer"
          );
          navigate(`${process.env.PUBLIC_URL}/notice/${newNoticeId}`);
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
