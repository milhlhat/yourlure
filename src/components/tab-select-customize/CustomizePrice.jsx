import React, { useEffect, useState } from "react";
import { getCustomizePrice } from "../../api/product-api";
import { convertToVND } from "../../utils/format-string";

function CustomizePrice(props) {
  const [prices, setPrices] = useState({
    list: [],
    isLoading: true,
    isSuccess: false,
  });
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await getCustomizePrice();
        setPrices({ list: response, isLoading: false, isSuccess: true });
      } catch (e) {
        setPrices({ list: [], isLoading: false, isSuccess: false });
      }
    };
    fetchPrice();
  }, []);
  return (
    <table className="table table-striped mx-3">
      <thead>
        <tr>
          <th className={"text-success"}>Loại</th>
          <th className={"text-success"}>Giá/1 bộ phận</th>
        </tr>
      </thead>
      <tbody>
        {prices?.list?.map((item, i) => (
          <tr key={i}>
            <th>{item.vnName}</th>
            <td>{convertToVND(item.price)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CustomizePrice;
