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
      <div className="PaperInfoContainer">종이종류칸</div>
    </div>
  );
};

export default PaperInfoPage;
