import ManagerCampaignAPI from "api/manager-campaign-api";
import Editor from "assets/icon/editor.svg";
import Trash from "assets/icon/trash.svg";
import ConfirmPopup from "components/confirm-popup/ComfirmPopup";
import YLButton from "components/custom-field/YLButton";
import Loading from "components/Loading";
import { filterConfig } from "constant/filter-setting";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { setIsBack } from "redux/back-action/back-action";
import "./scss/manager-campaign.scss";

function ManagerCampaign(props) {
    const totalItem = 10;
    const history = useHistory();
    const [filter, setFilter] = useState({
        isAsc: true,    
        keyword: "",
        limit: totalItem,
        page: 0,
        sortBy: "campaignId",
        typeSearch: "",
    });
    const [campaignList, setCampaignList] = useState({
        data: [],
        isLoading: false,
        isSuccess: true,
    });
    const location = useLocation();
    const setBack = {
        canBack: true,
        path: location,
        label: "Chiến dịch",
    };
    const [activePage, setActivePage] = useState(1);
    function handlePageChange(newPage) {
        setActivePage(newPage);
        setFilter({ ...filter, page: newPage - 1 });
    }
    //delete category
    const handleDelete = async (id) => {
        try {
            const response = await ManagerCampaignAPI.delete(id);
            console.log(response);
            if (response === true) {
                alert("Xóa chiến dịch thành công");
            } else {
                alert("Xóa chiến dịch thất bại! \nChiến dịch đang thực hiện không thể xóa!");
            }
            if (response.data != null && !response.data) {
                throw new Error();
            } else if (response.error) {
                throw new Error(response.error);
            } else {
                fetchManagerCampaign();
            }
        } catch (error) {
            console.log("fail to fetch delete campaign");
        }
    };
    //format date
    const formatDate = (date) => {
        let formatDate = new Date(date);
        return (
            ` 0${(formatDate.getDate() + 1)}`.slice(-2) +
            "-" +
            ` 0${(formatDate.getMonth() + 1)}`.slice(-2) +
            "-" +
            formatDate.getFullYear()
        );
    };

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
            console.log(filter);
            const response = await ManagerCampaignAPI.getAll(filter);
            console.log(response);
            setCampaignList({ data: response, isLoading: false, isSuccess: true });
        } catch (error) {
            setCampaignList({ data: null, isLoading: false, isSuccess: false });
            console.log("fail to fetch address");
        }
    };
    useEffect(() => {
        fetchManagerCampaign();
    }, [filter]);

    if (campaignList.isLoading) {
        return <Loading />;
    } else
        return (
            <>
                <div className="staff-head-row d-flex justify-content-between">
                    <h3>Chiến dịch</h3>
                    <div className="staff-add-new">
                        <YLButton
                            variant="primary"
                            to={{
                                pathname: "/manager/campaign/addnew",
                                canBack: setBack
                            }}
                            value="Thêm"
                        />
                    </div>
                </div>
                <div className="manager-show mt-3 bg-white bg-shadow">
                    <span>Tất cả chiến dịch</span>
                    <hr />
                    {/* <ManagerSort /> */}
                    {campaignList?.data?.length <= 0 && (
                        <p>Không có sản phẩm </p>
                    )}
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Tên chiến dịch (banner)</th>
                                <th>Ngày bắt đầu</th>
                                <th>Ngày kết thúc</th>
                                <th></th>
                            </tr>
                            {campaignList?.data?.campaignDtoOuts?.map((item, i) => (
                                <tr key={"campaign-" + i} className="hover-background">
                                    <td>{(activePage - 1) * totalItem + i + 1}</td>
                                    <td>{item?.banner ? item?.banner : "-"}</td>
                                    <td>
                                        {item.startDate ? formatDate(item.startDate) : "-"}
                                    </td>
                                    <td>{item.endDate ? formatDate(item.endDate) : "-"}</td>
                                    <td className="d-flex float-end">
                                        <img
                                            src={Editor}
                                            className="pointer"
                                            onClick={() =>
                                                history.push({
                                                    pathname:
                                                        "/manager/campaign/edit/" + item.campaignId,
                                                    canBack: setBack,
                                                })
                                            }
                                        />
                                        <ConfirmPopup
                                            variant="link"
                                            width="70px"
                                            height="25px"
                                            btnText={<img src={Trash} />}
                                            title="Xóa"
                                            content="Bạn chắc chắn muốn xóa chiến dịch?"
                                            onConfirm={() => handleDelete(item.campaignId)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="m-auto p-4 d-flex justify-content-center">
                        {campaignList?.data?.campaignDtoOuts?.totalPage >= 1 && (
                            <Pagination
                                itemClass="page-item"
                                linkClass="page-link"
                                activePage={activePage}
                                itemsCountPerPage={totalItem}
                                totalItemsCount={campaignList?.data?.campaignDtoOuts?.totalItem}
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
