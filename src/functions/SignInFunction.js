export const onUserEmailOrPasswordChange = (event, setValue) => {
  const {
    target: { name, value },
  } = event;
  if (name === "userEmail") {
    setValue(value);
  } else if (name === "userPassword") {
    setValue(value);
  }
};
