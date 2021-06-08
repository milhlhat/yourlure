import React, { useEffect, useRef, useState } from "react";
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

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClose, setIsClose] = useState(true);

  const toggle = () => {
    setIsOpen(!isClose);
  };
  let path = useLocation().pathname;

  ///
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          if (isOpen) {
          }
        }
        if (ref.current&& !ref.current.contains(event.target)) {
          console.log("object");
          setIsClose(!isClose);
          if (!isClose) {
            setIsOpen(false);
          }
        }
		console.log(ref.current.contains(event.target));
		console.log(event.target);
      }

      // Bind the event listener
      document.addEventListener("mouseup", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mouseup", handleClickOutside);
      };
    }, [ref, isClose]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);


  useEffect(() => {}, []);
  return (
    <div className="bg-white">
      <div className="container">
        <Navbar light expand="md" className="p-1 flex-end">
          <NavbarBrand className="me-auto" href="/">
            LOGO
          </NavbarBrand>
          <div ref={wrapperRef}>
            <NavbarToggler onClick={toggle} />
          </div>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="me-auto" navbar>
              <div
                className={"" + path.indexOf("product") > -1 ? "active" : ""}
              >
                <Link className="nav-link item-hover" to="/product">
                  SẢN PHẨM
                </Link>
              </div>
              <div>
                <Link className="nav-link item-hover" to="/user/login">
                  TÙY BIẾN
                </Link>
              </div>
              <div>
                <Link className="nav-link item-hover" to="/user/login">
                  Blog
                </Link>
              </div>
              <div>
                <Link className="nav-link item-hover" to="/user/login">
                  SỰ KIỆN
                </Link>
              </div>
			  
              <div className="pt-1" ref={wrapperRef}>
                <NavItem className="d-flex ms-auto search-form px-3 ">
                  <input
                    type="text"
                    className="search"
                    placeholder="Tìm kiếm..."
                  />
                  <i className="fa fa-search"></i>
                </NavItem>
              </div>
                <NavItem className="header-cart ms-2 ">
                  <Link className="nav-link" to="/cart">
                    <i class="fa fa-shopping-cart"></i>
                  </Link>
                </NavItem>
                <NavItem className="header-user ms-2 me-2 ">
                  <Link className="nav-link" to="/user/login">
                    <i className="fa fa-user"></i>
                  </Link>
                </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    </div>
  );
}

export default Header;
