import React, { useEffect, useState } from "react";
import { filterCampaign } from "../../../../api/manager-campaign-api";
import ManagerSortQueryString from "../sort/ManagerSortQueryString";
import YLButton from "../../../../components/custom-field/YLButton";
import { useHistory } from "react-router-dom";
import Pagination from "react-js-pagination";
import { filterConfig } from "../../../../constants/filter-setting";
import { toast } from "react-toastify";
import queryString from "query-string";
import CircularProgress from "@material-ui/core/CircularProgress";

ManagerCampaignDetail.propTypes = {};
const options = [
  {
    display: "Mới nhất",
    isAsc: false,
    sortBy: "campaign_register_id",
    value: "SORT_id_DESC",
  },
  {
    display: "Cũ nhất",
    isAsc: true,
    sortBy: "campaign_register_id",
    value: "SORT_id_ASC",
  },

  {
    display: "Tên từ A-Z",
    isAsc: true,
    sortBy: "username",
    value: "SORT_NAME_DESC",
  },
  {
    display: "Tên từ Z-A",
    isAsc: false,
    sortBy: "username",
    value: "SORT_NAME_DESC",
  },
];

function ManagerCampaignDetail(props) {
  const idSearch = props.match.params.id;
  const rootPath = props.location.pathname;

  let params = new URLSearchParams(props.location.search);
  console.log("search", props.location.search);
  const history = useHistory();
  let isAsc = params.get("isAsc") || false;
  let keyword = params.get("keyword") || "";
  let limit = params.get("limit") || 15;
  let page = params.get("page") || 0;
  let sortBy = params.get("sortBy") || "campaign_register_id";
  let display = params.get("display") || "Mới nhất";

  const filterParams = {
    idSearch,
    isAsc,
    keyword,
    limit,
    page,
    sortBy,
    display,
  };

  function handlePageChange(newActivePage) {
    filterParams.page = newActivePage - 1;
    const query = queryString.stringify(filterParams);

    history.push(`${rootPath}?${query}`);
  }

  const [registerUsers, setRegisterUsers] = useState({
    list: [],
    isLoading: true,
    isSuccess: false,
  });
  const fetchCampaignById = async (filterParams) => {
    try {
      console.log(filterParams);
      const response = await filterCampaign(filterParams);
      console.log(response);
      setRegisterUsers({ data: response, isLoading: false, isSuccess: true });
    } catch (e) {
      setRegisterUsers({ list: [], isLoading: false, isSuccess: false });
      toast.error("Hệ thống gặp lỗi lạ!");
    }
  };

  useEffect(() => {
    fetchCampaignById(filterParams);
  }, [props.location]);
  // export csv
  const parseRowExcelFromJson = (rowJson) => {
    return Object.values(rowJson);
  };

  const parseListJsonToCsv = (lists = []) => {
    let csv = [];
    lists.forEach((item) => {
      delete item.campaignRegisterId;
      console.log(item);
      csv.push(parseRowExcelFromJson(item).join("\t"));
    });

    const format = csv.join("\n");
    console.log([format]);
    return [format];
  };
  const [isExportCsv, setIsExportCsv] = useState(false);

  const exportToCsv = async () => {
    try {
      setIsExportCsv(true);
      console.log(filterParams);
      const response = await filterCampaign({
        isAsc: false,
        keyword: "",
        limit: 99999999,
        page: 0,
        sortBy: "campaign_register_id",
        typeSearch: "",
      });

      setIsExportCsv(false);
      const registers = parseListJsonToCsv(response.campaignDtoOuts);
      const url = URL.createObjectURL(
        new Blob(registers, {
          type: "text/csv",
        })
      );
      let downloadLink = document.createElement("a");
      downloadLink.download = `Campaign-${filterParams.campaignId}.xls`;
      downloadLink.href = url;
      downloadLink.click();
    } catch (e) {
      setIsExportCsv(false);
      toast.error("Xuất file lỗi");
    }
  };
  return (
    <div className={"bg-box pt-4"}>
      <div className={"d-flex justify-content-between gap-3 "}>
        <ManagerSortQueryString
          options={options}
          defaultFilter={filterParams}
          rootPath={rootPath}
        />

        <YLButton
          variant={"success"}
          height={"38px"}
          type={"button"}
          onClick={exportToCsv}
        >
          {isExportCsv ? (
            <CircularProgress
              size={15}
              className="circle-progress  float-end  mt-4 mb-3 h6"
            />
          ) : (
            <>
              <i className="fad fa-file-excel" /> &nbsp; Xuất file excel
            </>
          )}
        </YLButton>
      </div>

      <table className="table text-center">
        <thead>
          <tr className={"primary-color"}>
            <th>#</th>
            <th>Người đăng ký</th>
            <th>Số điện thoại</th>
          </tr>
        </thead>
        <tbody>
          {registerUsers.data?.campaignDtoOuts?.map((item, i) => (
            <tr key={i}>
              <td>{page * limit + i + 1}</td>
              <td>{item.username}</td>
              <td>{item.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="m-auto p-4 d-flex justify-content-center">
        {registerUsers.data?.totalPage >= 1 && (
          <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activePage={Number(filterParams.page) + 1}
            itemsCountPerPage={filterParams.limit}
            totalItemsCount={registerUsers?.data?.totalItem}
            pageRangeDisplayed={filterConfig.PAGE_RANGE_DISPLAYED}
            onChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

export default ManagerCampaignDetail;
