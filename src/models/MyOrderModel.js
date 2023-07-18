import PropTypes from "prop-types";

class MyOrderModel {
  constructor(docId, uid, orderDocRef) {
    this.docId = docId;
    this.uid = uid;
    this.orderDocRef = orderDocRef;
  }
  toDate() {
    return {
      docId: this.docId,
      uid: this.uid,
      orderDocRef: this.orderDocRef,
    };
  }
}

export const MyOrderModelConverter = {
  toFirestore: function (data) {
    return {
      docId: data.docId,
      uid: data.uid,
      orderDocRef: data.orderDocRef,
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new MyOrderModel(data);
  },
};

MyOrderModel.propTypes = {
  docId: PropTypes.number.isRequired,
  uid: PropTypes.string.isRequired,
  orderDocRef: PropTypes.string.isRequired,
};

export default MyOrderModel;
