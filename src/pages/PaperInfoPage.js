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
                명함 용도로 자주 쓰이는 종이로 화사함이 느껴지는 특수용지
              </div>
            </div>
          </div>
        </div>

        <div className="paperCard">
          <div className="contentBox">
            <div className="beforeHoverContentBox">
              <div className="title">랑데뷰</div>
              <div className="maxSize">최대크기 A3</div>
            </div>
            <div className="afterHoverContentBox">
              <div className="paperWeight">210g/m2</div>
              <div className="paperExplain">
                톡톡한 질감과 터치감이 있는 종이로 고급스러운 용지
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
                무광처리로 은은한 멋이있는 고급 용지
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
                질감이 부드럽고 탄성이 좋아 이미지의 섬세한 표현이 가능한 용지
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
                광택이 나며 고급스러움을 나타내는데에 사용되는 용지
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
              <div className="paperExplain">흔히 사용되는 A4 복사용지</div>
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
              <div className="paperExplain">색이 다양한 용지</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperInfoPage;
