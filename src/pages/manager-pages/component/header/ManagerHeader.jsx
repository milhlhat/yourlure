import UserApi from "api/user-api";
import "assets/scss/scss-manager/manager-header.scss";
import { AbilityContext } from "authorization/can";
import ErrorLoad from "components/error-notify/ErrorLoad";
import Loading from "components/Loading";
import ManagerInformation from "pages/manager-pages/component/header/ManagerInformation";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DEFINELINK from "routes/define-link";
import { logout } from "utils/user";
import ManagerChangePassWord from "./ManagerChangePassword";
import { Helmet } from "react-helmet";

ManagerHeader.propTypes = {};

function ManagerHeader(props) {
  const history = useHistory();
  const [account, setAccount] = useState({
    data: null,
    isLoading: false,
    isSuccess: true,
  });

  const ability = useContext(AbilityContext);
  const handleLogOut = () => {
    logout(ability);
    history.push(DEFINELINK.home);
  };

  //get account information
  const fetchCustomAccount = async () => {
    setAccount((prevState) => {
      return { ...prevState, isLoading: true };
    });
    try {
      const response = await UserApi.getMe();
      setAccount({ data: response, isLoading: false, isSuccess: true });
    } catch (error) {
      setAccount({ data: null, isLoading: false, isSuccess: false });
      console.log("fail to fetch information");
    }
  };
  useEffect(() => {
    fetchCustomAccount();
  }, []);

  if (account.isLoading) {
    return <Loading />;
  } else if (!account.isSuccess) {
    return <ErrorLoad />;
  } else
    return (
      <div className="bg-white manager-header  d-flex">
        <Helmet>
          <title>{`Quản lý | Yourlure`}</title>
        </Helmet>
        <div className="account ms-auto">
          <div className="dropdown">
            <button
              className="btn btn-light dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {account?.data?.phone}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <ManagerInformation
                  fetchCustomAccount={fetchCustomAccount}
                  edit={false}
                  account={account}
                />
              </li>
              <li>
                <ManagerChangePassWord />
              </li>
              <li>
                <span className="dropdown-item pointer" onClick={handleLogOut}>
                  Đăng xuất
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
}

export default ManagerHeader;
