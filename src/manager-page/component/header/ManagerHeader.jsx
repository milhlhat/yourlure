import { AbilityContext } from "ability/can";
import UserApi from "api/user-api";
import "assets/scss/scss-manager/manager-header.scss";
import React, { useContext, useEffect, useState } from "react";
import "react-dropdown/style.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { setIsBack } from "redux/back-action/back-action";
import DEFINELINK from "routes/define-link";
import { logout } from "utils/user";

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
    isSuccess: false,
  });

  const ability = useContext(AbilityContext);
  const handleLogOut = () => {
    logout(ability);
    history.push(DEFINELINK.home);
  };


  useEffect(() => {
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
    fetchCustomAccount();
    return fetchCustomAccount();
  }, []);
  useEffect(() => {
    const action = setIsBack({
      canBack: false,
      path: null,
      label: null,
    });
    dispatch(action);
  }, [location]);
  return (
    <div className="bg-white manager-header">
      <div
        className={`back-button ${canBack ? "" : "d-none"}`}
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
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ManagerHeader;
