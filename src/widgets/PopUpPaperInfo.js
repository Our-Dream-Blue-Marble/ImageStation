import "styles/PopUpPaperInfoStyle.scss";

export function PopUpPaperInfo(isPaperInfoPopUp, getPaperInfoPopUp) {
  return (
    <>
      {isPaperInfoPopUp ? (
        <div className="PopUpBackGround">
          <div className="PopUpPaperInfoWholeContainer">
            <p className="PaperInfoPopUptitle">
              무슨 종이를 쓸지 고민이 되나요?
            </p>
            <div className="PaperInfoContainer">
              <div className="EachInfoContainer">
                <label className="PaperInfo1">
                  <p>몽블랑</p>
                  <p className="Thickness">
                    220gm<sup>2</sup>
                  </p>
                </label>
                <div className="sizeInfo">최대크기A3</div>
                <div className="detailInfo">
                  높은 백색도로 종이가 화사한 특징
                </div>
              </div>
              <div className="EachInfoContainer">
                <label className="PaperInfo1">
                  <p>랑데부</p>
                  <p className="Thickness">
                    210gm<sup>2</sup>
                  </p>
                </label>
                <div className="sizeInfo">최대크기A3</div>
                <div className="detailInfo">
                  명함용지로 자주 쓰이는 종이로 높은 백색도로 종이가 화사한 특징
                </div>
              </div>
              <div className="EachInfoContainer">
                <label className="PaperInfo1">
                  <p>스노우지</p>
                  <p className="Thickness">
                    200g/m<sup>2</sup>&nbsp;&nbsp;120gm<sup>2</sup>
                  </p>
                </label>
                <div className="sizeInfo">최대크기A3</div>
                <div className="detailInfo">
                  명함용지로 자주 쓰이는 종이로 높은 백색도로 종이가 화사한 특징
                </div>
              </div>
              <div className="EachInfoContainer">
                <label className="PaperInfo1">
                  <p>마쉬멜로우</p>
                  <p className="Thickness">
                    209gm<sup>2</sup>
                  </p>
                </label>
                <div className="sizeInfo">최대크기A3</div>
                <div className="detailInfo">
                  명함용지로 자주 쓰이는 종이로 높은 백색도로 종이가 화사한 특징
                </div>
              </div>
              <div className="EachInfoContainer">
                <label className="PaperInfo1">
                  <p>아트지</p>
                  <p className="Thickness">
                    220gm<sup>2</sup>
                  </p>
                </label>
                <div className="sizeInfo">최대크기A3</div>
                <div className="detailInfo">
                  명함용지로 자주 쓰이는 종이로 높은 백색도로 종이가 화사한 특징
                </div>
              </div>
              <div className="EachInfoContainer">
                <label className="PaperInfo1">
                  <p>모조지</p>
                  <p className="Thickness">
                    220gm<sup>2</sup>
                  </p>
                </label>
                <div className="sizeInfo">최대크기A3</div>
                <div className="detailInfo">
                  명함용지로 자주 쓰이는 종이로 높은 백색도로 종이가 화사한 특징
                </div>
              </div>
              <div className="EachInfoContainer">
                <label className="PaperInfo1">
                  <p>색지</p>
                  <p className="Thickness">
                    220gm<sup>2</sup>
                  </p>
                </label>
                <div className="sizeInfo">최대크기A4</div>
                <div className="detailInfo">
                  명함용지로 자주 쓰이는 종이로 높은 백색도로 종이가 화사한 특징
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
