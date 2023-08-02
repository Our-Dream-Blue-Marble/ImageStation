import "styles/PopUp.scss";

const PopUp = ({
  headerText,
  bodyText,
  leftButtonText,
  rightButtonText,
  themeColor,
}) => {
  return (
    <div className="popUpWidgets">
      <div className="popUpContainerWidgets">
        <div className="popUpHeaderTextWidgets" style={{ color: themeColor }}>
          {headerText}
        </div>
        <div className="popUpBodyTextWidgets">{bodyText}</div>
        <div className="popUpButtonWidgets">
          <button className="popUpLeftButtonWidgets">{leftButtonText}</button>
          <button
            className="popUpRightButtonWidgets"
            style={{ backgroundColor: themeColor }}>
            {rightButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
