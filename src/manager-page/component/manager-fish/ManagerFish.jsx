import ManagerFishAPI from "api/manager-fish-api";
import Editor from "assets/icon/editor.svg";
import Trash from "assets/icon/trash.svg";
import ConfirmPopup from "components/confirm-popup/ComfirmPopup";
import YLButton from "components/custom-field/YLButton";
import ErrorLoad from "components/error-notify/ErrorLoad";
import Loading from "components/Loading";
import { filterConfig } from "constant/filter-setting";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useHistory, useLocation } from "react-router-dom";
import "./scss/manager-fish.scss";




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
        listCateId: [

        ],
        listFishId: [

        ],
        page: 0,
        sortBy: "fishId"
    });
    const location = useLocation();
    const setBack = {
        canBack: true,
        path: location,
        label: "Fish",
    };

    function handlePageChange(newPage) {
        setActivePage(newPage);
        setFilter({ ...filter, page: newPage - 1 });
    }
    const history = useHistory();

    const handleDelete = async (id) => {
        console.log(id);
        try {
            const response = await ManagerFishAPI.delete(id);
            if (response.error) {
                throw new Error(response.error);
            } else {
                alert("Xóa loại cá thành công");
            }
            fetchManagerFish();
        } catch (error) {
            alert("Xóa loại cá thất bại");
            console.log("fail to fetch delete address");
        }

    };

    const handleEditClicked = (id) => {
        history.push({
            pathname: "/manager/fish/edit/" + id,
            canBack: setBack,
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
                isSuccess: true
            });
        } catch (error) {
            setFishList({ data: null, isLoading: false, isSuccess: false });
            console.log("fail to fetch address");
        }
    };
    useEffect(() => {
        fetchManagerFish();
    }, [filter]);

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
                            variant="warning"
                            value="Thêm"
                            to={{ pathname: "/manager/fish/addnew", canBack: setBack }}
                        />
                    </div>
                </div>
                <div className="manager-fish-show mt-3 bg-white bg-shadow">
                    <h4 >tất cả loại cá</h4>
                    <hr />
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
                                    <td>{i + 1}</td>
                                    <td>{item.fishName}</td>
                                    <td className="d-flex float-end">
                                        <img src={Editor}
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
