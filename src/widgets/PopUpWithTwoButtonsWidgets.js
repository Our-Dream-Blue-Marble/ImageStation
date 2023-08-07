import "styles/PopUpWithTwoButtonsWidgets.scss";

const PopUpWithTwoButtonsWidgets = ({
  headerText,
  bodyText,
  leftButtonText,
  rightButtonText,
  themeColor,
  leffButtonFunction,
  rightButtonFunction,
}) => {
  return (
    <div className="PopUpWithTwoButtonsWidgets">
      <div className="PopUpWithTwoButtonsContainerWidgets">
        <div
          className="popUpWithTwoButtonsHeaderTextWidgets"
          style={{ color: themeColor }}>
          {headerText}
        </div>
        <div className="popUpWithTwoButtonsBodyTextWidgets">{bodyText}</div>
        <div className="popUpWithTwoButtonsButtonWidgets">
          <button
            className="popUpWithTwoButtonsLeftButtonWidgets"
            onClick={leffButtonFunction}>
            {leftButtonText}
          </button>
          <button
            className="popUpWithTwoButtonsRightButtonWidgets"
            style={{ backgroundColor: themeColor }}
            onClick={rightButtonFunction}>
            {rightButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpWithTwoButtonsWidgets;
