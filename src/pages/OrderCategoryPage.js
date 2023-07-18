import { OrderPageRouteName } from "routes/RouteName";
import { useNavigate } from "react-router";
import "styles/OrderCategoryStyle.scss";
// import { ReactComponent as NormalAsset } from "assets/NormalAsset.svg";
// import { ReactComponent as BindingAsset } from "assets/BindingAsset.svg";
import LabelAsset from "../assets/LabelAsset.svg";
import NormalAsset from "../assets/NormalAsset.svg";
import BindingAsset from "../assets/BindingAsset.svg";
import PhotoAsset from "../assets/PhotoAsset.svg";

const OrderCategoryPage = () => {
  const navigate = useNavigate();
  return (
    <div className="OrderCategoryPageLayout">
      <div className="flip">
        <div className="CategoryUpperSection">
          <div
            className="normalCard"
            onClick={() => navigate(OrderPageRouteName)}
          >
            <div className="normalText">일반</div>
            <div>
              <img className="normalImg" src={NormalAsset} />
            </div>
            <div className="normalCardBack">뒷면</div>
          </div>
          <div
            className="bindingCard"
            onClick={() => navigate(OrderPageRouteName)}
          >
            <div className="bindingText">제본</div>
            <div className="bindingImg">
              <div>
                <img className="bindingImg" src={BindingAsset} />
              </div>
            </div>
          </div>
          <div
            className="labelCard"
            onClick={() => navigate(OrderPageRouteName)}
          >
            <div className="labelText">라벨지</div>
            <div>
              <img className="labelImg" src={LabelAsset} />
            </div>
          </div>
        </div>
        <div className="CategoryLowerSection">
          <div className="bigCard" onClick={() => navigate(OrderPageRouteName)}>
            <div className="bigText">실사대형출력</div>
            <div>
              <img className="labelImg" src={LabelAsset} />
            </div>
          </div>
          <div
            className="photoCard"
            onClick={() => navigate(OrderPageRouteName)}
          >
            <div className="photoText">사진인화</div>
            <div>
              <img className="photoImg" src={PhotoAsset} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCategoryPage;
