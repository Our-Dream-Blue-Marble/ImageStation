import "styles/PaperInfoStyle.scss";

const PaperInfoPage = () => {
  return (
    <div className="PaperInfoLayout">
      <div className="paperHead">
        <div className="PaperTitle">종이</div>
        <div className="PaperExplanation">
          더 특별한 인쇄 경험을 <br /> 다양한 종이를 통해 찾아보세요!
        </div>
      </div>
      <div className="PaperInfoContainer">
        <div className="paperCard">
          <div className="contentBox">
            <div className="beforeHoverContentBox">
              <div className="title">몽블랑</div>
              <div className="maxSize">최대크기 A3</div>
            </div>
            <div className="afterHoverContentBox">
              <div className="paperWeight">220g/m2</div>
              <div className="paperExplain">
                높은 백색도로 종이가 화사한 특징
              </div>
            </div>
          </div>
        </div>

        <div className="paperCard">
          <div className="contentBox">
            <div className="beforeHoverContentBox">
              <div className="title">랑데부</div>
              <div className="maxSize">최대크기 A3</div>
            </div>
            <div className="afterHoverContentBox">
              <div className="paperWeight">210g/m2</div>
              <div className="paperExplain">
                명함용지로 자주 쓰이는 종이로 높은 백색도로 종이가 화사한 특징
              </div>
            </div>
          </div>
        </div>

        <div className="paperCard">
          <div className="contentBox">
            <div className="beforeHoverContentBox">
              <div className="title">스노우지</div>
              <div className="maxSize">최대크기 A3</div>
            </div>
            <div className="afterHoverContentBox">
              <div className="paperWeight">200g/m2 120g/m2</div>
              <div className="paperExplain">
                명함용지로 자주 쓰이는 종이로 높은 백색도로 종이가 화사한 특징
              </div>
            </div>
          </div>
        </div>

        <div className="paperCard">
          <div className="contentBox">
            <div className="beforeHoverContentBox">
              <div className="title">마쉬멜로우</div>
              <div className="maxSize">최대크기 A3</div>
            </div>
            <div className="afterHoverContentBox">
              <div className="paperWeight">209g/m2</div>
              <div className="paperExplain">
                명함용지로 자주 쓰이는 종이로 높은 백색도로 종이가 화사한 특징
              </div>
            </div>
          </div>
        </div>

        <div className="paperCard">
          <div className="contentBox">
            <div className="beforeHoverContentBox">
              <div className="title">아트지</div>
              <div className="maxSize">최대크기 A3</div>
            </div>
            <div className="afterHoverContentBox">
              <div className="paperWeight">150g/m2</div>
              <div className="paperExplain">
                명함용지로 자주 쓰이는 종이로 높은 백색도로 종이가 화사한 특징
              </div>
            </div>
          </div>
        </div>

        <div className="paperCard">
          <div className="contentBox">
            <div className="beforeHoverContentBox">
              <div className="title">모조지</div>
              <div className="maxSize">최대크기 A3</div>
            </div>
            <div className="afterHoverContentBox">
              <div className="paperWeight">150g/m2 120g/m2 100g/m2 80g/m2</div>
              <div className="paperExplain">
                명함용지로 자주 쓰이는 종이로 높은 백색도로 종이가 화사한 특징
              </div>
            </div>
          </div>
        </div>

        <div className="paperCard">
          <div className="contentBox">
            <div className="beforeHoverContentBox">
              <div className="title">색지</div>
              <div className="maxSize">최대크기 A4</div>
            </div>
            <div className="afterHoverContentBox">
              <div className="paperWeight">220g/m2</div>
              <div className="paperExplain">
                명함용지로 자주 쓰이는 종이로 높은 백색도로 종이가 화사한 특징
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperInfoPage;
