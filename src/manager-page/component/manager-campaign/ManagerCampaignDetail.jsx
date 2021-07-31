import React, { useState } from "react";
import PropTypes from "prop-types";
import { getCampaignById } from "../../../api/manager-campaign-api";

ManagerCampaignDetail.propTypes = {};

function ManagerCampaignDetail(props) {
  const campaignId = props.match.params.id;

  const [registerUsers, setRegisterUsers] = useState({
    list: [],
    isLoading: true,
    isSuccess: false,
  });
  const fetchCampaignById = async (campaignId) => {
    const response = getCampaignById(campaignId);
    setRegisterUsers({ list: response, isLoading: false, isSuccess: true });
  };

  return (
    <div className={"bg-box"}>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Người đăng ký</th>
            <th>Số điện thoại</th>
            <th>Gọi</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default ManagerCampaignDetail;
