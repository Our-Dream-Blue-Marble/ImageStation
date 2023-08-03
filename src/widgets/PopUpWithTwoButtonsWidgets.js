import "styles/PopUpWithTwoButtonsWidgets.scss";

const PopUpWithTwoButtonsWidgets = ({
  headerText,
  bodyText,
  leftButtonText,
  rightButtonText,
  themeColor,
}) => {
  return (
    <div className="popUpWithTwoButtonsWidgets">
      <div className="popUpWithTwoButtonsContainerWidgets">
        <div
          className="popUpWithTwoButtonsHeaderTextWidgets"
          style={{ color: themeColor }}>
          {headerText}
        </div>
        <div className="popUpWithTwoButtonsBodyTextWidgets">{bodyText}</div>
        <div className="popUpWithTwoButtonsButtonWidgets">
          <button className="popUpWithTwoButtonsLeftButtonWidgets">
            {leftButtonText}
          </button>
          <button
            className="popUpWithTwoButtonsRightButtonWidgets"
            style={{ backgroundColor: themeColor }}>
            {rightButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpWithTwoButtonsWidgets;
