import { useNavigate } from "react-router";
import { OrderCategoryPageRouteName } from "routes/RouteName";
import NormalOrderAsset from "assets/orders/NormalOrderAsset.png";
import BindingOrderAsset from "assets/orders/BindingOrderAsset.png";
import LabelOrderAsset from "assets/orders/LabelOrderAsset.png";
import ActualOrderAsset from "assets/orders/ActualOrderAsset.png";
import PhotoOrderAsset from "assets/orders/PhotoOrderAsset.png";
import EtcOrderAsset from "assets/orders/EtcOrderAsset.png";
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
          <div className="categoryTitle">
            일반
            <img src={NormalOrderAsset} width={200} />
          </div>
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
          <div className="categoryTitle">
            제본 <img src={BindingOrderAsset} width={200} />
          </div>
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
          <div className="categoryTitle">
            라벨지 <img src={LabelOrderAsset} width={200} />
          </div>
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
          <div className="categoryTitle">
            실사대형출력 <img src={ActualOrderAsset} width={200} />
          </div>
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
          <div className="categoryTitle">
            사진인화 <img src={PhotoOrderAsset} width={200} />
          </div>
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
          <div className="categoryTitle">
            기타 <img src={EtcOrderAsset} width={200} />
          </div>
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
