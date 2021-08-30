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
    if (!data || data.length === 0) return 0;
    let total = data.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);
    return total;
  },
  formatDate: (date) => {
    if (date == null) return null;
    let today = new Date(date);
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    return dd + "/" + mm + "/" + yyyy;
  },
  formatDateToInputDate: (date) => {
    if (date == null) return null;
    let today = new Date(date);
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    return yyyy + "-" + mm + "-" + dd;
  },
  getStatus: (status, reject) => {
    if (!status) return null;
    if (status === "PENDING") return "Đang chờ xác nhận";
    if (status === "ACCEPT") return "Đã xác nhận";
    if (status === "CUSTOMER_REJECT") {
      if (reject === "CUSTOMER") {
        return "Đã hủy bởi bạn";
      }
      return "Đã hủy bởi khách hàng";
    }
    if (status === "STAFF_REJECT") {
      if (reject === "CUSTOMER") {
        return "Đã hủy bởi cửa hàng";
      }
      return "Đã hủy bởi cửa hàng";
    }
    if (status === "DONE") return "Hoàn thành";
  },
  getShipping() {
    return 25000;
  },
  addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },
  minusDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
  },
};
export const {
  convertToVND,
  totalPrice,
  formatDate,
  getStatus,
  getShipping,
  addDays,
  minusDays,
  formatDateToInputDate,
} = FormatUtils;
export default FormatUtils;
