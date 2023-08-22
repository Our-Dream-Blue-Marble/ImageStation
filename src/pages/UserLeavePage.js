import { useEffect, useState } from "react";
import UserLeaveText from "assets/UserLeaveText.txt";
import "styles/UserLeaveStyle.scss";
import { deleteAccount, getUserOrderRemain } from "functions/UserFunction";
import PopUpWithOneButtonsWidgets from "widgets/PopUpWithOneButtonWidgets";
import { useNavigate } from "react-router-dom";
import PopUpWithGifWidgets from "widgets/PopUpWithGifWidgets";
import PopUpWithTwoButtonsWidgets from "widgets/PopUpWithTwoButtonsWidgets";
import { HomeRouteName, UserLeaveRouteName } from "routes/RouteName";
import LoadingWidgets from "widgets/LoadingWidgets";

const UserLeavePage = ({ userObject }) => {
  const [userLeaveText, setUserLeaveText] = useState();
  const navigate = useNavigate();
  const [isDeleteAccountClicked, setIsDeleteAccountClicked] = useState(false);
  const [deleteAccountConfirmed, setDeleteAccountConfirmed] = useState(false);

  useEffect(() => {
    fetch(UserLeaveText)
      .then((result) => result.text())
      .then((text) => setUserLeaveText(text));
  }, []);

  return (
    <>
      <>
        {!userObject && (
          <PopUpWithOneButtonsWidgets
            headerText={"탈퇴되었습니다."}
            bodyText={"그동안 이미지스테이션을\n이용해주셔서 감사합니다."}
            buttonText={"홈"}
            isPrimaryColor={false}
            onClickFunction={() => {
              navigate(HomeRouteName, { replace: true });
            }}
          />
        )}
      </>
      <>
        {isDeleteAccountClicked && (
          <PopUpWithGifWidgets
            headingText={"회원탈퇴가 불가합니다!"}
            bodyText={" 주문예약이 진행 중인 상태에서 회원탈퇴가 어렵습니다."}
            buttonText={"돌아가기"}
            buttonFunction={() => {
              setIsDeleteAccountClicked(false);
            }}
          />
        )}
      </>
      <>
        {deleteAccountConfirmed && (
          <PopUpWithTwoButtonsWidgets
            headerText={"정말로 탈퇴하시겠습니까?"}
            bodyText={"삭제를 하면\n복구가 불가능합니다!"}
            leftButtonText={"취소"}
            rightButtonText={"탈퇴"}
            isPrimaryColor={false}
            onClickLeftFunction={() => {
              setDeleteAccountConfirmed(false);
            }}
            onClickRightFunction={async () => {
              await deleteAccount().then((result) => {
                window.location.replace(UserLeaveRouteName);
              });
            }}
          />
        )}
      </>

      {userLeaveText === null ? (
        <LoadingWidgets />
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
                    setDeleteAccountConfirmed(true);
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
