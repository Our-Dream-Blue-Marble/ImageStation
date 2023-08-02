class NoticeModel {
  constructor(
    id,
    title,
    body,
    writer,
    date,
    dateupdated,
    view,
    attachment,
    attachmentName,
    noticePin
  ) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.writer = writer;
    this.date = date;
    this.dateupdated = dateupdated;
    this.view = view;
    this.attachment = attachment;
    this.attachmentName = attachmentName;
    this.noticePin = noticePin;
  }
  toData() {
    return {
      id: this.id,
      title: this.title,
      body: this.body,
      writer: this.writer,
      date: this.date,
      dateupdated: this.dateupdated,
      view: this.view,
      attachment: this.attachment,
      attachmentName: this.attachmentName,
      noticePin: this.noticePin,
    };
  }
}

export const NoticeModelConverter = {
  toFirestore: function (data) {
    return {
      id: data.id,
      title: data.title,
      body: data.body,
      writer: data.writer,
      date: data.date,
      dateupdated: data.dateupdated,
      view: data.view,
      attachment: data.attachment,
      attachmentName: data.attachmentName,
      noticePin: data.noticePin,
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new NoticeModel(data);
  },
};

export default NoticeModel;
