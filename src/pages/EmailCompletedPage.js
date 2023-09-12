import { useNavigate } from "react-router-dom";
import { HomeRouteName } from "routes/RouteName";
import EmailCompletedAsset from "assets/EmailCompletedAsset.png";
import "styles/EmailCompletedStyle.scss";

const EmailCompletedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="emailCompleted-background">
      <div className="emailCompleted-container">
        <span id="emailCompleted-title">인증이 완료되었습니다!</span>
        <div id="emailCompleted-gif">
          <img src={EmailCompletedAsset} />
        </div>
        <button
          id="emailCompleted-button"
          onClick={(e) => {
            navigate(HomeRouteName);
          }}
        >
          시작하기
        </button>
      </div>
    </div>
  );
};

export default EmailCompletedPage;
