export const UserModel = (data) => {
  return {
    email: data.email,
    name: data.name,
    phoneNumber: data.phoneNumber,
    role: data.role,
    isReceiveMail: data.isReceiveMail,
    signInDate: data.signInDate,
    logInDate: data.logInDate,
  };
};
