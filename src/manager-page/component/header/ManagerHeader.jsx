import { yupResolver } from "@hookform/resolvers/yup";
import { AbilityContext } from "ability/can";
import UserApi from "api/user-api";
import "assets/scss/scss-manager/manager-header.scss";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { setIsBack } from "redux/back-action/back-action";
import DEFINELINK from "routes/define-link";
import { logout } from "utils/user";
import * as yup from "yup";
import YLButton from "components/custom-field/YLButton";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import ManagerInformation from "manager-page/component/header/ManagerInformation";
import ManagerChangePassWord from "./ManagerChangePassword";
import ErrorLoad from "components/error-notify/ErrorLoad";
import Loading from "components/Loading";

ManagerHeader.propTypes = {};

function ManagerHeader(props) {
  const canBack = useSelector((state) => state.backActionHistory.canBack);
  const path = useSelector((state) => state.backActionHistory.path);
  const label = useSelector((state) => state.backActionHistory.label);
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  function handleBackOnclick(e) {
    history.push(path);
    //save
    const action = setIsBack({
      canBack: false,
      path: null,
      label: null,
    });
    dispatch(action);
  }
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
  // useEffect(() => {
  //   const action = setIsBack({
  //     canBack: false,
  //     path: null,
  //     label: null,
  //   });
  //   dispatch(action);
  // }, [location]);

  if (account.isLoading) {
    return <Loading />;
  } else if (!account.isSuccess) {
    return <ErrorLoad />;
  } else
    return (
      <div className="bg-white manager-header">
        <div
          className={`back-button ${canBack ? " ms-3 " : "d-none"}`}
          onClick={handleBackOnclick}
        >
          <i className="far fa-arrow-left"></i>
          <span className="ms-2">{label}</span>
        </div>
        <div className={`${canBack ? "d-none" : ""}`}></div>
        <div className="account">
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
                <span className="dropdown-item pointer" onClick={handleLogOut}>
                  Đăng xuất
                </span>
              </li>
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
            </ul>
          </div>
        </div>
      </div>
    );
}

export default ManagerHeader;
