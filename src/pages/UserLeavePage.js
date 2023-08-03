import { useEffect, useState } from "react";
import UserLeaveText from "assets/UserLeaveText.txt";
import "styles/UserLeaveStyle.scss";
import { deleteAccount, getUserOrderRemain } from "functions/UserFunction";
import { authService } from "fbase";
import PopUpWithOneButtonsWidgets from "widgets/PopUpWithOneButtonWidgets";
import { useNavigate } from "react-router-dom";
import { OrderConfirmListRouteName } from "routes/RouteName";

const UserLeavePage = ({ userObject }) => {
  const [userLeaveText, setUserLeaveText] = useState();
  const navigate = useNavigate();
  const [isDeleteAccountClicked, setIsDeleteAccountClicked] = useState(false);
  useEffect(() => {
    fetch(UserLeaveText)
      .then((result) => result.text())
      .then((text) => setUserLeaveText(text));
  }, []);

  return (
    <>
      {isDeleteAccountClicked ? (
        <PopUpWithOneButtonsWidgets
          headerText={
            "회원탈퇴가 불가합니다! 주문예약이 진행 중인 상태에서 회원탈퇴가 어렵습니다."
          }
          buttonText={"돌아가기"}
          themeColor={"#5A91FF"}
          onClickFuncButton={() => setIsDeleteAccountClicked(false)}
        />
      ) : null}
      {userLeaveText === null ? (
        "Loading"
      ) : (
        <div id="userLeavePage-background">
          <div id="userLeavePage-container">
            <div id="userLeavePage-contents">
              <span id="title">회원탈퇴</span>
              <span id="content">{userLeaveText}</span>
              <button
                id="button"
                onClick={async (e) => {
                  if ((await getUserOrderRemain(userObject.uid)) === 0) {
                    deleteAccount();
                  } else {
                    setIsDeleteAccountClicked(true);
                  }
                }}>
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
