import React, { useState } from "react";
import PropTypes from "prop-types";
import YLButton from "components/custom-field/YLButton";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {setIsBack} from 'redux/back-action/back-action';
import ManagerUserApi from "api/manager-user-api";
import Pagination from "react-js-pagination";
import { filterConfig } from "constant/filter-setting";
import Editor from "assets/icon/editor.svg";
import './scss/manager-user.scss';

ManagerUser.propTypes = {};

function ManagerUser(props) {
  
  const [filterUser,setFilterUser]=useState({
    isAsc: true,
    keyword: "",
    limit: 12,
    page: 0,
    sortBy: "userId",
    typeSearch: ""
  })
  const [userList, setUserList] = useState({
    data: [],
    isLoading: false,
    isSuccess: true,
  });
  const [activePage, setActivePage] = useState(1);
  function handlePageChange(newPage) {
    setActivePage(newPage);
    setFilterUser({...filterUser,page:newPage-1})
  }

  const dispatch = useDispatch();
  useEffect(()=>{
    console.log("object");
    const action = setIsBack({
      canBack: true,
      path: "/manager/product",
      label: "Product",
    });
    dispatch(action);
  },[])


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
  }, []);
  return (
    <>
      <div className="user-head-row">
        <h3>Khách hàng</h3>
        <div className="product-add-new">
          {console.log(userList?.data)}

        </div>
      </div>
      <div className="manager-user-show mt-3 bg-white bg-shadow">
          <span>tất cả Khách hàng</span>
          <hr />
          {/* <ManagerSort /> */}
          {userList?.data?.userDtoOutList?.length <= 0 && <p>Không có sản phẩm </p>}
          <table>
            <tbody>
              <tr>
                <th>#</th>
                <th>Tên</th>
                <th>Giới tính</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Trạng thái</th>
                <th>Số đơn hàng</th>
                <th></th>
              </tr>
              {userList?.data?.userDtoOutList?.map((item, i) => (
                  <tr key={i}>
                    <td>
                      {(activePage - 1) * filterConfig.LIMIT_DATA_PER_PAGE +
                        i +
                        1}
                    </td>
                    <td>
                      {item?.username?item?.username:'-'}
                    </td>
                    <td>
                      {item.gender==null?'-':item.gender?'Nam':'Nữ'}
                    </td>
                    <td>{item.phone}</td>
                    <td>{item.userEmail?item.userEmail:'-'}</td>
                    <td>{item.enabled?'Hoạt động':'Không hoạt động'}</td>
                    <td>
                      {item.numberOfOrder}
                    </td>
                    <td>
                      {item.enabled&&<i className="far fa-user-slash"></i>}
                      {!item.enabled&&<i className="far fa-user"></i>}
                    
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="m-auto p-4">
            {userList.totalPage > 1 && (
              <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={activePage}
                itemsCountPerPage={filterConfig.LIMIT_DATA_PER_PAGE}
                totalItemsCount={userList.totalUser}
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
