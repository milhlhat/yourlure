import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "assets/scss/scss-components/header.scss";

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  let path = useLocation().pathname;
  useEffect(() => {}, []);
  return (
    <div className="bg-white">
      <div className="container">
        <Navbar light expand="md" className="p-1">
          <NavbarBrand href="/">LOGO</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="me-auto" navbar>
              <NavItem className={path.indexOf("product") > -1 ? "active" : ""}>
                <Link className="nav-link" to="/product">
                  SẢN PHẨM
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/user/login">
                  TÙY BIẾN
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/user/login">
                  THƯƠNG HIỆU
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/user/login">
                  Blog
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/user/login">
                  SỰ KIỆN
                </Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <div className="d-flex ms-auto search-form px-3 ">
              <input type="text" className="search" placeholder="Tìm kiếm..." />
              <i className="fa fa-search"></i>
            </div>
            <div className="header-cart ms-2">
            <Link className="nav-link" to="/cart" ><i class="fa fa-shopping-cart"></i></Link>
            </div>
            <div className="header-user ms-2 me-2">
              <Link className="nav-link" to="/user/login" ><i className="fa fa-user"></i></Link>
            </div>
          </Collapse>
        </Navbar>
      </div>
    </div>
  );
};

export default Example;
