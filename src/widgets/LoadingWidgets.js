import Loading from "assets/Loading.gif";

const LoadingWidgets = () => {
  return (
    <div className="LoadingBackGround">
      <div className="GifContainer">
        <img src={Loading} className="LoadingGif" />
      </div>
    </div>
  );
};
export default LoadingWidgets;
