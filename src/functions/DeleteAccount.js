import React from "react";
import { authService } from "fbase";
import { deleteUser } from "@firebase/auth";

const DeleteAccount = () => {
  const IsConfirmDelteAcocunt = window.confirm("해당 계정을 삭제하시겠습니까?");

  if (!IsConfirmDelteAcocunt) return;
  else {
    deleteUser(authService.currentUser);
    window.confirm("삭제를 완료하였습니다.");
  }
};

export default DeleteAccount;
