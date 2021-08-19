import "assets/scss/scss-manager/manager-sidebar.scss";
import React, { useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AbilityContext, Can } from "authorization/can";
import { logout } from "utils/user";
import DEFINELINK from "routes/define-link";
import logo from "assets/images/logo/logo-social.png";
import logoText from "assets/images/logo/text-1628010004845.png";

Sidebar.propTypes = {};

function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

function Sidebar(props) {
  const history = useHistory();
  const ability = useContext(AbilityContext);
  const handleLogout = () => {
    logout(ability);
    history.push(DEFINELINK.home);
  };
  const location = useLocation();
  let path = location.pathname;
  return (
    <>
      <div id="myNav" className="overlay">
        <span className="closebtn" onClick={closeNav}>
          <div className="side-bar d-flex flex-column flex-shrink-0 ps-3 bg-white">
            <a
              href="#"
              className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
            >
            <img src={logo} alt="#1 Tuỳ biến mồi lure" className="logo" />
            <img src={logoText} className="logo-text " />
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
              <Can do="read-write" on="admin" passThrough>
                {(allowed) =>
                  allowed ? (
                    <li>
                      <Link
                        to="/manager/user"
                        className={`nav-link ${
                          path.indexOf("manager/user") > -1
                            ? "active"
                            : "link-dark"
                        }`}
                      >
                        <i className="fas fa-users-cog" />
                        <span className="text-side-bar"> Tài khoản</span>
                      </Link>
                    </li>
                  ) : (
                    ""
                  )
                }
              </Can>
              <li>
                <Link
                  to="/manager/product"
                  className={`nav-link ${
                    path.indexOf("manager/product") > -1
                      ? "active"
                      : "link-dark"
                  }`}
                >
                  <i className="far fa-box" />
                  <span className="text-side-bar"> Sản phẩm</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/manager/category"
                  className={`nav-link ${
                    path.indexOf("manager/category") > -1
                      ? "active"
                      : "link-dark"
                  }`}
                >
                  <i className="far fa-list-alt" />
                  <span className="text-side-bar"> Danh mục</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/manager/fish"
                  className={`nav-link ${
                    path.indexOf("manager/fish") > -1 ? "active" : "link-dark"
                  }`}
                >
                  <i className="fal fa-fish-cooked" />
                  <span className="text-side-bar"> Loại cá</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/manager/order"
                  className={`nav-link ${
                    path.indexOf("manager/order") > -1 ? "active" : "link-dark"
                  }`}
                >
                  <i className="fal fa-clipboard-prescription" />
                  <span className="text-side-bar"> Đơn hàng</span>
                </Link>
              </li>
              <Can do="read-write" on="admin">
                <li>
                  <Link
                    to="/manager/staff"
                    className={`nav-link ${
                      path.indexOf("manager/staff") > -1
                        ? "active"
                        : "link-dark"
                    }`}
                  >
                    <i className="fal fa-suitcase" />
                    <span className="text-side-bar"> Nhân viên</span>
                  </Link>
                </li>
              </Can>
              <li>
                <Link
                  to="/manager/voucher"
                  className={`nav-link ${
                    path.indexOf("manager/voucher") > -1
                      ? "active"
                      : "link-dark"
                  }`}
                >
                  <i className="fal fa-badge-percent" />
                  <span className="text-side-bar"> Mã giảm giá</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/manager/campaign"
                  className={`nav-link ${
                    path.indexOf("manager/campaign") > -1
                      ? "active"
                      : "link-dark"
                  }`}
                >
                  <i className="fal fa-box-heart" />
                  <span className="text-side-bar"> Sự kiện</span>
                </Link>
              </li>
              <Can do={"read-write"} on={"admin"}>
                <li>
                  <Link
                    to={DEFINELINK.manager + DEFINELINK.managementBackup}
                    className={`nav-link ${
                      path.indexOf(DEFINELINK.managementBackup) > -1
                        ? "active"
                        : "link-dark"
                    }`}
                  >
                    <i className="fal fa-hdd" />
                    <span className="text-side-bar"> Sao lưu</span>
                  </Link>
                </li>
              </Can>
              <Can do={"read-write"} on={"customer"}>
                <li>
                  <Link
                    to="/home"
                    className={`nav-link ${
                      path.indexOf("/home") > -1 ? "active" : "link-dark"
                    }`}
                  >
                    <i className="fal fa-store" />
                    <span className="text-side-bar"> Cửa hàng</span>
                  </Link>
                </li>
              </Can>
              <li>
                <button className="d-none close-button btn btn-outline-dark">
                  <i className="fas fa-times" />
                </button>
              </li>
            </ul>
          </div>
        </span>
      </div>

      <span onClick={openNav}>
        <button className="btn open-button btn-outline-dark">
          <i className="fal fa-bars" />
        </button>
      </span>

      {/**
       * mobile screen
       */}

      {/* <div
      className="side-bar d-flex flex-column flex-shrink-0 p-3 bg-white"
    >
      <a
        href="#"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
      >
        <span className="fs-4">Sidebar</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/manager/home" className={`nav-link ${path.indexOf('manager/home') > -1 ? 'active' :'link-dark'}`}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/manager/user" className={`nav-link ${path.indexOf('manager/user') > -1 ? 'active' :'link-dark'}`}>
          <i className="fas fa-users-cog"></i>
          </Link>
        </li>
        <li>
          <Link to="/manager/product" className={`nav-link ${path.indexOf('manager/product') > -1 ? 'active' :'link-dark'}`}>
          <i className="far fa-box"></i>
          </Link>
        </li>
        <li>
          <Link to="/manager/category" className={`nav-link ${path.indexOf('manager/category') > -1 ? 'active' :'link-dark'}`}>
          <i className="far fa-list-alt"></i>
          </Link>
        </li>
        <li>
          <Link to="/manager/fish" className={`nav-link ${path.indexOf('manager/fish') > -1 ? 'active' :'link-dark'}`}>
          <i className="fal fa-fish-cooked"></i>
          </Link>
        </li>
        <li>
          <Link to="/manager/order" className={`nav-link ${path.indexOf('manager/order') > -1 ? 'active' :'link-dark'}`}>
          <i className="fal fa-clipboard-prescription"></i>
          </Link>
        </li>
        <li>
          <Link to="/manager/staff" className={`nav-link ${path.indexOf('manager/staff') > -1 ? 'active' :'link-dark'}`}>
          <i className="fal fa-suitcase"></i>
          </Link>
        </li>
        <li>
          <Link to="/manager/voucher" className={`nav-link ${path.indexOf('manager/voucher') > -1 ? 'active' :'link-dark'}`}>
          <i className="fal fa-box-heart"></i>
          </Link>
        </li>
      </ul>
    </div> */}
    </>
  );
}

export default Sidebar;