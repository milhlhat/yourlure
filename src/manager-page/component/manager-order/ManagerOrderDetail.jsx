import ManagerOrderAPI from "api/manager-order-api";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setIsBack } from "redux/back-action/back-action";
import YLButton from "components/custom-field/YLButton";
import "./scss/manager-order-detail.scss";


function ManagerOrderDetail(props) {
  const canBack = props.location.canBack;
  const orderId = props.match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();
  const [order, setOrder] = useState();

  const fetchOrder = async () => {
    setOrder((prevState) => {
      return { ...prevState, isLoading: true };
    });
    try {
      const response = await ManagerOrderAPI.getOrderById(orderId);
      setOrder({ data: response, isLoading: false, isSuccess: true });
    } catch (error) {
      setOrder({ data: null, isLoading: false, isSuccess: false });
      console.log("fail to fetch address");
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  useEffect(() => {
    if (canBack) {
      const action = setIsBack({
        canBack: canBack.canBack,
        path: canBack.path,
        label: canBack.label,
      });
      dispatch(action);
    }
  }, [canBack]);
  return (
    <div className="manager-order-detail">
      <div className="d-flex">
        <div className="col-12 col-md-9 p-2">
          <div className="bg-box bg-shadow">
            <div className="manager-order-show">
              <span>Sẳn phẩm</span>
              <hr />
              {/* <ManagerSort /> */}
              {order?.data?.productDtoOuts?.length <= 0 && (
                <p>Không có sản phẩm </p>
              )}
              <table>
                <tbody>
                  <tr>
                    <th>#</th>
                    <th>Tên sản phẩm</th>
                    <th>Tùy biến</th>
                    <th>Mã biến thể</th>
                    <th>Danh mục</th>
                    <th>Số lượng</th>
                    <th>Trạng thái</th>
                    <th className="text-center">Giá</th>
                    <th className="text-center">Tổng</th>
                  </tr>
                  {order?.data?.productDtoOuts?.map((item, i) => (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{item.productName}</td>
                      <td>
                        {item.customizeId == null
                          ? item.customizeId
                            ? "có"
                            : "không"
                          : "-"}
                      </td>
                      <td>{item.customizeId ? item.customizeId : "-"}</td>
                      <td>{item.category?.categoryName}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-center">-</td>
                      <td className="text-end">
                        {!item
                          ? "N/A"
                          : Number(item.price).toLocaleString(undefined, {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            })}
                      </td>
                      <td className="text-end">
                        {!item
                          ? "N/A"
                          : Number(item.price * item.quantity).toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 2,
                              }
                            )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3 p-2">
          <div className="bg-box bg-shadow">
            <div className="order-head-row d-flex justify-content-between align-items-end">
            <h6>Khách hàng</h6>
            <div className="order-customer">
              <YLButton
                variant="link"
                onClick={() => history.push("/manager/product/addnew")}
                value="Xem hồ sơ"
                to={"/manager/staff/addNew"}
              />
            </div>
          </div>
          <div className="manager-customer-show">
            <hr />
            <table>
              <tbody>
                <tr>
                  <td>{order?.data?.name?order.data.name:'-'}</td>
                </tr>
                <tr>
                  <td>{order?.data?.phone?order.data.phone:'-'}</td>
                </tr>
                <tr>
                  <td>{order?.data?.address?order.data.address:'-'}</td>
                </tr>
                <tr>
                  <td>{order?.data?.note?'Chú ý: '+order.data.note:'-'}</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default ManagerOrderDetail;
