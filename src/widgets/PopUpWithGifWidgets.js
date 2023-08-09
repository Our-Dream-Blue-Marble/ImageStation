import "styles/PopUpWithGifWidgets.scss";

const PopUpWithGifWidgets = ({
  headingText,
  bodyText,
  buttonText,
  buttonFunction,
}) => {
  return (
    <div className="PopUpWithGifWidgets">
      <div className="PopUpWithGifWidgetsContainer">
        <div className="PopUpWithGifWidgetsHeading">{headingText}</div>
        <div className="PopUpWithGifWidgetsGifContainer"></div>
        <div className="PopUpWithGifWidgetsBody">{bodyText}</div>
        <button className="PopUpWithGifWidgetsButton" onClick={buttonFunction}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default PopUpWithGifWidgets;
