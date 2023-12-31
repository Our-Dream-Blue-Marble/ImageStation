import { useEffect, useState } from "react";
import { ReactComponent as HomeDownIconAsset } from "assets/icons/HomeDownIconAsset.svg";
import { ReactComponent as LogoAsset } from "assets/LogoAsset.svg";
import NoticeListPage from "./NoticeListPage";
import PopUpAgreeInfoWidget from "widgets/PopUpAgreeInfoWidget";
import "styles/HomeStyle.scss";

const HomePage = ({ elementRef }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  const [isUsingInfoClicked, setIsUsingInfoClicked] = useState(false);
  const [isPersonalInfoClicked, setIsPersonalInfoClicked] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  });

  const scrollToNotice = () => {
    window.scroll({
      top: 700,
      behavior: "smooth",
    });
  };

  return (
    <>
      {(isUsingInfoClicked || isPersonalInfoClicked) && (
        <PopUpAgreeInfoWidget
          isAgreePopUp={false}
          onClickBackgroundFuction={(e) => {
            setIsUsingInfoClicked(false);
            setIsPersonalInfoClicked(false);
          }}
          isShowPersonalInfo={isPersonalInfoClicked}
          onClickButtonFuction={(e) => {
            setIsUsingInfoClicked(false);
            setIsPersonalInfoClicked(false);
          }}
        />
      )}

      <div className="HomeLayout">
        <div className="HomeStyle">
          <div className="HomeBackground">
            <div className="Title">이미지 솔루션을 온라인 예약으로</div>
            <div className="SubTitle">
              몇번의 클릭으로 어느 곳에서 쉽고 빠른 프린팅 경험을 제공합니다.
            </div>
            <div className="ButtonText">
              이미지 솔루션의 소식을 듣고 싶나요?
            </div>
            <button className="ButtonIcon" onClick={scrollToNotice}>
              <HomeDownIconAsset />
            </button>
          </div>
        </div>
        <div className="NoticeLayout">
          {scrollPosition > 200 ? (
            <NoticeListPage />
          ) : (
            <div className="noticeEmptyLayout" />
          )}
        </div>
        <footer>
          <div className="footer-container">
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
            <hr id="footer-line" />
            <div className="policies-container">
              <div>Created by CRA</div>
              <div className="policies">
                <div onClick={() => setIsUsingInfoClicked(true)}>이용약관</div>
                <hr />
                <div onClick={() => setIsPersonalInfoClicked(true)}>
                  개인정보처리방침
                </div>
                <hr />
                <a href="mailto:imagesolution.cra@gmail.com?subject=Image Solution 서버관련 메일&body=답장을 받으실 메일주소와 관련 문의사항을 남겨주세요">
                  개발자문의
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
