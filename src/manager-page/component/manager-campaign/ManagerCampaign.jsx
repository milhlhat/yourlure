import ManagerCampaignAPI from "api/manager-campaign-api";
import ConfirmPopup from "components/confirm-popup/ComfirmPopup";
import YLButton from "components/custom-field/YLButton";
import Loading from "components/Loading";
import { filterConfig } from "constant/filter-setting";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setIsBack } from "redux/back-action/back-action";
import "./scss/manager-staff.scss";

function ManagerCampaign(props) {
    const totalItem = 10;
    const history = useHistory();
    const [filterStaff, setFilterStaff] = useState({
        isAsc: true,
        keyword: "",
        limit: totalItem,
        page: 0,
        sortBy: "user_id",
        typeSearch: "",
    });
    const [campaignList, setCampaignList] = useState({
        data: [],
        isLoading: false,
        isSuccess: true,
    });
    const [activePage, setActivePage] = useState(1);
    function handlePageChange(newPage) {
        setActivePage(newPage);
        setFilterStaff({ ...filterStaff, page: newPage - 1 });
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

    const fetchManagerCampaign = async () => {
        setCampaignList((prevState) => {
            return { ...prevState, isLoading: true };
        });
        try {
            const response = await ManagerCampaignAPI.getAll();
            console.log(response);
            setCampaignList({ data: response, isLoading: false, isSuccess: true });
        } catch (error) {
            setCampaignList({ data: null, isLoading: false, isSuccess: false });
            console.log("fail to fetch address");
        }
    };
    useEffect(() => {
        fetchManagerCampaign();
    }, []);
    if (campaignList.isLoading) {
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
                <div className="manager-show mt-3 bg-white bg-shadow">
                    <span>Tất cả nhân viên</span>
                    <hr />
                    {/* <ManagerSort /> */}
                    {campaignList?.data?.userDtoOutList?.length <= 0 && (
                        <p>Không có sản phẩm </p>
                    )}
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Tên</th>
                                <th>Giới tính</th>
                                <th onClick={() => setFilterStaff({ ...filterStaff, sortBy: "phone", isAsc: !filterStaff.isAsc })}>Số điện thoại</th>
                                <th>Email</th>
                                <th>Trạng thái</th>
                                <th>Vị trí</th>
                                <th></th>
                            </tr>
                            {campaignList?.data?.userDtoOutList?.map((item, i) => (
                                <tr key={"staff-" + i} className="hover-background">
                                    <td>{(activePage - 1) * totalItem + i + 1}</td>
                                    <td>{item?.username ? item?.username : "-"}</td>
                                    <td>
                                        {item.gender == null ? "-" : item.gender ? "Nam" : "Nữ"}
                                    </td>
                                    <td>{item.phone}</td>
                                    <td>{item.userEmail ? item.userEmail : "-"}</td>
                                    <td>{item.enabled ? "Hoạt động" : "Không hoạt động"}</td>
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
                                                content={`Bạn chắc chắn muốn chặn ${item.username ? item.username : item.phone
                                                    } ?`}
                                            />
                                        ) : (
                                            <ConfirmPopup
                                                variant="link"
                                                width="70px"
                                                height="25px"
                                                title="Bỏ chặn"
                                                btnText={<i className="far fa-user text-success"></i>}
                                                content={`Bạn chắc chắn muốn bỏ chặn ${item.username ? item.username : item.phone
                                                    } ?`}
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="m-auto p-4 d-flex justify-content-center">
                        {campaignList?.data?.totalPage >= 1 && (
                            <Pagination
                                itemClass="page-item"
                                linkClass="page-link"
                                activePage={activePage}
                                itemsCountPerPage={totalItem}
                                totalItemsCount={campaignList?.data?.totalUser}
                                pageRangeDisplayed={filterConfig.PAGE_RANGE_DISPLAYED}
                                onChange={handlePageChange}
                            />
                        )}
                    </div>
                </div>
            </>
        );
}

export default ManagerCampaign;
