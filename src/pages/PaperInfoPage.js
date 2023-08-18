import "styles/PaperInfoStyle.scss";
import LoadingWidgets from "widgets/LoadingWidgets";

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
                높은 백색도로 화사함을 느낄 수 있으며 <br /> 인쇄 선명성이 매우
                <br />
                뛰어나 생생한 비쥬얼 표현에 적합한 용지
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
                질감과 터치감있는 <br /> 표면으로 인쇄물에서 <br /> 고급스러움이
                묻어나는 용지
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
                무광처리로 은은한 멋이 있는 고급 용지
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
                실크처럼 매끄럽고 고운 표면으로 잉크 점착성이 우수한 용지
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
                광택이 나며
                <br /> 고급스러움을 나태낼 때 적합한 용지
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
              <div className="paperExplain">선명한 색을 갖고있는 용지</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperInfoPage;
