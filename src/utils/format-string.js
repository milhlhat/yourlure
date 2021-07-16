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
  formatDate: (date) => {
    if (date == null) return null;
    let formatDate = new Date(date);
    return (
      formatDate.getDate() +
      "/" +
      (formatDate.getMonth() + 1) +
      "/" +
      formatDate.getFullYear()
    );
  },
  getStatus: (status, reject) => {
    if (!status) return null;
    if (status === "PENDING") return "Đang chờ xác nhận";
    if (status === "ACCEPT") return "Đang giao";
    if (status === "CUSTOMER_REJECT") {
      if (reject.toString().trim() === "CUSTOMER") {
        return "Đã hủy bởi bạn";
      }
      return "Đã hủy bởi khách hàng";
    }
    if (status === "STAFF_REJECT") {
      if (reject.toString().trim() === "CUSTOMER") {
        return "Đã hủy bởi cửa hàng";
      }
      return "Đã hủy bởi " + reject.toString();
    }
    if (status === "DONE") return "Hoàn thành";
  },
};
export const { convertToVND, totalPrice, formatDate, getStatus } = FormatUtils;
export default FormatUtils;
