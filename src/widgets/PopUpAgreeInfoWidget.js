import "styles/PopUpPaperInfoStyle.scss";
import PersonalInfoText from "assets/PersonalInfoText.txt";
import UsingInfoText from "assets/UsingInfoText.txt";
import { useEffect, useState } from "react";

const PopUpAgreeInfoWidget = ({
  isAgreePopUp,
  onClickBackgroundFuction,
  isShowPersonalInfo,
  onClickButtonFuction,
}) => {
  const [personalInfoText, setPersonalInfoText] = useState(false);
  const [usingInfoText, setUsingInfoText] = useState(false);

  useEffect(() => {
    fetch(PersonalInfoText)
      .then((result) => result.text())
      .then((text) => setPersonalInfoText(text));

    fetch(UsingInfoText)
      .then((result) => result.text())
      .then((text) => setUsingInfoText(text));
  });

  return (
    <>
      <div
        id={
          isAgreePopUp ? "info-popUp-background" : "info-back-popUp-background"
        }
        onClick={onClickBackgroundFuction}></div>
      <div id="info-popUp-container">
        <div id="info-popUp-title">
          {isShowPersonalInfo && "개인정보처리방침"}
          {!isShowPersonalInfo && "이용약관"}
        </div>
        <div id="info-popUp-context">
          {isShowPersonalInfo && personalInfoText}
          {!isShowPersonalInfo && usingInfoText}
        </div>
        {isAgreePopUp ? (
          <button id="info-popUp-agree-button" onClick={onClickButtonFuction}>
            동의
          </button>
        ) : (
          <button id="info-popUp-back-button" onClick={onClickButtonFuction}>
            닫기
          </button>
        )}
      </div>
    </>
  );
};

export default PopUpAgreeInfoWidget;
