import { OrderPageRouteName } from "routes/RouteName";
import { useNavigate } from "react-router";
import "styles/OrderCategoryStyle.scss";

const OrderCategoryPage = () => {
  const navigate = useNavigate();
  return (
    <div className="OrderCategoryPageLayout">
      <div className="cardContainer">
        <div
          className="normalCard"
          onClick={() => navigate(OrderPageRouteName)}
        >
          <div className="normalText">일반</div>
        </div>
        <div
          className="bindingCard"
          onClick={() => navigate(OrderPageRouteName)}
        >
          <div className="bindingText">제본</div>
        </div>
        <div className="labelCard" onClick={() => navigate(OrderPageRouteName)}>
          <div className="labelText">라벨지</div>
        </div>
        <div
          className="actualCard"
          onClick={() => navigate(OrderPageRouteName)}
        >
          <div className="actualText">실사대형출력</div>
        </div>
        <div className="photoCard" onClick={() => navigate(OrderPageRouteName)}>
          <div className="photoText">사진인화</div>
        </div>
        <div className="etcCard" onClick={() => navigate(OrderPageRouteName)}>
          <div className="etcText">기타</div>
        </div>
      </div>
    </div>
  );
};

export default OrderCategoryPage;
