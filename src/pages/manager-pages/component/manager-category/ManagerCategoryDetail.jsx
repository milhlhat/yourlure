import ManagerCategoryAPI from "api/manager-category-api";
import ErrorLoad from "components/error-notify/ErrorLoad";
import Loading from "components/Loading";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./scss/manager-category-detail.scss";

function ManagerCategoryDetail(props) {
  const categoryId = props.match.params.id;
  const history = useHistory();
  const [category, setCategory] = useState({
    data: null,
    isLoading: false,
    isSuccess: true,
  });

  const fetchCategory = async () => {
    setCategory((prevState) => {
      return { ...prevState, isLoading: true };
    });
    try {
      const response = await ManagerCategoryAPI.getCategoryByID(categoryId);
      setCategory({ data: response, isLoading: false, isSuccess: true });
    } catch (error) {
      setCategory({ data: null, isLoading: false, isSuccess: false });
      console.log("fail to fetch address");
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [categoryId]);

  if (category.isLoading) {
    return <Loading />;
  } else if (!category.isSuccess) {
    return <ErrorLoad />;
  } else
    return (
      <>
        <div className="category-head-row ">
          <h3>{category?.data?.categoryName}</h3>
        </div>
        <div className="manager-category-detail-show mt-3 bg-white bg-shadow">
          <span>Tất cả sản phẩm</span>
          <hr />
          {/* <ManagerSort /> */}
          {category?.data?.productCollection?.length <= 0 ? (
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
                {category?.data?.productCollection?.map((item, i) => (
                  <tr key={i} className="hover-background">
                    <td>{i + 1}</td>
                    <td
                      className="pointer"
                      onClick={() =>
                        history.push({
                          pathname:
                            "/manager/product/detail/" + item?.productID,
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

export default ManagerCategoryDetail;
