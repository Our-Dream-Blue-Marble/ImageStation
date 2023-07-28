import { useEffect, useState } from "react";
import UserLeaveText from "assets/UserLeaveText.txt";
import "styles/UserLeaveStyle.scss";
import { deleteAccount } from "functions/UserFunction";

const UserLeavePage = () => {
  const [userLeaveText, setUserLeaveText] = useState();
  useEffect(() => {
    fetch(UserLeaveText)
      .then((result) => result.text())
      .then((text) => setUserLeaveText(text));
  }, []);

  return (
    <>
      {userLeaveText === null ? (
        "Loading"
      ) : (
        <div id="userLeavePage-background">
          <div id="userLeavePage-container">
            <div id="userLeavePage-contents">
              <span id="title">회원탈퇴</span>
              <span id="content">{userLeaveText}</span>
              <button id="button" onClick={(e) => deleteAccount()}>
                회원탈퇴
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserLeavePage;
