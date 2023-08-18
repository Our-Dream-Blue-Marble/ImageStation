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
                  높은 백색도로 화사함을 느낄 수 있으며, 인쇄 선명성이 매우
                  뛰어나 생생한 비쥬얼 표현에 적합한 용지
                </div>
              </div>
              <div className="EachInfoContainer">
                <label className="PaperInfo1">
                  <p>랑데뷰</p>
                  <p className="Thickness">210g/m{"\xB2"}</p>
                </label>
                <div className="sizeInfo">최대크기A3</div>
                <div className="detailInfo">
                  질감과 터치감있는 표면으로 인쇄물에서 고급스러움이 묻어나는
                  용지
                </div>
              </div>
              <div className="EachInfoContainer">
                <label className="PaperInfo1">
                  <p>스노우지</p>
                  <p className="Thickness">
                    200g/m{"\xB2"}&nbsp;&nbsp;120g/m{"\xB2"}
                  </p>
                </label>
                <div className="sizeInfo">최대크기A3</div>
                <div className="detailInfo">
                  무광처리로 은은한 멋이 있는 고급 용지
                </div>
              </div>
              <div className="EachInfoContainer">
                <label className="PaperInfo1">
                  <p>마쉬멜로우</p>
                  <p className="Thickness">209g/m{"\xB2"}</p>
                </label>
                <div className="sizeInfo">최대크기A3</div>
                <div className="detailInfo">
                  실크처럼 매끄럽고 고운 표면으로 잉크 점착성이 우수한 용지
                </div>
              </div>
              <div className="EachInfoContainer">
                <label className="PaperInfo1">
                  <p>아트지</p>
                  <p className="Thickness">220g/m{"\xB2"}</p>
                </label>
                <div className="sizeInfo">최대크기A3</div>
                <div className="detailInfo">
                  광택이 나며 고급스러움을 나타낼 때 적합한 용지
                </div>
              </div>
              <div className="EachInfoContainer">
                <label className="PaperInfo1">
                  <p>모조지</p>
                  <p className="Thickness">220g/m{"\xB2"}</p>
                </label>
                <div className="sizeInfo">최대크기A3</div>
                <div className="detailInfo">흔히 사용되는 A4 복사용지</div>
              </div>
              <div className="EachInfoContainer">
                <label className="PaperInfo1">
                  <p>색지</p>
                  <p className="Thickness">220g/m{"\xB2"}</p>
                </label>
                <div className="sizeInfo">최대크기A4</div>
                <div className="detailInfo">선명한 색을 갖고있는 용지</div>
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
