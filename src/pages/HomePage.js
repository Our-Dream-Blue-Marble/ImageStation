import { scrollToSection } from "functions/AppFunction";

const HomePage = ({ elementRef }) => {
  return (
    <div style={{ height: "100vh" }}>
      <p>이미지스테이션을 온라인 예약으로</p>
      <p>몇번의 클릭으로 어느 곳에서 쉽고 빠른 프린팅 경험을 제공합니다.</p>
      <p>이미지스테이션의 소식을 듣고 싶나요?</p>
      <button onClick={() => scrollToSection(elementRef)}>Down</button>
    </div>
  );
};

export default HomePage;
