class NoticeModel {
  constructor(id, title, body, writer, date, view) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.writer = writer;
    this.date = date;
    this.view = view;
  }
  toData() {
    return {
      id: this.id,
      title: this.title,
      body: this.body,
      writer: this.writer,
      date: this.date,
      view: this.view,
    };
  }
}

export const NoticeModelCoveter = {
  toFirestore: function (data) {
    return {
      id: data.id,
      title: data.title,
      body: data.body,
      writer: data.writer,
      date: data.date,
      view: data.view,
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new NoticeModel(data);
  },
};

export default NoticeModel;
