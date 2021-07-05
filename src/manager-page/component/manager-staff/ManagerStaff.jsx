import ManagerUserApi from "api/manager-user-api";
import Loading from "components/Loading";
import { filterConfig } from "constant/filter-setting";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useDispatch } from "react-redux";
import { setIsBack } from 'redux/back-action/back-action';
import YLButton from "components/custom-field/YLButton";
import './scss/manager-staff.scss';
import { useHistory } from "react-router-dom";

function ManagerStaff(props) {
    const totalItem = 10;
    const history = useHistory();
  const [filterStaff,setFilterStaff]=useState({
    isAsc: true,
    keyword: "",
    limit: totalItem,
    page: 0,
    sortBy: "userId",
    typeSearch: ""
  })
  const [staffList, setStaffList] = useState({
    data: [],
    isLoading: false,
    isSuccess: true,
  });
  const [activePage, setActivePage] = useState(1);
  function handlePageChange(newPage) {
    setActivePage(newPage);
    setFilterStaff({...filterStaff,page:newPage-1})
  }

  const dispatch = useDispatch();
  useEffect(()=>{
    const action = setIsBack({
      canBack: false,
      path: "",
      label: "",
    });
    dispatch(action);
  },[])


  const detectRole = (role)=>{
    if(role){
        if(role==="ROLE_ADMIN") return 'Quản lý'
        if(role==="ROLE_STAFF") return 'Nhân viên'
        if(role==="ROLE_CUSTOMER") return 'Khách hàng'
        return 'chưa xác định'
        
    }
    else return '-';
  }


  const fetchManagerStaff = async () => {
    setStaffList((prevState) => {
      return { ...prevState, isLoading: true };
    });
    try {
      const response = await ManagerUserApi.getStaffAll(filterStaff);
      setStaffList({ data: response, isLoading: false, isSuccess: true });
    } catch (error) {
      setStaffList({ data: null, isLoading: false, isSuccess: false });
      console.log("fail to fetch address");
    }
  };
  useEffect(() => {
    fetchManagerStaff();
  }, [filterStaff]);
  if(staffList.isLoading){
    return <Loading />;
  } else
    return (
        <>
      <div className="staff-head-row d-flex justify-content-between">
        <h3>Khách hàng</h3>
        <div className="staff-add-new">
            <YLButton
              variant="primary"
              onClick={() => history.push("/manager/product/addnew")}
              value="Thêm"
              to={"/manager/staff/addNew" }
            />
        </div>
      </div>
      <div className="manager-staff-show mt-3 bg-white bg-shadow">
          <span>tất cả Khách hàng</span>
          <hr />
          {/* <ManagerSort /> */}
          {staffList?.data?.userDtoOutList?.length <= 0 && <p>Không có sản phẩm </p>}
          <table>
            <tbody>
              <tr>
                <th>#</th>
                <th>Tên</th>
                <th>Giới tính</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Trạng thái</th>
                <th>Vị trí</th>
                <th></th>
              </tr>
              {staffList?.data?.userDtoOutList?.map((item, i) => (
                  <tr key={i}>
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
                      {detectRole(item.roles[0])}
                    </td>
                    <td>
                      {item.enabled&&<i className="far fa-user-slash"></i>}
                      {!item.enabled&&<i className="far fa-user"></i>}
                    
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
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