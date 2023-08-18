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
            <div className="explain">사무용, 포스터, 카탈로그</div>
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
              중철, 떡제본, <br /> 단행본/책자, <br /> 카탈로그/브로슈어
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
            <div className="explain">스티커, 이름표</div>
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
            <div className="explain">현수막, 포스터</div>
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
            <div className="explain">일반 사진</div>
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
            <div className="explain">커스텀</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCategoryPage;
