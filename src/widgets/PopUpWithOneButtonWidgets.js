import "styles/PopUpWithOneButtonsWidgets.scss";

const PopUpWithOneButtonsWidgets = ({
  headerText,
  bodyText,
  buttonText,
  themeColor,
  onClickFuncButton,
}) => {
  return (
    <div className="popUpWithOneButtonsWidgets">
      <div className="popUpWithOneButtonsContainerWidgets">
        <div
          className="popUpWithOneButtonsHeaderTextWidgets"
          style={{ color: themeColor }}>
          {headerText}
        </div>
        <div className="popUpWithOneButtonsBodyTextWidgets">{bodyText}</div>
        <button
          className="popUpWithOneButtonsBtnWidgets"
          onClick={onClickFuncButton}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default PopUpWithOneButtonsWidgets;
