import { scrollToSection } from "functions/AppFunction";
import { ReactComponent as HomeDownIconAsset } from "assets/icons/HomeDownIconAsset.svg";
import "styles/HomeStyle.scss";
import NoticeListPage from "./NoticeListPage";
import { useEffect, useState } from "react";

const HomePage = ({ elementRef }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  });

  return (
    <div className="HomeLayout">
      <div className="HomeStyle">
        <div className="Title">이미지스테이션을 온라인 예약으로</div>
        <div className="SubTitle">
          몇번의 클릭으로 어느 곳에서 쉽고 빠른 프린팅 경험을 제공합니다.
        </div>
        <div className="ButtonText">이미지스테이션의 소식을 듣고 싶나요?</div>
        <button className="ButtonIcon">
          <HomeDownIconAsset />
        </button>
      </div>
      <div className="NoticeLayout">
        {scrollPosition > 200 ? <NoticeListPage /> : null}
      </div>
      <div className="footer" />
    </div>
  );
};

export default HomePage;
