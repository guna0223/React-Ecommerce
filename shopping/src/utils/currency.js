export const convertToINR = (usd) => {
  return Math.round(usd * 83);
};

export const formatINR = (inr) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(inr);
};
