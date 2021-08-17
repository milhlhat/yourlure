import ManagerFishAPI from "api/manager-fish-api";
import Editor from "assets/icon/editor.svg";
import Trash from "assets/icon/trash.svg";
import ConfirmPopup from "components/confirm-popup/ComfirmPopup";
import YLButton from "components/custom-field/YLButton";
import ErrorLoad from "components/error-notify/ErrorLoad";
import Loading from "components/Loading";
import { filterConfig } from "constants/filter-setting";

import ManagerSort from "pages/manager-pages/component/sort/ManagerSort";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Pagination from "react-js-pagination";
import { useHistory } from "react-router-dom";
import "./scss/manager-fish.scss";
import { toast } from "react-toastify";

ManagerFish.propTypes = {};

function ManagerFish(props) {
  const [activePage, setActivePage] = useState(1);
  const [fishList, setFishList] = useState({
    data: [],
    isLoading: false,
    isSuccess: true,
  });
  const [filter, setFilter] = useState({
    isAsc: true,
    keyword: "",
    limit: filterConfig.LIMIT_DATA_PER_PAGE,
    listCateId: [],
    listFishId: [],
    page: 0,
    sortBy: "fishId",
  });

  //option sort
  const options = [
    {
      display: "Cũ nhất",
      isAsc: true,
      sortBy: "fishId",
      value: "SORT_id_ASC",
    },
    {
      display: "Mới nhất",
      isAsc: false,
      sortBy: "fishId",
      value: "SORT_id_DESC",
    },
    {
      display: "Tên từ A-Z",
      isAsc: true,
      sortBy: "fishName",
      value: "SORT_NAME_DESC",
    },
    {
      display: "Tên từ Z-A",
      isAsc: false,
      sortBy: "fishName",
      value: "SORT_NAME_DESC",
    },
  ];

  function handlePageChange(newPage) {
    setActivePage(newPage);
    setFilter({ ...filter, page: newPage - 1 });
  }

  const history = useHistory();

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await ManagerFishAPI.delete(id);

      toast.success("Xóa loại cá thành công");

      await fetchManagerFish();
    } catch (error) {
      toast.error("Xóa loại cá thất bại");
    }
  };

  const handleEditClicked = (id) => {
    history.push({
      pathname: "/manager/fish/edit/" + id,
    });
  };

  const fetchManagerFish = async () => {
    setFishList((prevState) => {
      return { ...prevState, isLoading: true };
    });
    try {
      const response = await ManagerFishAPI.getAll(filter);
      setFishList({
        data: response,
        isLoading: false,
        isSuccess: true,
      });
    } catch (error) {
      setFishList({ data: null, isLoading: false, isSuccess: false });
      console.log("fail to fetch address");
    }
  };
  useEffect(() => {
    fetchManagerFish();
  }, [filter]);

  const onsubmit = async (data) => {
    let searchFilter = { ...filter, keyword: data.keyWord };
    setFilter({ ...filter, keyword: data.keyWord });
    setFishList((prevState) => {
      return { ...prevState, isLoading: true };
    });
    try {
      const response = await ManagerFishAPI.getAll(searchFilter);
      setFishList({ data: response, isLoading: false, isSuccess: true });
    } catch (error) {
      setFishList({ data: null, isLoading: false, isSuccess: false });
    }
  };

  if (fishList.isLoading) {
    return <Loading />;
  } else if (!fishList.isSuccess) {
    return <ErrorLoad />;
  } else
    return (
      <>
        <div className="fish-head-row">
          <h3>Loại Cá</h3>
          <div className="product-add-new">
            <YLButton
              variant="primary"
              value="Thêm"
              to={"/manager/fish/addnew"}
            />
          </div>
        </div>
        <div className="manager-fish-show mt-3 bg-white bg-shadow">
          <span>Tất cả loại cá</span>
          <hr />
          <ManagerSort
            filter={filter}
            setFilter={setFilter}
            options={options}
            setActivePage={setActivePage}
          />
          <table>
            <tbody>
              <tr>
                <th>#</th>
                <th>Tên loại cá</th>
                <th></th>
                <th></th>
              </tr>
              {fishList.data?.fishDtoOuts?.map((item, i) => (
                <tr key={"fish-" + i} className="hover-background">
                  <td>
                    {(activePage - 1) * filterConfig.LIMIT_DATA_PER_PAGE +
                      1 +
                      i}
                  </td>
                  <td
                    className="pointer"
                    onClick={() =>
                      history.push({
                        pathname: "/manager/fish/detail/" + item.fishID,
                      })
                    }
                  >
                    {item.fishName}
                  </td>
                  <td className="d-flex float-end">
                    <img
                      src={Editor}
                      className="pointer"
                      onClick={() => handleEditClicked(item.fishID)}
                    />
                    <ConfirmPopup
                      variant="link"
                      width="70px"
                      height="25px"
                      btnText={<img src={Trash} />}
                      content="Bạn chắc chắn muốn xóa?"
                      onConfirm={() => handleDelete(item.fishID)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="m-auto p-4 m-auto p-4 d-flex justify-content-center">
            {fishList?.data?.totalPage > 1 && (
              <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={activePage}
                itemsCountPerPage={filterConfig.LIMIT_DATA_PER_PAGE}
                totalItemsCount={fishList?.data?.totalItem}
                pageRangeDisplayed={filterConfig.PAGE_RANGE_DISPLAYED}
                onChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </>
    );
}

export default ManagerFish;
