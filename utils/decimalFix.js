export const toFixedIfNecessary = (value, dp) => {
  return +parseFloat(value).toFixed(dp);
};
