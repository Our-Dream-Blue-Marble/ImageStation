import { OrderCategoryPageRouteName } from "routes/RouteName";
import { useNavigate } from "react-router";
import "styles/OrderCategoryStyle.scss";

const OrderCategoryPage = () => {
  const navigate = useNavigate();
  return (
    <div className="OrderCategoryPageLayout">
      <div className="cardLayout">
        <div
          className="categoryCard"
          onClick={() =>
            navigate(`${OrderCategoryPageRouteName}/normal`, {
              state: { data: "normal" },
            })
          }
        >
          <div className="categoryTitle">일반</div>
          <div className="afterHoverBox">
            <div className="explain">
              간단한 사무용, 포스터, 카다로그 등 추천합니다!
            </div>
          </div>
        </div>

        <div
          className="categoryCard"
          onClick={() =>
            navigate(`${OrderCategoryPageRouteName}/normal`, {
              state: { data: "binding" },
            })
          }
        >
          <div className="categoryTitle">제본</div>
          <div className="afterHoverBox">
            <div className="explain">
              간단한 사무용, 포스터, 카다로그 등 추천합니다!
            </div>
          </div>
        </div>

        <div
          className="categoryCard"
          onClick={() =>
            navigate(`${OrderCategoryPageRouteName}/normal`, {
              state: { data: "labeling" },
            })
          }
        >
          <div className="categoryTitle">라벨지</div>
          <div className="afterHoverBox">
            <div className="explain">
              간단한 사무용, 포스터, 카다로그 등 추천합니다!
            </div>
          </div>
        </div>

        <div
          className="categoryCard"
          onClick={() =>
            navigate(`${OrderCategoryPageRouteName}/normal`, {
              state: { data: "actual" },
            })
          }
        >
          <div className="categoryTitle">실사대형출력</div>
          <div className="afterHoverBox">
            <div className="explain">
              간단한 사무용, 포스터, 카다로그 등 추천합니다!
            </div>
          </div>
        </div>

        <div
          className="categoryCard"
          onClick={() =>
            navigate(`${OrderCategoryPageRouteName}/normal`, {
              state: { data: "photo" },
            })
          }
        >
          <div className="categoryTitle">사진인화</div>
          <div className="afterHoverBox">
            <div className="explain">
              간단한 사무용, 포스터, 카다로그 등 추천합니다!
            </div>
          </div>
        </div>

        <div
          className="categoryCard"
          onClick={() =>
            navigate(`${OrderCategoryPageRouteName}/normal`, {
              state: { data: "etc" },
            })
          }
        >
          <div className="categoryTitle">기타</div>
          <div className="afterHoverBox">
            <div className="explain">
              간단한 사무용, 포스터, 카다로그 등 추천합니다!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCategoryPage;
