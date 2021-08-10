import ManagerVoucherAPI from "api/manager-voucher";
import Editor from "assets/icon/editor.svg";
import Trash from "assets/icon/trash.svg";
import ConfirmPopup from "components/confirm-popup/ComfirmPopup";
import YLButton from "components/custom-field/YLButton";
import ErrorLoad from "components/error-notify/ErrorLoad";
import Loading from "components/Loading";
import { filterConfig } from "constant/filter-setting";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useHistory, useLocation } from "react-router-dom";
import ManagerSort from "./ManagerSort";
import "./scss/manager-discount-voucher.scss";
import { convertToVND, formatDate } from "../../../utils/format-string";
import { toast } from "react-toastify";
import { TYPE_OPTION } from "./ManagerVoucherAddNew";

ManagerVoucher.propTypes = {};

function ManagerVoucher() {
  const totalItem = 10;
  const history = useHistory();
  const location = useLocation();
  const [activePage, setActivePage] = useState(1);
  const [filter, setFilter] = useState({
    isAsc: true,
    keyword: "",
    limit: totalItem,
    listCateId: [],
    listFishId: [],
    page: filterConfig.PAGE_NUMBER_DEFAULT,
    sortBy: "discount_voucher_id",
  });
  const [voucherList, setVoucherList] = useState({
    data: [],
    isLoading: false,
    isSuccess: true,
  });

  //option sort
  const options = [
    {
      display: "Cũ nhất",
      isAsc: true,
      sortBy: "discount_voucher_id",
      value: "SORT_id_ASC",
    },
    {
      display: "Mới nhất",
      isAsc: false,
      sortBy: "discount_voucher_id",
      value: "SORT_id_DESC",
    },
    {
      display: "Tên từ A-Z",
      isAsc: true,
      sortBy: "name",
      value: "SORT_NAME_DESC",
    },
    {
      display: "Tên từ Z-A",
      isAsc: false,
      sortBy: "name",
      value: "SORT_NAME_DESC",
    },
  ];
  const setBack = {
    canBack: true,
    path: location,
    label: "Voucher",
  };

  function handlePageChange(newPage) {
    setActivePage(newPage);
    setFilter({ ...filter, page: newPage - 1 });
  }

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const response = await ManagerVoucherAPI.delete(id);
      if (!response) throw response.error;
      else {
        toast.success("Xóa mã giảm giá thành công");
      }
      await fetchVoucher();
    } catch (error) {
      toast.error("Xóa loại mã giảm giá thất bại");
    }
  };

  const handleEditClicked = (id) => {
    history.push({
      pathname: "/manager/voucher/edit/" + id,
      canBack: setBack,
    });
  };

  useEffect(() => {
    fetchVoucher();
  }, [filter]);

  const fetchVoucher = async () => {
    setVoucherList((prevState) => {
      return { ...prevState, isLoading: true };
    });

    try {
      const response = await ManagerVoucherAPI.getAll(filter);
      setVoucherList({
        data: response,
        isLoading: false,
        isSuccess: true,
      });
    } catch (error) {
      setVoucherList({ data: null, isLoading: false, isSuccess: false });
      toast.error("Hệ thống gặp lỗi lạ");
    }
  };
  const getValueDiscount = (type, value, maxValue) => {
    console.log("max", type, maxValue);
    switch (type) {
      case TYPE_OPTION[2]:
        // if (maxValue && maxValue > value) {
        //   return convertToVND(maxValue);
        // } else return convertToVND(value) || "-";
        return "100% Phí vận chuyển";
      case TYPE_OPTION[0]:
        return `${value * 100}%` || "-";
      default:
        return convertToVND(value);
    }
  };
  useEffect(() => {
    fetchVoucher();
  }, [filter]);

  if (voucherList.isLoading) {
    return <Loading />;
  } else if (!voucherList.isSuccess) {
    return <ErrorLoad />;
  } else
    return (
      <>
        <div className="fish-head-row">
          <h3>Mã Giảm Giá</h3>
          <div className="product-add-new">
            <YLButton
              variant="primary"
              value="Thêm"
              to={{
                pathname: "/manager/voucher/addnew",
                canBack: setBack,
              }}
            />
          </div>
        </div>
        <div className="user-head-row">
          <div className="product-add-new"></div>
        </div>
        <div className="manager-voucher-show mt-3 bg-white bg-shadow">
          <span>Tất cả mã giảm giá</span>
          <hr />
          <ManagerSort
            filter={filter}
            setFilter={setFilter}
            options={options}
          />
          <table>
            <tbody>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Loại giảm giá</th>
                <th>Giá trị</th>
                <th>Mã code</th>
                <th>Bắt đầu từ ngày</th>
                <th>Ngày kết thúc</th>
                <th></th>
              </tr>
              {voucherList?.data?.discountVouchers?.map((item, i) => (
                <tr key={i} className="hover-background">
                  <td>{(activePage - 1) * totalItem + i + 1}</td>
                  <td>{item?.name}</td>
                  <td>{item.type}</td>
                  <td>
                    {getValueDiscount(
                      item.type,
                      item.discountValue,
                      item.maxValue
                    )}
                  </td>
                  <td>{item.code || "-"}</td>
                  <td>{item.start_date ? formatDate(item.start_date) : "-"}</td>
                  <td>{item.end_date ? formatDate(item.end_date) : "-"}</td>
                  <td>
                    <td className="d-flex float-end">
                      <img
                        src={Editor}
                        className="pointer"
                        onClick={() =>
                          handleEditClicked(item.discountVoucherId)
                        }
                      />
                      <ConfirmPopup
                        variant="link"
                        width="70px"
                        height="25px"
                        btnText={<img src={Trash} />}
                        content="Bạn chắc chắn muốn xóa?"
                        onConfirm={() => handleDelete(item.discountVoucherId)}
                      />
                    </td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {voucherList?.data?.discountVouchers?.length <= 0 && (
            <p>Không có mã giảm giá nào! </p>
          )}
          <div className="m-auto p-4 d-flex justify-content-center">
            {voucherList?.data?.totalPage >= 1 && (
              <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={activePage}
                itemsCountPerPage={totalItem}
                totalItemsCount={voucherList?.data?.totalItem}
                pageRangeDisplayed={filterConfig.PAGE_RANGE_DISPLAYED}
                onChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </>
    );
}

export default ManagerVoucher;
