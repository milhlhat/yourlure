import React, { useEffect, useState } from "react";
import data from "../../../assets/dumy-data/data-product";
import CardProduct from "components/card/card-product.jsx";
import Paging from "./Paging";
ProductShow.propTypes = {};

function ProductShow(props) {
  const products = data.products();
  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });
  const [filter, setFilter] = useState({
    _limit: 10,
    _page: 1,
  });

  function handlePageChange(newPage) {
    console.log("newPage ", newPage);
    setFilter({
        
        ...filter,
        _page: newPage
    });
  }

  useEffect(() => {
    async function fetchPostList() {
      try {
        const req = `http://js-post-api.herokuapp.com/api/posts?_limit=${filter._limit}&_page=${filter._page}`;
        const res = await fetch(req);
        const resJSON = await res.json();
        const { data, pagination } = resJSON;
        setPostList(data);
        console.log(data[0]);
        setPagination(pagination);
      } catch (error) {
        console.log("fetch fail ", error.message);
      }
    }
    fetchPostList();
  }, [filter]);
  return (
    <div className="product-show mt-3 bg-white">
      {/* {products.map((product, index) => (
          <CardProduct key={index} />
        ))} */}
      {postList.map((value, index) => (
        <p key={index}>{value.id}</p>
      ))}
      <Paging pagination={pagination} onPageChange={handlePageChange}></Paging>
    </div>
  );
}

export default ProductShow;
