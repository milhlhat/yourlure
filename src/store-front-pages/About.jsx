import React from "react";
import "assets/scss/scss-pages/about.scss";
import img3 from "assets/images/about/about3.jpg";
import img1 from "assets/images/about/about1.jpg";
import img6 from "assets/images/about/about6.jpg";
import img4 from "assets/images/about/about4.jpg";

function About(props) {
  return (
    <div className="container about">
      {/* <h1>Giới thiệu</h1> */}
      <div className="big-image">
        <img src={img3} alt="banner your lure studio" className="w-100" />
      </div>
      <div className="over-view">
        <p>
          Câu cá là một hoạt động giải trí ngoài trời phổ biến ở Việt Nam trong
          thời gian gần đây. Khi mua mồi câu, cần thủ thường mua mồi câu đẹp,
          kiểu dáng bắt mắt, nhưng rất tiếc, các cửa hàng trực tuyến hiện nay
          chỉ cung cấp một số mẫu mồi câu cá, người đi câu cần chọn một trong
          những mẫu này và họ không thể tự tùy chỉnh. Họ tốn rất nhiều thời gian
          để chọn mẫu mà họ thích nhất.
        </p>
        <p>
          Nhiều cần thủ muốn sở hữu một số loại mồi câu cá độc đáo để thỏa mãn
          bản thân. Vì mỗi người có một sở thích cá nhân khác nhau. Khi họ chọn
          một loại mồi câu cá, thật khó để chọn được một mẫu mồi câu cá phù hợp
          nhất. Mặc dù nhiều mẫu mồi câu cá đã được tạo ra nhưng vẫn chưa đủ cho
          những người câu cá lựa chọn. Ngoài ra, việc tạo ra nhiều mô hình mồi
          chài sẽ làm tăng chi phí thiết kế.
        </p>
        <p>
          Đối với những người chơi mồi lure và muốn mua mồi trực tuyến thì hệ
          thống YourLure là website chuyên bán các loại mồi. Không giống như các
          trang web bán mồi hiện nay, trong trang web có phần lựa chọn tùy chỉnh
          cho phép người mua tự thiết kế cho mồi của mình, giúp nâng cao sự lựa
          chọn cho khách hàng. Mục đích chính là giúp khách hàng tự thiết kế,
          chọn mồi và đặt hàng nhanh chóng. YourLure luôn muốn mang đến cho
          người dùng những trải nhiệm mới thú vị và hấp dẫn.
        </p>
      </div>
      <div className="row mt-5">
        <div className="col-12 col-md-6 order-md-1 my-auto showcase-text">
          <img src={img1} className="img-responsive" />
        </div>
        <div className="col-12 col-md-6 order-md-2 my-auto showcase-text text-case">
          <span>
            Bạn cho tôi một con cá , tôi sẽ ăn hết nó trong một ngày . Nhưng nếu
            dạy tôi cách câu cá, tôi sẽ được ăn cá cả đời " - đó chính là nguồn
            cảm hứng để chúng tôi -YourLure - mang đến cho bạn về một thế giới
            đồ câu mới lạ và sáng tạo
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6 order-md-2 my-auto showcase-text">
          <img src={img6} className="img-responsive" />
        </div>
        <div className="col-12 col-md-6 order-md-1 my-auto showcase-text text-case">
          <span>
            Cho dù bạn có câu cá hàng giờ không được gì ngoài cái nắng cháy da
            và ngứa ngáy thì bạn vẫn đỡ hơn con mồi mà bạn dùng để câu chính vì
            thế chúng tôi -YourLure đem đến cho bạn một trang web không chỉ bán
            mồi câu, ở đó bạn còn được thỏa sức sáng tạo ra con mồi cho riêng
            mình như một sự nâng niu và tôn trọng nhất định cho những chuyến đi
            câu của bạn .
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6 order-md-1 my-auto showcase-text">
          <img src={img4} className="img-responsive" />
        </div>
        <div className="col-12 col-md-6 order-md-2 my-auto showcase-text text-case">
          <span>
            "Cách tốt nhất để biết tính cách 1 người câu cá là quăng cục mồi giả
            của anh ta đi !"- mồi câu luôn là thứ được các cần thủ coi trọng và
            săn đón và sẽ thật tuyệt vời khi chúng tôi - YourLure được các cần
            thủ tin tưởng lựa chọn để phục vụ . YourLure cam kết sẽ đem đến cho
            bạn trải nghiệm hoàn toàn mới về thế giới mồi câu nơi bạn sẽ có con
            mồi cho riêng mình và mang đậm dấu ấn cá nhân của bạn .
          </span>
        </div>
      </div>
      <div className="information-about mt-5">
        <div className="info-detail mx-2">
          <img
            src="https://source.unsplash.com/200x200/?perth,australia"
            alt=""
          />
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elite.</p>
        </div>
        <div className="info-detail mx-2">
          <img
            src="https://source.unsplash.com/200x200/?perth,australia"
            alt=""
          />
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elite.</p>
        </div>
        <div className="info-detail mx-2">
          <img
            src="https://source.unsplash.com/200x200/?perth,australia"
            alt=""
          />
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elite.</p>
        </div>
        <div className="info-detail mx-2">
          <img
            src="https://source.unsplash.com/200x200/?perth,australia"
            alt=""
          />
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elite.</p>
        </div>
        <div className="info-detail mx-2">
          <img
            src="https://source.unsplash.com/200x200/?perth,australia"
            alt=""
          />
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elite.</p>
        </div>
      </div>
    </div>
  );
}

export default About;
