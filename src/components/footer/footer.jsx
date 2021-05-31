import React from 'react';
 

function Footer(props) {
	return (
		<div className="bg-white">
		<footer id="footer" className="container">
			<hr className="hr" />
			<div className="d-flex">
				<div className="col-3 d-flex flex-column">
					<span className="title mb-3">Thông tin</span>
					<span className="p">Giới thiệu</span>
					<span className="p">Tin Tức</span>
				</div>
				<div className="col-3 d-flex flex-column">
					<span className="title mb-3">Dịch vụ</span>
					<span className="p">Phí vận chuyển</span>
					<span className="p">Điều khoản & dịch vụ</span>
				</div>
				<div className="col-3 d-flex flex-column">
					<span className="title mb-3">Liên hệ</span>
					<span className="p">Hotline: 09999999</span>
					<span className="p">Email: support@lure.com</span>
				</div>
				<div className="col-3 d-flex flex-column">
					<span className="title mb-3">Hỗ trợ</span>
					<span className="p">Thanh toán</span>
					<span className="p">Vận Chuyển</span>
				</div>
			</div>
		</footer>
		</div>
	);
}

export default Footer;
