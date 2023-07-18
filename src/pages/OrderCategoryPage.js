import { OrderPageRouteName } from "routes/RouteName";
import { useNavigate } from "react-router";
import "styles/OrderCategoryStyle.scss";

const OrderCategoryPage = () => {
  const navigate = useNavigate();
  return (
    <div className="OrderCategoryPageLayout">
      <div className="cardLayout">
        <div className="flip">
          <div className="card">
            <div className="front">
              <div className="frontCardText">일반</div>
            </div>
            <div className="back" onClick={() => navigate(OrderPageRouteName)}>
              <div className="frontCardText">일반</div>
              <div className="backCardText">
                간단한 사무용, 포스터, 카다로그 등 추천합니다!
              </div>
            </div>
          </div>
        </div>

        <div className="flip">
          <div className="card">
            <div className="front">
              <div className="frontCardText">제본</div>
            </div>
            <div className="back" onClick={() => navigate(OrderPageRouteName)}>
              <div className="frontCardText">제본</div>
              <div className="backCardText">제본 설명 블라블라!</div>
            </div>
          </div>
        </div>

        <div className="flip">
          <div className="card">
            <div className="front">
              <div className="frontCardText">라벨지</div>
            </div>
            <div className="back" onClick={() => navigate(OrderPageRouteName)}>
              <div className="frontCardText">라벨지</div>
              <div className="backCardText">라벨지 설명 블라블라!</div>
            </div>
          </div>
        </div>

        <div className="flip">
          <div className="card">
            <div className="front">
              <div className="frontCardText">실사대형출력</div>
            </div>
            <div className="back" onClick={() => navigate(OrderPageRouteName)}>
              <div className="frontCardText">실사대형출력</div>
              <div className="backCardText">실사대형출력 설명 블라블라!</div>
            </div>
          </div>
        </div>

        <div className="flip">
          <div className="card">
            <div className="front">
              <div className="frontCardText">사진인화</div>
            </div>
            <div className="back" onClick={() => navigate(OrderPageRouteName)}>
              <div className="frontCardText">사진인화</div>
              <div className="backCardText">사진인화 설명 블라블라!</div>
            </div>
          </div>
        </div>

        <div className="flip">
          <div className="card">
            <div className="front">
              <div className="frontCardText">기타</div>
            </div>
            <div className="back" onClick={() => navigate(OrderPageRouteName)}>
              <div className="frontCardText">기타</div>
              <div className="backCardText">기타 설명 블라블라!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCategoryPage;
