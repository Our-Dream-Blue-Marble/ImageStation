import { scrollToSection } from "functions/AppFunction";

const HomePage = ({ elementRef }) => {
  return (
    <div style={{ height: "100vh" }}>
      <h2>Home</h2>
      <button onClick={() => scrollToSection(elementRef)}>Down</button>
    </div>
  );
};

export default HomePage;
