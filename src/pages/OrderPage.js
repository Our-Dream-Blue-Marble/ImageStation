import "styles/OrderStyle.scss";
import "functions/OrderFunction";
import { useLocation } from "react-router-dom";

const OrderPage = () => {
  const location = useLocation();
  const category = location.state.data;

  return (
    <div className="OrderBody">
      <div className="OrderWholeContainer">
        <div className="OrderContainer-left"></div>
        <div className="OrderContainer-right">
          <h1>일반 주문예약</h1>
          <form onSubmit={async (e) => {}}>
            <fieldset>
              <label for="title">
                제목
                <input id="title" type="text" name="title" value="title" />
              </label>
              <label for="page">
                페이지
                <select id="page" name="page" value="page">
                  <option value={0}>전체</option>
                  <option value={1}>짝수</option>
                  <option value={2}>홀수</option>
                </select>
              </label>
              <label for="layout">
                레이아웃
                <select id="layout" name="layout" value="layout">
                  <option value="0">가로 방향</option>
                  <option value="1">세로 방향</option>
                </select>
              </label>
              <label for="size">
                사이즈
                <select id="size" name="size" value="size">
                  <option value="A2">A2</option>
                  <option value="A3">A3</option>
                  <option value="A4">A4</option>
                  <option value="A5">A5</option>
                </select>
              </label>
            </fieldset>
            <fieldset>
              <details>
                <summary>설정 더보기</summary>
                <label for="paper">
                  종이
                  <select id="paper">
                    <option>스노우지</option>
                    <option>마시멜로우지</option>
                    <option>마시멜로우지</option>
                    <option>마시멜로우지</option>
                    <option>마시멜로우지</option>
                  </select>
                </label>
                <label for="color">
                  컬러
                  <select id="color">
                    <option>빨간색</option>
                    <option>파란색</option>
                    <option>아이보리색</option>
                    <option>검은색</option>
                  </select>
                </label>
              </details>
            </fieldset>
            <span>
              <label for="request">
                주문사항
                <textarea
                  id="request"
                  placeholder="추가요청 사항을 적어주세요!"
                ></textarea>
              </label>
            </span>
          </form>
        </div>
      </div>
      <span className="buttons">
        <input type="submit" value={"주문하기"} />
        <input type="reset" value={"취소하기"} />
      </span>
    </div>
  );
};

export default OrderPage;
