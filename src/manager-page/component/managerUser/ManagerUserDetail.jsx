import ManagerUserApi from "api/manager-user-api";
import ErrorLoad from "components/error-notify/ErrorLoad";
import Loading from "components/Loading";
import React, { useEffect, useState } from "react";

function ManagerUserDetail(props) {
  const userId = props.match.params.id;
  const [user, setUser] = useState({
    data: null,
    isSuccess: true,
    isLoading: false,
  });
  const fetchUser = async () => {
    setUser({ ...user, isLoading: true });
    try {
      const response = await ManagerUserApi.getUserById(userId);
      if (response.error) {
        throw new Error(response.error);
      } else {
        setUser({
          data: response,
          isSuccess: true,
          isLoading: false,
        });
      }
    } catch (error) {
      setUser({
        ...user,
        isSuccess: false,
        isLoading: false,
      });
      console.log("fail to fetch user detail");
    }
  };
  useEffect(() => {
    fetchUser();
  }, [userId]);
  if (user.isLoading) {
    return <Loading hasLayout />;
  } else if (!user.isSuccess) {
    return <ErrorLoad hasLayout />;
  } else
    return (
      <>
        <div className="user-head-row">
          <h3>{user?.data?.username}</h3>
        </div>
        <div className="bg-box bg-shadow mt-4 py-3">
          <h6>Thông tin tổng quan của khách hàng</h6>
        </div>
        <div className="bg-box bg-shadow mt-4 py-3">
          <div className="row">
              <div className="col-6">
                  <table className="table">
                      <tbody>
                          <tr>
                              <td>
                                  Tên khách hàng
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  Số điện thoại
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
        </div>
      </>
    );
}

export default ManagerUserDetail;
