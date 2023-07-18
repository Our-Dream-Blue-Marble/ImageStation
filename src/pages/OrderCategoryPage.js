import { OrderPageRouteName } from "routes/RouteName";
import { useNavigate } from "react-router";
import "styles/OrderCategoryStyle.scss";

const OrderCategoryPage = () => {
  const navigate = useNavigate();
  return (
    <div className="OrderCategoryPageLayout">
      <div className="cardLayout">
        <div className="cardContainer">
          <div className="card front">
            <div className="contents">일반</div>
          </div>
          <div
            className="card back"
            onClick={() => navigate(OrderPageRouteName)}
          >
            <div className="contents">뒷면</div>
          </div>
        </div>

        <div className="cardContainer">
          <div className="card front">
            <div className="contents">제본</div>
          </div>
          <div
            className="card back"
            onClick={() => navigate(OrderPageRouteName)}
          >
            <div className="contents">뒷면</div>
          </div>
        </div>

        <div className="cardContainer">
          <div className="card front">
            <div className="contents">라벨지</div>
          </div>
          <div
            className="card back"
            onClick={() => navigate(OrderPageRouteName)}
          >
            <div className="contents">뒷면</div>
          </div>
        </div>

        <div className="cardContainer">
          <div className="card front">
            <div className="contents">실사대형출력</div>
          </div>
          <div
            className="card back"
            onClick={() => navigate(OrderPageRouteName)}
          >
            <div className="contents">뒷면</div>
          </div>
        </div>

        <div className="cardContainer">
          <div className="card front">
            <div className="contents">사진인화</div>
          </div>
          <div
            className="card back"
            onClick={() => navigate(OrderPageRouteName)}
          >
            <div className="contents">뒷면</div>
          </div>
        </div>

        <div className="cardContainer">
          <div className="card front">
            <div className="contents">기타</div>
          </div>
          <div
            className="card back"
            onClick={() => navigate(OrderPageRouteName)}
          >
            <div className="contents">뒷면</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCategoryPage;
