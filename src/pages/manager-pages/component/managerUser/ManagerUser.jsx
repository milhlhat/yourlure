import { Tooltip } from "@material-ui/core";
import ManagerUserApi from "api/manager-user-api";
import ConfirmPopup from "components/confirm-popup/ComfirmPopup";
import Loading from "components/Loading";
import { filterConfig } from "constants/filter-setting";
import ManagerSort from "pages/manager-pages/component/sort/ManagerSort";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "./scss/manager-user.scss";

ManagerUser.propTypes = {};

function ManagerUser(props) {
  const totalItem = 10;
  const history = useHistory();
  const [filterUser, setFilterUser] = useState({
    isAsc: true,
    keyword: "",
    limit: totalItem,
    page: 0,
    sortBy: "user_id",
    typeSearch: "",
  });
  const [userList, setUserList] = useState({
    data: [],
    isLoading: false,
    isSuccess: true,
  });
  const [activePage, setActivePage] = useState(1);
  function handlePageChange(newPage) {
    setActivePage(newPage);
    setFilterUser({ ...filterUser, page: newPage - 1 });
  }

  const SORT_OPTIONS = [
    {
      display: "Tên A-Z",
      isAsc: true,
      sortBy: "username",
      value: "SORT_NAME_ASC",
    },
    {
      display: "Tên Z-A",
      isAsc: false,
      sortBy: "username",
      value: "SORT_NAME_DESC",
    },
    {
      display: "Số đơn hàng",
      isAsc: false,
      sortBy: "number_of_order",
      value: "SORT_ORDER_DESC",
    },
  ];

  const handleSwitchStatus = async (data) => {
    try {
      const response = await ManagerUserApi.switchStatus(data.userId);
      if (response.data != null && !response.data) {
        throw new Error();
      } else {
        fetchManagerUser();
      }
    } catch (error) {
      data.enabled
        ? toast.error(
            `Chặn ${data.username ? data.username : data.phone} thất bại`
          )
        : toast.error(
            `Bỏ chặn ${data.username ? data.username : data.phone} thất bại`
          );
      console.log("fail to switch status user");
    }
  };

  const fetchManagerUser = async () => {
    setUserList((prevState) => {
      return { ...prevState, isLoading: true };
    });
    try {
      const response = await ManagerUserApi.getAll(filterUser);
      setUserList({ data: response, isLoading: false, isSuccess: true });
    } catch (error) {
      setUserList({ data: null, isLoading: false, isSuccess: false });
      console.log("fail to fetch address");
    }
  };
  useEffect(() => {
    fetchManagerUser();
  }, [filterUser]);
  if (userList.isLoading) {
    return <Loading />;
  } else
    return (
      <>
        <div className="user-head-row">
          <h3>Khách hàng</h3>
          <div className="product-add-new" />
        </div>
        <div className="manager-user-show mt-3 bg-white bg-shadow">
          <span>Tất cả khách hàng</span>
          <hr />
          <ManagerSort
            filter={filterUser}
            setFilter={setFilterUser}
            options={SORT_OPTIONS}
            setActivePage={setActivePage}
          />
          {userList?.data?.userDtoOutList?.length <= 0 && (
            <p>Không có khách hàng</p>
          )}
          <div className="table-responsive">
            <table className="table">
              <tbody>
                <tr>
                  <th>#</th>
                  <th>Tên</th>
                  <th>Giới tính</th>
                  <th>Số điện thoại</th>
                  <th>Trạng thái</th>
                  <th>Số đơn hàng</th>
                  <th />
                </tr>
                {userList?.data?.userDtoOutList?.map((item, i) => (
                  <tr key={"manager-user-" + i} className="hover-background">
                    <td>{(activePage - 1) * totalItem + i + 1}</td>
                    <td
                      className="pointer"
                      onClick={() =>
                        history.push(`/manager/user/detail/${item?.userId}`)
                      }
                    >
                      {item?.username ? item?.username : "-"}
                    </td>
                    <td>
                      {item.gender == null ? "-" : item.gender ? "Nam" : "Nữ"}
                    </td>
                    <td>{item.phone}</td>
                    <td>{item.enabled ? "Hoạt động" : "Không hoạt động"}</td>
                    <td>{item.numberOfOrder}</td>
                    <td>
                      {item.enabled ? (
                        <Tooltip title="Chặn">
                          <div>
                            <ConfirmPopup
                              variant="link"
                              width="70px"
                              height="25px"
                              btnText={
                                <i className="far fa-user-slash text-danger" />
                              }
                              content={`Bạn chắc chắn muốn chặn ${
                                item.username ? item.username : item.phone
                              } ?`}
                              onConfirm={() => handleSwitchStatus(item)}
                            />
                          </div>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Bỏ chặn">
                          <div>
                            <ConfirmPopup
                              variant="link"
                              width="70px"
                              height="25px"
                              btnText={
                                <i className="far fa-user text-success" />
                              }
                              content={`Bạn chắc chắn muốn bỏ chặn ${
                                item.username ? item.username : item.phone
                              } ?`}
                              onConfirm={() => handleSwitchStatus(item)}
                            />
                          </div>
                        </Tooltip>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="m-auto p-4 d-flex justify-content-center">
            {userList?.data?.totalPage >= 1 && (
              <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={activePage}
                itemsCountPerPage={totalItem}
                totalItemsCount={userList?.data?.totalUser}
                pageRangeDisplayed={filterConfig.PAGE_RANGE_DISPLAYED}
                onChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </>
    );
}

export default ManagerUser;
