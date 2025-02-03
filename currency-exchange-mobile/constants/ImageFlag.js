export const PLN = "PLN";
export const EUR = "EUR";
export const USD = "USD";

const imageCode = new Map();
imageCode.set(PLN, require("../assets/images/pl-flag.png"));
imageCode.set(EUR, require("../assets/images/eu-flag.png"));
imageCode.set(USD, require("../assets/images/us-flag.png"));

export default imageCode;
