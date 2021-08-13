import React from "react";
import "assets/scss/scss-pages/about.scss";
import teamImg from "assets/images/about/about1.jpg";
import nhatAvt from "assets/images/about/nhat.jpg";
import sonAvt from "assets/images/about/sonAvt.jpg";
import thangAvt from "assets/images/about/thangAvt.jpg";
import datAvt from "assets/images/about/dat.jpg";
import lanAvt from "assets/images/about/lan2.jpg";
import supervisor from "assets/images/about/supervisor.jpg";

import CardProfile from "../../components/card/CardProfile";
import { Helmet } from "react-helmet";

const TOPPOINT = [
  {
    icon: "fal fa-send-back",
    name: "Giao diện thân thiện",
    content: `Ngôn ngữ thiết kế trực quan, dễ dàng thao tác`,
  },
  {
    icon: "fal fa-heart",
    name: "Nhiệt huyết",
    content: `Sản phẩm được tạo nên bởi những kỹ sư phần mềm với 100% năng lượng`,
  },
  {
    icon: "fal fa-chart-network",
    name: "Chuyên nghiệp",
    content: `Sử dụng những công nghệ cao cấp và quy trình chặt chẽ`,
  },
];

const TEAMPROFILES = [
  {
    name: "Thầy Bùi Ngọc Anh",
    title: "Supervisor",
    content: "",
    facebook: "",
    instagram: "",
    mail: "",
    image: supervisor,
  },
  {
    name: "Phạm Hồng Sơn",
    title: "Chiến thần Backu-endo",
    content: "Kẻ hủy diệt deadline",
    facebook: "https://www.facebook.com/sn.pham.3/",
    instagram: "",
    mail: "snpham1102@gmail.com",
    image: sonAvt,
  },
  {
    name: "Nguyễn Minh Nhật",
    title: "Developer",
    content: "Hay nói dối",
    facebook: "",
    instagram: "",
    mail: "",
    image: nhatAvt,
  },
  {
    name: "Ngô Minh Thắng",
    title: "Leader",
    content: "Không ai eo",
    facebook: "https://www.fb.com/thangnm99",
    instagram: "",
    mail: "",
    image: thangAvt,
  },
  {
    name: "Bùi Hữu Đạt",
    title: "Member front-end",
    content: "Vẫn chưa thấy bug của cuộc đời",
    facebook: "https://www.fb.com/dat375",
    instagram: "",
    mail: "",
    image: datAvt,
  },
  {
    name: "Phùng Thị Lan",
    title: "Tester",
    content: "Nữ thần tự do",
    facebook: "",
    instagram: "",
    mail: "",
    image: lanAvt,
  },
];
function About() {
  return (
    <div className={"component about "}>
      <Helmet>
        <title>Giới Thiệu | Yourlure </title>

        <meta name="title" content="Giới Thiệu" />

        <meta
          name="description"
          content="Website tuỳ biến mồi lure đầu tiên Việt Nam"
        />
      </Helmet>
      <article className={"bg-box first-content"}>
        <h3 className={"text-center mb-4"}>YOURLURE</h3>
        <p className={"content "}>
          Câu cá là một hoạt động giải trí ngoài trời phổ biến ở Việt Nam trong
          thời gian gần đây. Khi mua mồi câu, cần thủ thường mua mồi câu đẹp,
          kiểu dáng bắt mắt, nhưng rất tiếc, các cửa hàng trực tuyến hiện nay
          chỉ cung cấp một số mẫu mồi câu cá, người đi câu cần chọn một trong
          những mẫu này và họ không thể tự tùy chỉnh. Họ tốn rất nhiều thời gian
          để chọn mẫu mà họ thích nhất.
          <br />
          <br /> Nhiều cần thủ muốn sở hữu một số loại mồi câu cá độc đáo để
          thỏa mãn bản thân. Vì mỗi người có một sở thích cá nhân khác nhau. Khi
          họ chọn một loại mồi câu cá, thật khó để chọn được một mẫu mồi câu cá
          phù hợp nhất. Mặc dù nhiều mẫu mồi câu cá đã được tạo ra nhưng vẫn
          chưa đủ cho những người câu cá lựa chọn. Ngoài ra, việc tạo ra nhiều
          mô hình mồi chài sẽ làm tăng chi phí thiết kế.
          <br />
          <br />
          Đối với những người chơi mồi lure và muốn mua mồi trực tuyến thì hệ
          thống YourLure là website chuyên bán các loại mồi. Không giống như các
          trang web bán mồi hiện nay, trong trang web có phần lựa chọn tùy chỉnh
          cho phép người mua tự thiết kế cho mồi của mình, giúp nâng cao sự lựa
          chọn cho khách hàng. Mục đích chính là giúp khách hàng tự thiết kế,
          chọn mồi và đặt hàng nhanh chóng. YourLure luôn muốn mang đến cho
          người dùng những trải nhiệm mới thú vị và hấp dẫn
        </p>
        <p className={"sign text-center"}>Yourlure Team</p>
        <img
          src={teamImg}
          className={"team-img"}
          alt={"Ảnh giới thiệu chính"}
        />
      </article>

      <div className={"top-points mt-3  bg-box pb-5 mt-4 mb-4"}>
        {TOPPOINT.map((item, index) => (
          <TopPoint
            iconFAWS={item.icon}
            name={item.name}
            content={item.content}
            key={index}
          />
        ))}
      </div>

      <div className={"bg-box d-flex flex-column align-items-center  p-5"}>
        <h3 className={"text-center mb-3"}>Tuỳ biến chuyên nghiệp</h3>
        <iframe
          className={"youtube-frame"}
          src="https://www.youtube.com/embed/wKPwJtC8eO0"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className={"bg-box pt-4 mt-4"}>
        <h3 className={"text-center mb-5"}>Nhân sự</h3>
        <div className={"supervisor"}>
          <CardProfile item={TEAMPROFILES[0]} />
        </div>
        <div className={" d-flex flex-wrap"}>
          {TEAMPROFILES.slice(1).map((item, index) => (
            <CardProfile item={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;

export function TopPoint({ iconFAWS, name, content }) {
  return (
    <div className={"  d-flex flex-column align-items-center top-point "}>
      <i className={iconFAWS + " icon-point"} />
      <p className={"text-center point-name"}>{name}</p>
      <p className={"text-center content"}> {content}</p>
    </div>
  );
}
