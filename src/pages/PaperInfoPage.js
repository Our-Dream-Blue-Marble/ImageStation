import "styles/PaperInfoStyle.scss";

const PaperInfoPage = () => {
  return (
    <div className="PaperInfoLayout">
      <div className="paperHead">
        <div className="PaperTitle">종이</div>
        <div className="PaperExplanation">
          다양한 종이를 통해
          <br />
          특별한 인쇄 경험을 제공합니다.
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
                특유의 자연스럽고 촉촉한 질감이 특징이며, <br /> 잉크 건조성이
                매우 뛰어나 생생한 비쥬얼 표현에 적합한 고급 용지
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
                부드러운 감촉, 두터운 느낌, 그리고 건조성이 뛰어난 고급지로서,
                <br />
                높은 퀄리티를 요구하는 인쇄물에 적합한 용지
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
                광택이 나는 아트지와는 상반되게 차분한 느낌을 내는 무광택지이며,
                <br />
                백감도와 인쇄광택이 탁월함
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
                매끈한 표면의 종이질감으로서,
                <br />
                랑데뷰와 비교하여 종이질감을 드러내지 않는 것을 선호하는 경우
                사용되는 용지
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
                밝은 순백색의 광택 프리미엄 용지이며,
                <br /> 카달로그, 팜플렛, 포스터, 전단지 등의 인쇄물에 주로
                사용됨
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
              <div className="paperExplain">흔히 사용되는 A4 사이즈의 용지이며, <br/>주로 서적 인쇄의 본문
                  용지로 사용됨.</div>
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
              <div className="paperWeight">150g/m2 120g/m2 100g/m2 80g/m2</div>
              <div className="paperExplain">
                모조지에 미색 염로를 첨가하고 무광 처리한 용지로서,
                <br />
                출판물의 본문용지로 사용됨
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperInfoPage;
