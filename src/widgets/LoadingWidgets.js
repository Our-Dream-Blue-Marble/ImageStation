import "styles/LoadingStyle.scss";
import Loading from "assets/Loading.gif";

const LoadingWidgets = () => {
  return (
    <div className="LoadingBackGround">
      <div className="GifContainer">
        <img src={Loading} className="LoadingGif" />
      </div>
      <div className="LoadingText">L O A D I N G</div>
    </div>
  );
};
export default LoadingWidgets;
