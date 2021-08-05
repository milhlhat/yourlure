import ManagerFishAPI from "api/manager-fish-api";
import ErrorLoad from "components/error-notify/ErrorLoad";
import Loading from "components/Loading";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { setIsBack } from "redux/back-action/back-action";
import "./scss/manager-fish-detail.scss";

function ManagerFishDetail(props) {
  const canBack = props.location.canBack;
  const fishId = props.match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();
  const [fish, setFish] = useState({
    data: null,
    isLoading: false,
    isSuccess: true,
  });

  const fetchCategory = async () => {
    setFish((prevState) => {
      return { ...prevState, isLoading: true };
    });
    try {
      const response = await ManagerFishAPI.getById(fishId);
      console.log(response);
      setFish({ data: response, isLoading: false, isSuccess: true });
    } catch (error) {
      setFish({ data: null, isLoading: false, isSuccess: false });
      console.log("fail to fetch address");
    }
  };

  const location = useLocation();
  const setBack = {
    canBack: true,
    path: location,
    label: "Cá",
  };
  useEffect(() => {
    fetchCategory();
  }, [fishId]);

  useEffect(() => {
    if (canBack) {
      const action = setIsBack({
        canBack: canBack.canBack,
        path: canBack.path,
        label: canBack.label,
      });
      dispatch(action);
    }
  }, [canBack]);
  if (fish.isLoading) {
    return <Loading />;
  } else if (!fish.isSuccess) {
    return <ErrorLoad />;
  } else
    return (
      <>
        <div className="category-head-row ">
          <h3>{fish?.data?.fishName}</h3>
        </div>
        <div className="manager-fish-detail-show mt-3 bg-white bg-shadow">
          <span>Tất cả sản phẩm</span>
          <hr />
          {/* <ManagerSort /> */}
          {fish?.data?.products?.length <= 0 ? (
            <p className="text-center">Không có sản phẩm </p>
          ) : (
            <table className="table">
              <tbody>
                <tr>
                  <th>#</th>
                  <th>Tên sản phẩm</th>
                  <th className="text-center">Trạng thái</th>
                  <th className="text-center">Giá</th>
                  <th></th>
                </tr>
                {fish?.data?.products?.map((item, i) => (
                  <tr key={i} className="hover-background">
                    <td>{i + 1}</td>
                    <td
                      className="pointer"
                      onClick={() =>
                        history.push({
                          pathname:
                            "/manager/product/detail/" + item?.productID,
                          canBack: setBack,
                        })
                      }
                    >
                      {item?.productName}
                    </td>
                    <td className="text-center">
                      {item.visibleInStorefront == null
                        ? "-"
                        : item.visibleInStorefront
                        ? "Đang kinh doanh"
                        : "Ngừng kinh doanh"}
                    </td>
                    <td className="text-end pe-4">
                      {!item
                        ? "N/A"
                        : Number(item.defaultPrice).toLocaleString(undefined, {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          })}
                    </td>
                    {/* <td>
                    <img
                      src={Editor}
                      className="pointer"
                      onClick={() => handleEditClicked(item.productId)}
                    />
                  </td>
                  <td>
                    <img src={Trash} />
                  </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* <div className="m-auto p-4 d-flex justify-content-center">
            {products.totalPage > 1 && (
              <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={activePage}
                itemsCountPerPage={filterConfig.LIMIT_DATA_PER_PAGE}
                totalItemsCount={products.totalProduct}
                pageRangeDisplayed={filterConfig.PAGE_RANGE_DISPLAYED}
                onChange={handlePageChange}
              />
            )}
          </div> */}
        </div>
      </>
    );
}

export default ManagerFishDetail;