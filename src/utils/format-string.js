let FormatUtils = {
  convertToVND: (num) => {
    let result =
      Number(num).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }) + "\u20AB";
    return result;
  },
  totalPrice: (data) => {
    let total = data.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);
    return total;
  },
};
export const { convertToVND, totalPrice } = FormatUtils;
export default FormatUtils;
