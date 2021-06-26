import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import 'assets/scss/scss-manager/manager-sidebar.scss';

Sidebar.propTypes = {};

function Sidebar(props) {
  const location = useLocation();
  let path = location.pathname;
  return (
    <div
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
            Tài khoản
          </Link>
        </li>
        <li>
          <Link to="/manager/product" className={`nav-link ${path.indexOf('manager/product') > -1 ? 'active' :'link-dark'}`}>
          Sản phẩm
          </Link>
        </li>
        <li>
          <Link to="/manager/category" className={`nav-link ${path.indexOf('manager/category') > -1 ? 'active' :'link-dark'}`}>
          Danh mục
          </Link>
        </li>
        <li>
          <Link to="/manager/fish" className={`nav-link ${path.indexOf('manager/fish') > -1 ? 'active' :'link-dark'}`}>
          Loại cá
          </Link>
        </li>
        <li>
          <Link to="/manager/order" className={`nav-link ${path.indexOf('manager/order') > -1 ? 'active' :'link-dark'}`}>
          Đơn hàng
          </Link>
        </li>
        <li>
          <Link to="/manager/staff" className={`nav-link ${path.indexOf('manager/staff') > -1 ? 'active' :'link-dark'}`}>
          Nhân viên
          </Link>
        </li>
        <li>
          <Link to="/manager/voucher" className={`nav-link ${path.indexOf('manager/voucher') > -1 ? 'active' :'link-dark'}`}>
          Mã giảm giá
          </Link>
        </li>
      </ul>
    </div>

    // <div
    //   className="d-flex flex-column flex-shrink-0 bg-light"
    // >
    //   <a
    //     href="/"
    //     className="d-block p-3 link-dark text-decoration-none"
    //     title=""
    //     data-bs-toggle="tooltip"
    //     data-bs-placement="right"
    //     data-bs-original-title="Icon-only"
    //   >
    //     <span className="visually-hidden">Icon-only</span>
    //   </a>
    //   <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
    //     <li className="nav-item">
    //       <a
    //         href="#"
    //         className="nav-link active py-3 border-bottom"
    //         aria-current="page"
    //         title=""
    //         data-bs-toggle="tooltip"
    //         data-bs-placement="right"
    //         data-bs-original-title="Home"
    //       >
    //       </a>
    //     </li>
    //     <li>
    //       <a
    //         href="#"
    //         className="nav-link py-3 border-bottom"
    //         title=""
    //         data-bs-toggle="tooltip"
    //         data-bs-placement="right"
    //         data-bs-original-title="Dashboard"
    //       >
    //       </a>
    //     </li>
    //     <li>
    //       <a
    //         href="#"
    //         className="nav-link py-3 border-bottom"
    //         title=""
    //         data-bs-toggle="tooltip"
    //         data-bs-placement="right"
    //         data-bs-original-title="Orders"
    //       >
    //       </a>
    //     </li>
    //     <li>
    //       <a
    //         href="#"
    //         className="nav-link py-3 border-bottom"
    //         title=""
    //         data-bs-toggle="tooltip"
    //         data-bs-placement="right"
    //         data-bs-original-title="Products"
    //       >
    //       </a>
    //     </li>
    //     <li>
    //       <a
    //         href="#"
    //         className="nav-link py-3 border-bottom"
    //         title=""
    //         data-bs-toggle="tooltip"
    //         data-bs-placement="right"
    //         data-bs-original-title="Customers"
    //       >
    //       </a>
    //     </li>
    //   </ul>
    // </div>
  );
}

export default Sidebar;
