import React from "react";
import "assets/scss/scss-components/footer.scss";
import DEFINELINK from "routes/define-link";
import { Link } from "react-router-dom";
function Footer(props) {
  return (
    <div className="bg-white mt-4 footer" id="footer">
      <footer className="container word-wrap pt-5 pb-5">
        <div className="d-flex row">
          <div className="col-6 col-sm-3 d-flex flex-column">
            <span className="title mb-3">Thông tin</span>

            <Link className="link-footer" to={DEFINELINK.about}>
              Giới thiệu
            </Link>
            <Link className="link-footer" to={"#"}>
              Tin Tức
            </Link>
          </div>
          <div className="col-6 col-sm-3 d-flex flex-column">
            <span className="title mb-3">Dịch vụ</span>
            <Link className="link-footer" to={"#"}>
              Phí vận chuyển
            </Link>
            <Link className="link-footer" to={"#"}>
              Điều khoản & dịch vụ
            </Link>
          </div>
          <div className="col-6 col-sm-3 d-flex flex-column">
            <span className="title mb-3">Hỗ trợ</span>
            <Link className="link-footer" to={"#"}>
              Thanh toán
            </Link>
            <Link className="link-footer" to={"#"}>
              Vận Chuyển
            </Link>
          </div>
          <div className="col-6 col-sm-3 d-flex flex-column">
            <span className="title mb-3">Liên hệ</span>
            <a className="link-footer" href="tel:0999999999">
              Hotline : 09999999
            </a>
            <span className="p">Email: supportsupports@lure.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
