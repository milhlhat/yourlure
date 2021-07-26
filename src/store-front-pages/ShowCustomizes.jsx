import { AbilityContext } from "ability/can";
import ProductAPI from "api/product-api";
import CardCustom from "components/card/CardCustom";
import CardProduct from "components/card/CardProduct";
import Loading from "components/Loading";
import { filterConfig } from "constant/filter-setting";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setFilter } from "redux/product-action/fetch-filter";
import { fetchFilter } from "utils/product";

function ShowCustomizes(props) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productFilter.data); //getAllCustomizeconst
  const [customizes, setCustomizes] = useState({
    data: null,
    isLoading: false,
    isSuccess: true,
  });

  const ability = useContext(AbilityContext);
  const isLoggedIn = ability.can("login", "website");

  const fetchCustomize = async () => {
    setCustomizes((prevState) => {
      return { ...prevState, isLoading: true };
    });
    try {
      const response = await ProductAPI.getAllCustomize();
      setCustomizes({ data: response, isLoading: false, isSuccess: true });
    } catch (error) {
      setCustomizes({ data: null, isLoading: false, isSuccess: false });
      console.log("fail to fetch address");
    }
  };
  useEffect(() => {
    const filter = {
      listCateId: [],
      listFishId: [],
      keyword: "",
      page: filterConfig.PAGE_NUMBER_DEFAULT,
      limit: filterConfig.LIMIT_DATA_PER_PAGE,
      custom: true,
      isAsc: false,
      sortBy: "sumQuantity",
    };
    fetchFilter(dispatch, filter);
    if (isLoggedIn) fetchCustomize();
  }, []);
  return (
    <>
      {isLoggedIn ? (
        <div className="show-customize container-lg">
          <div className="bg-box bg-shadow my-4">
            <h6>Danh sách tùy biến của bạn</h6>
            {customizes.isLoading ? (
              <Loading />
            ) : customizes?.data?.length <= 0 ? (
              <span className="d-flex justify-content-center mb-4">
                Bạn chưa tùy biến sản phẩm nào.
              </span>
            ) : (
              <div>
                <div className="d-flex flex-wrap">
                  {customizes?.data?.map((item, i) => (
                    <CardCustom
                      canCustom={true}
                      product={item}
                      key={`my-custom--${i}`}
                      fetchCustomize={fetchCustomize}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="bg-box bg-shadow my-4">
            <h6>Danh sách sản phẩm có thể tùy biến</h6>
            <div className="d-flex flex-wrap">
              {products?.productOutList?.map((item, i) => (
                <CardProduct
                  canCustom={true}
                  product={item}
                  key={`card-product-${i}`}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center mt-5">
          <Link to="/login">Đăng nhập</Link>&nbsp; để có thể sử dụng chức năng
          tùy biến
        </div>
      )}
    </>
  );
}

export default ShowCustomizes;
