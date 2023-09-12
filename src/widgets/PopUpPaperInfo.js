import "styles/PopUpPaperInfoStyle.scss";

export function PopUpPaperInfo(isPaperInfoPopUp, getPaperInfoPopUp) {
  return (
    <>
      {isPaperInfoPopUp ? (
        <div className="PopUpBackGround" onClick={getPaperInfoPopUp}>
          <div className="PopUpPaperInfoWholeContainer">
            <p className="PaperInfoPopUptitle">
              무슨 종이를 쓸지 고민이 되나요?
            </p>
            <div className="PaperInfoContainer">
              <div className="EachInfoContainer">
                <label className="PaperInfo1">
                  <p>몽블랑</p>
                  <p className="Thickness">220g/m{"\xB2"}</p>
                </label>
                <div className="sizeInfo">최대크기A3</div>
                <div className="detailInfo">
                  특유의 자연스럽고 촉촉한 질감이 특징이며, 잉크 건조성이 매우
                  뛰어나 생생한 비쥬얼 표현에 적합한 고급 용지.
                </div>
              </div>
              <div className="EachInfoContainer">
                <label className="PaperInfo1">
                  <p>랑데뷰</p>
                  <p className="Thickness">210g/m{"\xB2"}</p>
                </label>
                <div className="sizeInfo">최대크기A3</div>
                <div className="detailInfo">
                  부드러운 감촉, 두터운 느낌, 그리고 건조성이 뛰어난 고급지로서,
                  높은 퀄리티를 요구하는 인쇄물에 적합한 용지.
                </div>
              </div>
              <div className="EachInfoContainer">
                <label className="PaperInfo1">
                  <p>스노우지</p>
                  <p className="Thickness">
                    120g/m{"\xB2"}&nbsp;&nbsp;220g/m{"\xB2"}
                  </p>
                </label>
                <div className="sizeInfo">최대크기A3</div>
                <div className="detailInfo">
                  광택이 나는 아트지와는 상반되게 차분한 느낌을 내는
                  무광택지이며, 백감도와 인쇄광택이 탁월함.
                </div>
              </div>
              <div className="EachInfoContainer">
                <label className="PaperInfo1">
                  <p>마쉬멜로우</p>
                  <p className="Thickness">209g/m{"\xB2"}</p>
                </label>
                <div className="sizeInfo">최대크기A3</div>
                <div className="detailInfo">
                  매끈한 표면의 종이질감으로서, 랑데뷰와 비교하여 종이질감을
                  드러내지 않는 것을 선호하는 경우 사용되는 용지.
                </div>
              </div>
              <div className="EachInfoContainer">
                <label className="PaperInfo1">
                  <p>아트지</p>
                  <p className="Thickness">150g/m{"\xB2"}</p>
                </label>
                <div className="sizeInfo">최대크기A3</div>
                <div className="detailInfo">
                  밝은 순백색의 광택 프리미엄 용지이며,카달로그, 팜플렛, 포스터,
                  전단지 등의 인쇄물에 주로 사용됨.
                </div>
              </div>
              <div className="EachInfoContainer">
                <label className="PaperInfo1">
                  <p>모조지</p>
                  <p className="Thickness">
                    80g/m{"\xB2"} 100g/m{"\xB2"} 120g/m{"\xB2"} 150g/m{"\xB2"}
                  </p>
                </label>
                <div className="sizeInfo">최대크기A3</div>
                <div className="detailInfo">
                  흔히 사용되는 A4 사이즈의 용지이며, 주로 서적 인쇄의 본문
                  용지로 사용됨.
                </div>
              </div>
              <div className="EachInfoContainer">
                <label className="PaperInfo1">
                  <p>색지</p>
                  <p className="Thickness">
                    80g/m{"\xB2"} 100g/m{"\xB2"} 120g/m{"\xB2"} 150g/m{"\xB2"}
                  </p>
                </label>
                <div className="sizeInfo">최대크기A4</div>
                <div className="detailInfo">
                  모조지에 미색 염로를 첨가하고 무광 처리한 용지로서, 출판물의
                  본문용지로 사용됨.
                </div>
              </div>
              <footer>
                <button className="closedButton" onClick={getPaperInfoPopUp}>
                  돌아가기
                </button>
              </footer>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
