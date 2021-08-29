import { deleteCampaignById, getAllCampaign } from "api/manager-campaign-api";
import Trash from "assets/icon/trash.svg";
import ConfirmPopup from "components/confirm-popup/ComfirmPopup";
import YLButton from "components/custom-field/YLButton";
import Loading from "components/Loading";
import { filterConfig } from "constants/filter-setting";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useDispatch } from "react-redux";
import Editor from "assets/icon/editor.svg";

import { Link, useHistory, useLocation } from "react-router-dom";
import { setIsBack } from "store/back-action/back-action";
import "./scss/manager-campaign.scss";
import { toast } from "react-toastify";
import ManagerSort from "../sort/ManagerSort";
import { formatDate } from "../../../../utils/format-string";
import DEFINELINK from "../../../../routes/define-link";

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
    label: "Sự kiện",
  };
  //option sort
  const options = [
    {
      display: "Cũ nhất",
      isAsc: true,
      sortBy: "campaignId",
      value: "SORT_id_ASC",
    },
    {
      display: "Mới nhất",
      isAsc: false,
      sortBy: "campaignId",
      value: "SORT_id_DESC",
    },
    {
      display: "Tên từ A-Z",
      isAsc: true,
      sortBy: "banner",
      value: "SORT_NAME_DESC",
    },
    {
      display: "Tên từ Z-A",
      isAsc: false,
      sortBy: "banner",
      value: "SORT_NAME_DESC",
    },
  ];
  const [activePage, setActivePage] = useState(1);

  function handlePageChange(newPage) {
    setActivePage(newPage);
    setFilter({ ...filter, page: newPage - 1 });
  }

  //delete category
  const handleDelete = async (id) => {
    try {
      const response = await deleteCampaignById(id);
      if (response === true) {
        fetchManagerCampaign();
        toast.success("Xóa sự kiện thành công");
      } else {
        toast.error(
          `Xóa sự kiện thất bại! 
          Sự kiện đang thực hiện không thể xóa!`
        );
      }
    } catch (error) {
      toast.error(`Xóa sự kiện thất bại! 
        Lỗi hệ thống`);
    }
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
      const response = await getAllCampaign(filter);
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
          <h3>Sự kiện</h3>
          <div className="staff-add-new">
            <YLButton
              variant="primary"
              to={{
                pathname: "/manager/campaign/addnew",
                canBack: setBack,
              }}
              value="Thêm"
            />
          </div>
        </div>
        <div className="manager-show mt-3 bg-white bg-shadow">
          <span>Tất cả sự kiện</span>
          <hr />
          <ManagerSort
            filter={filter}
            setFilter={setFilter}
            options={options}
          />

          {campaignList?.data?.length <= 0 && <p>Chưa có sự kiện </p>}
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Tên sự kiện</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày kết thúc</th>

                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {campaignList?.data?.campaignDtoOuts?.map((item, i) => (
                <tr
                  key={"campaign-" + i}
                  className="hover-background pointer"
                  onClick={() =>
                    history.push(
                      DEFINELINK.manager +
                        DEFINELINK.campaign +
                        "/detail/" +
                        item.campaignId
                    )
                  }
                >
                  <td>{(activePage - 1) * totalItem + i + 1}</td>
                  <td>{item?.banner ? item?.banner : "-"}</td>
                  <td>{item.startDate ? formatDate(item.startDate) : "-"}</td>
                  <td>{item.endDate ? formatDate(item.endDate) : "-"}</td>
                  <td
                    className={"item-action"}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Link
                      to={{
                        pathname: "/manager/campaign/edit/" + item.campaignId,
                        state: {},
                      }}
                    >
                      <img
                        src={Editor}
                        className="fad fa-pencil-alt text-success pointer"
                      />
                    </Link>
                  </td>
                  <td
                    className={"item-action"}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <ConfirmPopup
                      variant="link"
                      width="15px"
                      height="25px"
                      btnText={<img src={Trash} />}
                      title="Xóa"
                      content="Bạn chắc chắn muốn xóa sự kiện?"
                      onConfirm={(e) => handleDelete(item.campaignId)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {campaignList?.data?.discountVouchers?.length <= 0 && (
            <p>Không có sự kiện nào! </p>
          )}
          <div className="m-auto p-4 d-flex justify-content-center">
            {campaignList?.data?.totalPage >= 1 && (
              <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={activePage}
                itemsCountPerPage={filterConfig.LIMIT_DATA_PER_PAGE}
                totalItemsCount={campaignList?.data?.totalItem}
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
