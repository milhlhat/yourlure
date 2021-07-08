import ManagerVoucherAPI from "api/manager-voucher";
import Editor from "assets/icon/editor.svg";
import YLButton from "components/custom-field/YLButton";
import Trash from "assets/icon/trash.svg";
import ConfirmPopup from "components/confirm-popup/ComfirmPopup";
import Loading from "components/Loading";
import { filterConfig } from "constant/filter-setting";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useHistory, useLocation } from "react-router-dom";
import './scss/manager-discount-voucher.scss';

ManagerVoucher.propTypes = {};

function ManagerVoucher() {
    const history = useHistory();
    const location = useLocation();
    const [activePage, setActivePage] = useState(1);
    const [filter, setFilter] = useState({
        isAsc: true,
        keyword: "",
        limit: filterConfig.LIMIT_DATA_PER_PAGE,
        listCateId: [],
        listFishId: [],
        page: filterConfig.PAGE_NUMBER_DEFAULT,
        sortBy: "discountVoucherId"
    })
    const [voucherList, setVoucherList] = useState({
        data: [],
        isLoading: false,
        isSuccess: true,
    });

    const setBack = {
        canBack: true,
        path: location,
        label: "Sản phẩm",
    };

    function handlePageChange(newPage) {
        setActivePage(newPage);
        setFilter({ ...filter, page: newPage - 1 })
    }

    const handleDelete = async (id) => {
        console.log(id);
        try {
            const response = await ManagerVoucherAPI.delete(id);
            if (response.error) {
                throw new Error(response.error);
            } else {
                alert("Xóa loại cá thành công");
            }
            fetchVoucher();
        } catch (error) {
            alert("Xóa loại cá thất bại");
            console.log("fail to fetch delete address");
        }

    };

    const handleEditClicked = (id) => {
        history.push({
            pathname: "/manager/voucher/edit/" + id,
            canBack: setBack,
        });
    };

    useEffect(() => {
        fetchVoucher();
    }, [filter]);


    const fetchVoucher = async () => {
        setVoucherList((prevState) => {
            return { ...prevState, isLoading: true };
        });

        try {
            const response = await ManagerVoucherAPI.getAll(filter);
            setVoucherList({
                data: response,
                isLoading: false,
                isSuccess: true
            });
        } catch (error) {
            setVoucherList({ data: null, isLoading: false, isSuccess: false });
            console.log("fail to fetch address");
        }
    };
    useEffect(() => {
        fetchVoucher();
    }, [filter]);

    if (voucherList.isLoading) {
        return <Loading />;
    } else
        return (
            <>
                <div className="fish-head-row">
                    <h3>Mã Giảm Giá</h3>
                    <div className="product-add-new">
                        <YLButton
                            variant="warning"
                            value="Thêm"
                            to={{ pathname: "/manager/voucher/addnew", canBack: setBack }}
                        />
                    </div>
                </div>
                <div className="user-head-row">
                    <div className="product-add-new">
                    </div>
                </div>
                <div className="manager-user-show mt-3 bg-white bg-shadow">
                    <h4>tất cả vouhcer</h4>
                    <hr />
                    {/* <ManagerSort /> */}
                    <table>
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Tên</th>
                                <th>Loại giảm giá</th>
                                <th>Bắt đầu từ ngày</th>
                                <th>Ngày kết thúc</th>
                                <th>Giá trị</th>
                                <th></th>
                            </tr>
                            {voucherList?.data?.userDtoOutList?.map((item, i) => (
                                <tr key={i}>
                                    <td>
                                        {item?.discountVoucherId}
                                    </td>
                                    <td>
                                        {item?.name}
                                    </td>
                                    <td>
                                        {item.type}
                                    </td>
                                    <td>{item.start_date ? item.start_date : '-'}</td>
                                    <td>{item.end_date ? item.end_date : '-'}</td>
                                    <td>{item.discountValue}</td>
                                    <td>
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
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {voucherList?.data?.discountVouchers?.length <= 0 && <p>Không có mã giảm giá nào! </p>}
                    <div className="m-auto p-4 m-auto p-4 d-flex justify-content-center">
                        {voucherList?.data?.totalPage > 1 && (
                            <Pagination
                                itemClass="page-item"
                                linkClass="page-link"
                                activePage={activePage}
                                itemsCountPerPage={filterConfig.LIMIT_DATA_PER_PAGE}
                                totalItemsCount={voucherList?.data?.totalItem}
                                pageRangeDisplayed={filterConfig.PAGE_RANGE_DISPLAYED}
                                onChange={handlePageChange}
                            />
                        )}
                    </div>
                </div>
            </>
        );
}

export default ManagerVoucher;
