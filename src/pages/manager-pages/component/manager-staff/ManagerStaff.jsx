import ManagerUserApi from "api/manager-user-api";
import ConfirmPopup from "components/confirm-popup/ComfirmPopup";
import YLButton from "components/custom-field/YLButton";
import Loading from "components/Loading";
import { filterConfig } from "constants/filter-setting";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setIsBack } from "store/back-action/back-action";
import ManagerSort from "pages/manager-pages/component/sort/ManagerSort";
import "./scss/manager-staff.scss";

function ManagerStaff(props) {
  const totalItem = 10;
  const history = useHistory();
  const [filter, setFilter] = useState({
    isAsc: true,
    keyword: "",
    limit: totalItem,
    page: 0,
    sortBy: "user_id",
    typeSearch: "",
  });
  const [staffList, setStaffList] = useState({
    data: [],
    isLoading: false,
    isSuccess: true,
  });
  //option sort
  const options = [
    {
      display: "Cũ nhất",
      isAsc: true,
      sortBy: "user_id",
      value: "SORT_id_ASC",
    },
    {
      display: "Mới nhất",
      isAsc: false,
      sortBy: "user_id",
      value: "SORT_id_DESC",
    },
    {
      display: "Tên từ A-Z",
      isAsc: true,
      sortBy: "username",
      value: "SORT_NAME_DESC",
    },
    {
      display: "Tên từ Z-A",
      isAsc: false,
      sortBy: "username",
      value: "SORT_NAME_DESC",
    },
  ];
  const [activePage, setActivePage] = useState(1);
  function handlePageChange(newPage) {
    setActivePage(newPage);
    setFilter({ ...filter, page: newPage - 1 });
  }

  const dispatch = useDispatch();
  useEffect(() => {
    const action = setIsBack({
      canBack: false,
      path: "",
      label: "",
    });
    dispatch(action);
  }, []);

  const detectRole = (role) => {
    let rs = "";
    role.map((r) => {
      if (r === "ROLE_ADMIN") {
        rs += "-Quản lý-";
      } else if (r === "ROLE_STAFF") {
        rs += "-Nhân viên-";
      } else if (r === "ROLE_CUSTOMER") {
        rs += "-Khách hàng-";
      }
    });
    return rs !== "" ? rs : "-";
  };
  const handleSwitchStatus = async (data) => {
    try {
      const response = await ManagerUserApi.switchStatus(data.userId);
      if (response.data != null && !response.data) {
        throw new Error();
      } else {
        fetchManagerStaff();
      }
    } catch (error) {
      data.enabled
        ? alert(`Chặn ${data.username ? data.username : data.phone} thất bại`)
        : alert(
            `Bỏ chặn ${data.username ? data.username : data.phone} thất bại`
          );
      console.log("fail to switch status user");
    }
  };
  const fetchManagerStaff = async () => {
    setStaffList((prevState) => {
      return { ...prevState, isLoading: true };
    });
    try {
      const response = await ManagerUserApi.getStaffAll(filter);
      setStaffList({ data: response, isLoading: false, isSuccess: true });
    } catch (error) {
      setStaffList({ data: null, isLoading: false, isSuccess: false });
      console.log("fail to fetch address");
    }
  };
  useEffect(() => {
    fetchManagerStaff();
  }, [filter]);
  if (staffList.isLoading) {
    return <Loading />;
  } else
    return (
      <>
        <div className="staff-head-row d-flex justify-content-between">
          <h3>Nhân viên</h3>
          <div className="staff-add-new">
            <YLButton
              variant="primary"
              onClick={() => history.push("/manager/product/addnew")}
              value="Thêm"
              to={"/manager/staff/addNew"}
            />
          </div>
        </div>
        <div className="manager-staff-show mt-3 bg-white bg-shadow">
          <span>Tất cả nhân viên</span>
          <hr />
          <ManagerSort
            filter={filter}
            setFilter={setFilter}
            options={options}
            setActivePage={setActivePage}
          />
          {/* <ManagerSort /> */}
          {(staffList?.data?.userDtoOutList?.length > 0 ||
          staffList?.data?.data !== null) ? (
            <table className="table">
              <tbody>
                <tr>
                  <th>#</th>
                  <th>Tên</th>
                  <th>Giới tính</th>
                  <th
                    onClick={() =>
                      setFilter({
                        ...filter,
                        sortBy: "phone",
                        isAsc: !filter.isAsc,
                      })
                    }
                  >
                    Số điện thoại
                  </th>
                  <th>Trạng thái</th>
                  <th>Vị trí</th>
                  <th></th>
                </tr>
                {staffList?.data?.userDtoOutList?.map((item, i) => (
                  <tr key={"staff-" + i} className="hover-background">
                    <td>{(activePage - 1) * totalItem + i + 1}</td>
                    <td>{item?.username ? item?.username : "-"}</td>
                    <td>
                      {item.gender == null ? "-" : item.gender ? "Nam" : "Nữ"}
                    </td>
                    <td>{item.phone}</td>
                    <td>{item.enabled ? "Hoạt động" : "Không hoạt động"}</td>
                    <td>{detectRole(item.roles)}</td>
                    <td>
                      {item.enabled ? (
                        <ConfirmPopup
                          variant="link"
                          width="70px"
                          height="25px"
                          btnText={
                            <i className="far fa-user-slash text-danger"></i>
                          }
                          title="Chặn"
                          content={`Bạn chắc chắn muốn chặn ${
                            item.username ? item.username : item.phone
                          } ?`}
                          onConfirm={() => handleSwitchStatus(item)}
                        />
                      ) : (
                        <ConfirmPopup
                          variant="link"
                          width="70px"
                          height="25px"
                          title="Bỏ chặn"
                          btnText={<i className="far fa-user text-success"></i>}
                          content={`Bạn chắc chắn muốn bỏ chặn ${
                            item.username ? item.username : item.phone
                          } ?`}
                          onConfirm={() => handleSwitchStatus(item)}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center mt-4">Không có dữ liệu </p>
          )}

          {staffList?.data?.discountVouchers?.length <= 0 && (
            <p>Không có nhân viên nào! </p>
          )}
          <div className="m-auto p-4 d-flex justify-content-center">
            {staffList?.data?.totalPage >= 1 && (
              <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={activePage}
                itemsCountPerPage={totalItem}
                totalItemsCount={staffList?.data?.totalUser}
                pageRangeDisplayed={filterConfig.PAGE_RANGE_DISPLAYED}
                onChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </>
    );
}

export default ManagerStaff;
