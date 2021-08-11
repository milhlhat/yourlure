import AxiosClient from "./axios-client";

const OrderAPI = {
  getUserOrder: (limit, page) => {
    const url = `/api/order/user-order?limit=${limit}&page=${page}`;
    return AxiosClient.get(url);
  },
  getOrder: (limit, page) => {
    const url = `/api/order/my-orders?limit=${limit}&page=${page}`;
    return AxiosClient.get(url);
  },
  userProcessOrder: (param) => {
    const url = `/api/order/user-process-order`;
    return AxiosClient.post(url, param);
  },
  checkDiscount: (param) => {
    const url = `/api/order/verify-discount?code=${param}`;
    return AxiosClient.post(url);
  },
  guestProcessOrder: (param) => {
    const url = `/api/order/guest-process-order`;
    return AxiosClient.post(url, param);
  },
  userProcessOrder: (param) => {
    const url = `/api/order/user-process-order`;
    return AxiosClient.post(url, param);
  },
  userBuyNow: (param) => {
    const url = `/api/order/user-buy-now`;
    return AxiosClient.post(url, param);
  },
  userCancelOrder: (param) => {
    const url = `/api/order/cancel/${param}`;
    return AxiosClient.get(url);
  },
};
export const {getUserOrder } = OrderAPI;
export default OrderAPI;
