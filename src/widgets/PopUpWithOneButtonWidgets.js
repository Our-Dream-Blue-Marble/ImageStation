import "styles/PopUpWithOneButtonsWidgets.scss";

const PopUpWithOneButtonsWidgets = ({ headerText, buttonText, themeColor }) => {
  return (
    <div className="popUpWithOneButtonsWidgets">
      <div className="popUpWithOneButtonsContainerWidgets">
        <div
          className="popUpWithOneButtonsHeaderTextWidgets"
          style={{ color: themeColor }}>
          {headerText}
        </div>
        <button className="popUpWithOneButtonsBtnWidgets">{buttonText}</button>
      </div>
    </div>
  );
};

export default PopUpWithOneButtonsWidgets;
