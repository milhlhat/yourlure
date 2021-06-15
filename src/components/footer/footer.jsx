import React from 'react';
import 'assets/scss/scss-components/footer.scss';

function Footer(props) {
	return (
		<div className="bg-white mt-4 footer">
			<footer id="footer" className="container word-wrap pt-5 pb-5">
				<div className="d-flex row">
					<div className="col-6 col-sm-3 d-flex flex-column">
						<span className="title mb-3">Thông tin</span>
						<span className="p">Giới thiệu</span>
						<span className="p">Tin Tức</span>
					</div>
					<div className="col-6 col-sm-3 d-flex flex-column">
						<span className="title mb-3">Dịch vụ</span>
						<span className="p">Phí vận chuyển</span>
						<span className="p">Điều khoản & dịch vụ</span>
					</div>
					<div className="col-6 col-sm-3 d-flex flex-column">
						<span className="title mb-3">Hỗ trợ</span>
						<span className="p">Thanh toán</span>
						<span className="p">Vận Chuyển</span>
					</div>
					<div className="col-6 col-sm-3 d-flex flex-column">
						<span className="title mb-3">Liên hệ</span>
						<span className="p">Hotline : 09999999</span>
						<span className="p">Email: supportsupports@lure.com</span>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default Footer;
