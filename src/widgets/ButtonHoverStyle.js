import "styles/ThemeStyles.scss";

export const buttonHoverStyle = (isPossibleSubmit, isHover) => {
  if (isPossibleSubmit) {
    return isHover ? "rgba(77, 125, 220, 1)" : "rgba(90, 145, 255, 1)";
  } else {
    return "rgba(90, 145, 255, 0.50)";
  }
};
