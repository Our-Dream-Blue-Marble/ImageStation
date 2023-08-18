import "styles/PopUpWithTwoButtonsWidgets.scss";

const PopUpWithTwoButtonsWidgets = ({
  headerText,
  bodyText,
  leftButtonText,
  rightButtonText,
  isPrimaryColor,
  onClickLeftFunction,
  onClickRightFunction,
}) => {
  return (
    <div className="PopUpWithTwoButtonsWidgets">
      <div className="container">
        <div
          className={
            isPrimaryColor ? "header-text-primary" : "header-text-not-primary"
          }
        >
          {headerText}
        </div>
        <div className="body-text">{bodyText}</div>
        <div className="buttons">
          <button className="button-left" onClick={onClickLeftFunction}>
            {leftButtonText}
          </button>
          <button
            className={
              isPrimaryColor
                ? "button-right-primary"
                : "button-right-not-primary"
            }
            onClick={onClickRightFunction}
          >
            {rightButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpWithTwoButtonsWidgets;
