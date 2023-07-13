import { scrollToSection } from "functions/AppFunction";
import { ReactComponent as HomeDownIconAsset } from "assets/icons/HomeDownIconAsset.svg";
import "styles/HomeStyle.scss";

const HomePage = ({ elementRef }) => {
  return (
    <div className="Home" id="Home">
      <span className="Home Title">이미지스테이션을 온라인 예약으로</span>
      <span className="Home SubTitle">
        몇번의 클릭으로 어느 곳에서 쉽고 빠른 프린팅 경험을 제공합니다.
      </span>
      <span className="Home ButtonText">
        이미지스테이션의 소식을 듣고 싶나요?
      </span>
      <button
        className="Home ButtonIcon"
        onClick={() => scrollToSection(elementRef)}
      >
        <HomeDownIconAsset />
      </button>
    </div>
  );
};

export default HomePage;
