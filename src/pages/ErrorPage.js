import "styles/ErrorStyles.scss";
const ErrorPage = () => {
  return (
    <div className="ErrorPageLayout">
      <div className="ErrorPageHeaderText">페이지를 찾을 수 없습니다. </div>
      <div className="ErrorPageBodyText">
        페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.
      </div>
    </div>
  );
};

export default ErrorPage;
