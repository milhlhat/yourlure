import ManagerUserApi from "api/manager-user-api";
import Loading from "components/Loading";
import { filterConfig } from "constant/filter-setting";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useDispatch } from "react-redux";
import { setIsBack } from 'redux/back-action/back-action';
import './scss/manager-user.scss';
import { Tooltip } from '@material-ui/core';

ManagerUser.propTypes = {};

function ManagerUser(props) {
  const totalItem = 10;
  const [filterUser,setFilterUser]=useState({
    isAsc: true,
    keyword: "",
    limit: totalItem,
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
  }, [filterUser]);
  if(userList.isLoading){
    return <Loading />;
  } else
  return (
    <>
      <div className="user-head-row">
        <h3>Khách hàng</h3>
        <div className="product-add-new">
        </div>
      </div>
      <div className="manager-user-show mt-3 bg-white bg-shadow">
          <span>tất cả Khách hàng</span>
          <hr />
          {/* <ManagerSort /> */}
          {userList?.data?.userDtoOutList?.length <= 0 && <p>Không có sản phẩm </p>}
          <table className="table">
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
                  <tr key={'manager-user-'+i} className="hover-background">
                    <td>
                      {(activePage - 1) * totalItem +
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
                    
                    {item.enabled&&<Tooltip title="Chặn"> 
                      
                      <i className="far fa-user-slash pointer" onClick={()=>console.log("đã chặn ",item.userId)}></i>
                      </Tooltip>}
                    {!item.enabled&&<Tooltip title="Bỏ chặn">
                      
                    <i className="far fa-user pointer"></i>
                      </Tooltip>}
                    
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
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
