import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";
import "assets/scss/scss-components/header.scss";
import { useDispatch, useSelector } from "react-redux";
import { findByFilter, setFilter } from "redux/product-action/fetch-filter";
import { filterConfig } from "constant/filter-setting";
import DEFINELINK from "routes/define-link";
import logo from "assets/images/logo/logo-social.png";
function Header(props) {
  const productFilter = useSelector((state) => state.productFilter.filter);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [isClose, setIsClose] = useState(true);
  const [keyword, setKeyword] = useState(productFilter.keyword);
  const location = useLocation();
  const toggle = () => {
    setIsOpen(!isClose);
  };
  let path = location.pathname;

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
        if (ref.current && !ref.current.contains(event.target)) {
          setIsClose(!isClose);
          if (!isClose) {
            setIsOpen(false);
          }
        }
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

  useEffect(() => {
    if (path !== "/product/search") {
      const action = setFilter({
        listCateId: [],
        listFishId: [],
        page: filterConfig.PAGE_NUMBER_DEFAULT,
        limit: filterConfig.LIMIT_DATA_PER_PAGE,
        custom: false,
        isAsc: false,
        sortBy: "sumQuantity",
        keyword: "",
      });
      dispatch(action);
    }
  }, [path]);
  function goToSearchPage() {
    history.push({
      pathname: "/product/search",
    });
  }
  function handleSubmitSearch() {
    const action = setFilter({
      listCateId: [],
      listFishId: [],
      page: filterConfig.PAGE_NUMBER_DEFAULT,
      limit: filterConfig.LIMIT_DATA_PER_PAGE,
      custom: false,
      isAsc: false,
      sortBy: "sumQuantity",
      keyword: keyword,
    });
    dispatch(action);
    goToSearchPage();
  }
  function onChangeTextSearch(e) {
    setKeyword(e.target.value);
    if (e.key === "Enter") {
      handleSubmitSearch();
    }
  }
  return (
    <div className="bg-white bg-shadow">
      <div className="container">
        <Navbar light expand="md" className="p-2 nav-bar-light ">
          <div className="me-auto">
            <Link to="/">
              <img src={logo} alt="your lure logo" className="logo" />
            </Link>
          </div>
          <div ref={wrapperRef}>
            <NavbarToggler onClick={toggle} />
          </div>
          <Collapse isOpen={isOpen} navbar>
            <Nav
              className="me-auto"
              navbar
              className="d-flex justify-content-between"
            >
              <div className="group-link">
                <div
                  className={`group-link-item ${
                    path.indexOf(DEFINELINK.product) > -1 ? "active" : ""
                  }`}
                >
                  <Link className="nav-link item-hover" to="/product">
                    Sản phẩm
                  </Link>
                </div>
                <div>
                  <Link
                    className="nav-link item-hover"
                    to="/product/customize?productId=14&isEdit=false"
                  >
                    Tùy biến
                  </Link>
                </div>
                <div
                  className={`group-link-item ${
                    path.indexOf(DEFINELINK.campaign) > -1 ? "active" : ""
                  }`}
                >
                  <Link className="nav-link item-hover" to="/campaign">
                    Sự kiện
                  </Link>
                </div>
                <div
                  className={`group-link-item ${
                    path.indexOf(DEFINELINK.about) > -1 ? "active" : ""
                  }`}
                >
                  <Link className="nav-link item-hover" to="/about">
                    About
                  </Link>
                </div>
              </div>
              <div className="group-icon">
                <div className="pt-1" ref={wrapperRef}>
                  <NavItem className="d-flex ms-auto search-form px-3 ">
                    <input
                      type="search"
                      className="search "
                      placeholder="Tìm kiếm..."
                      name="keyword"
                      onKeyDown={(e) => onChangeTextSearch(e)}
                    />
                    <i
                      className="fad fa-search text-success"
                      onClick={() => handleSubmitSearch()}
                    ></i>
                  </NavItem>
                </div>
                <NavItem className="header-cart ms-2 ">
                  <Link className="nav-link" to={DEFINELINK.cart}>
                    <i
                      className={`fad fa-shopping-cart ${
                        path.indexOf("/cart") > -1 ? "active" : ""
                      }`}
                    ></i>
                  </Link>
                </NavItem>
                <NavItem className="header-user ms-2 me-2 ">
                  <Link className={"nav-link"} to={DEFINELINK.customer}>
                    <i
                      className={
                        "fa fa-user " +
                        (path.indexOf(DEFINELINK.customer) > -1 ? "active" : "")
                      }
                    ></i>
                  </Link>
                </NavItem>
              </div>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    </div>
  );
}

export default Header;
