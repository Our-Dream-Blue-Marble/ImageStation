class UserModel {
  constructor(
    uid,
    email,
    name,
    phoneNumber,
    role,
    isReceiveMail,
    signInDate,
    logInDate
  ) {
    this.uid = uid;
    this.email = email;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.role = role;
    this.isReceiveMail = isReceiveMail;
    this.signInDate = signInDate;
    this.logInDate = logInDate;
  }
  toData() {
    return {
      uid: this.uid,
      email: this.email,
      name: this.name,
      phoneNumber: this.phoneNumber,
      role: this.role,
      isReceiveMail: this.isReceiveMail,
      signInDate: this.signInDate,
      logInDate: this.logInDate,
    };
  }
}

export const UserModelConveter = {
  toFirestore: function (data) {
    return {
      uid: data.uid,
      email: data.email,
      name: data.name,
      phoneNumber: data.phoneNumber,
      role: data.role,
      isReceiveMail: data.isReceiveMail,
      signInDate: data.signInDate,
      logInDate: data.logInDate,
    };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new UserModel(data);
  },
};

export default UserModel;
