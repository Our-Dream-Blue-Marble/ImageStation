import PropTypes from "prop-types";

class OrderModel {
  constructor(
    docId,
    userDocRef,
    category,
    title,
    page,
    layout,
    size,
    bindingMethod,
    coating,
    paper,
    color,
    moreInfo,
    attachment,
    attachmentName,
    state,
    totalMoney,
    completeTime
  ) {
    this.docId = docId;
    this.userDocRef = userDocRef;
    this.category = category;
    this.title = title;
    this.page = page;
    this.layout = layout;
    this.size = size;
    this.bindingMethod = bindingMethod;
    this.coating = coating;
    this.paper = paper;
    this.color = color;
    this.moreInfo = moreInfo;
    this.attachment = attachment;
    this.attachmentName = attachmentName;
    this.state = state;
    this.totalMoney = totalMoney;
    this.completeTime = completeTime;
  }
  toData() {
    return {
      docId: this.docId,
      userDocRef: this.userDocRef,
      category: this.category,
      title: this.title,
      page: this.page,
      layout: this.layout,
      size: this.size,
      bindingMethod: this.bindingMethod,
      coating: this.coating,
      paper: this.paper,
      color: this.color,
      moreInfo: this.moreInfo,
      attachment: this.attachment,
      attachmentName: this.attachmentName,
      state: this.state,
      totalMoney: this.totalMoney,
      completeTime: this.completeTime,
    };
  }
}

export const OrderModelConverter = {
  toFirestore: function (data) {
    return {
      docId: data.docId,
      userDocRef: data.userDocRef,
      category: data.category,
      title: data.title,
      page: data.page,
      layout: data.layout,
      size: data.size,
      bindingMethod: data.bindingMethod,
      coating: data.coating,
      paper: data.paper,
      color: data.color,
      moreInfo: data.moreInfo,
      attachment: data.attachment,
      attachmentName: data.attachmentName,
      state: data.state,
      totalMoney: data.totalMoney,
      completeTime: data.completeTime,
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new OrderModel(data);
  },
};

OrderModel.propTypes = {
  docId: PropTypes.number.isRequired,
  userDocRef: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  layout: PropTypes.bool,
  size: PropTypes.string,
  bindingMethod: PropTypes.string,
  coating: PropTypes.bool,
  paper: PropTypes.string,
  color: PropTypes.number,
  moreInfo: PropTypes.string,
  attachment: PropTypes.string.isRequired,
  attachmentName: PropTypes.string.isRequired,
  state: PropTypes.number,
  totalMoney: PropTypes.number,
  completeTime: PropTypes.number,
};

export default OrderModel;
