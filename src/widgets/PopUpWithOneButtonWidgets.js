import "styles/PopUpWithOneButtonsWidgets.scss";

const PopUpWithOneButtonsWidgets = ({
  headerText,
  bodyText,
  buttonText,
  isPrimaryColor,
  onClickBackgroundFunction,
  onClickFunction,
}) => {
  return (
    <div
      className="popUpWithOneButtonsWidgets"
      onClick={onClickBackgroundFunction}>
      <div className="container">
        <div
          className={
            isPrimaryColor ? "header-text-primary" : "header-text-not-primary"
          }>
          {headerText}
        </div>
        <div className="body-text">{bodyText}</div>
        <button
          className={isPrimaryColor ? "button-primary" : "button-not-primary"}
          onClick={onClickFunction}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default PopUpWithOneButtonsWidgets;
