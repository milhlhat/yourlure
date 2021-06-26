import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import "assets/scss/scss-manager/manager-sidebar.scss";
import Fish from "assets/icon/fish.svg";

Sidebar.propTypes = {};

function openNav() {
  document.getElementById("myNav").style.width = "100%";
}
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

function Sidebar(props) {
  const location = useLocation();
  let path = location.pathname;
  return (
    <>
      <div id="myNav" className="overlay">
        <span className="closebtn" onClick={closeNav}>
          <div className="sidebar d-flex flex-column flex-shrink-0 p-3 bg-white">
            <a
              href="#"
              className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
            >
              <span className="fs-4">Sidebar</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
              <li className="nav-item">
                <Link
                  to="/manager/home"
                  className={`nav-link ${
                    path.indexOf("manager/home") > -1 ? "active" : "link-dark"
                  }`}
                >
                  <span className="text-side-bar">  Home</span>
                
                </Link>
              </li>
              <li>
                <Link
                  to="/manager/user"
                  className={`nav-link ${
                    path.indexOf("manager/user") > -1 ? "active" : "link-dark"
                  }`}
                >
                  <i className="fas fa-users-cog"></i>
                  <span className="text-side-bar"> Tài khoản</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/manager/product"
                  className={`nav-link ${
                    path.indexOf("manager/product") > -1
                      ? "active"
                      : "link-dark"
                  }`}
                >
                  <i className="far fa-box"></i>
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
                  <i className="far fa-list-alt"></i>
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
                  <i className="fal fa-fish-cooked"></i>
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
                  <i className="fal fa-clipboard-prescription"></i>
                  <span className="text-side-bar"> Đơn hàng</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/manager/staff"
                  className={`nav-link ${
                    path.indexOf("manager/staff") > -1 ? "active" : "link-dark"
                  }`}
                >
                  <i className="fal fa-suitcase"></i>
                  <span className="text-side-bar"> Nhân viên</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/manager/voucher"
                  className={`nav-link ${
                    path.indexOf("manager/voucher") > -1
                      ? "active"
                      : "link-dark"
                  }`}
                >
                  <i className="fal fa-box-heart"></i>
                  <span className="text-side-bar"> Mã giảm giá</span>
                </Link>
              </li>
              <li>
                <button className="d-none close-button">
                  <i class="fas fa-times"></i>
                </button>
              </li>
            </ul>
          </div>
        </span>
      </div>

      <span onClick={openNav}>
        <button>
          <i className="fal fa-bars"></i>
        </button>
      </span>

      {/**
       * mobile screen
       */}

      {/* <div
      className="sidebar d-flex flex-column flex-shrink-0 p-3 bg-white"
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
