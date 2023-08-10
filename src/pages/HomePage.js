import { scrollToSection } from "functions/AppFunction";
import { ReactComponent as HomeDownIconAsset } from "assets/icons/HomeDownIconAsset.svg";
import "styles/HomeStyle.scss";
import NoticeListPage from "./NoticeListPage";
import { useEffect, useState } from "react";
import { ReactComponent as LogoAsset } from "assets/LogoAsset.svg";
import { ReactComponent as FooterPolicyAsset } from "assets/FooterPolicyAsset.svg";

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
        <button
          className="ButtonIcon"
          onClick={() => {
            window.scrollTo({
              top: 550,
              //behavior: "smooth",
            });
          }}
        >
          <HomeDownIconAsset />
        </button>
      </div>
      <div className="NoticeLayout">
        {scrollPosition > 200 ? <NoticeListPage /> : null}
      </div>
      <footer>
        <div className="contentContainer">
          <LogoAsset id="footerAsset" width={200} height={30} />
          <div className="address">
            경북 포항시 북구 흥해읍 한동로 558 한동대학교 37554
          </div>
          <div id="numbers">
            <div>Tel: 054-260-1960</div>
            <div>Fax: 054-260-1969</div>
            <div>Mobile: 010-7427-1173</div>
          </div>
          <div className="email">Email: imagesolution.hd@gmail.com</div>
          <hr id="FooterLine" />
          <div className="policiesContainer">
            <div>Created by CRA</div>
            <div className="policies">
              <div>이용약관</div>
              <FooterPolicyAsset className="footerAsset" />
              <div>개인정보처리방침</div>
              <FooterPolicyAsset className="footerAsset" />
              <div>개발자문의</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
