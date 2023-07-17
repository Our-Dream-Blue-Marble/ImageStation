import { OrderPageRouteName } from "routes/RouteName";
import { useNavigate } from "react-router";

const OrderCategoryPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <button
          className="centerButton"
          onClick={() => navigate(OrderPageRouteName)}
        >
          일반
        </button>
        <button
          className="centerButton"
          onClick={() => navigate(OrderPageRouteName)}
        >
          제본
        </button>
        <button
          className="centerButton"
          onClick={() => navigate(OrderPageRouteName)}
        >
          라벨지
        </button>
      </div>
      <div>
        <button
          className="centerButton"
          onClick={() => navigate(OrderPageRouteName)}
        >
          실사대형출력
        </button>
        <button
          className="centerButton"
          onClick={() => navigate(OrderPageRouteName)}
        >
          사진인화
        </button>
      </div>
    </div>
  );
};

export default OrderCategoryPage;
