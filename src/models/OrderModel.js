class OrderModel {
  constructor(
    docId,
    uid,
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
    state
  ) {
    this.docId = docId;
    this.uid = uid;
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
  }
  toData() {
    return {
      docId: this.docId,
      uid: this.uid,
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
    };
  }
}

export const OrderModelConverter = {
  toFirestore: function (data) {
    return {
      docId: data.docId,
      uid: data.uid,
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
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new OrderModel(data);
  },
};

export default OrderModel;
