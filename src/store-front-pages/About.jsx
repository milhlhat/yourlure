import React from "react";
import "assets/scss/scss-pages/about.scss";
import teamImg from "assets/images/about/about1.jpg";
import nhatAvt from "assets/images/about/nhat.jpg";
import sonAvt from "assets/images/about/sonAvt.jpg";
import thangAvt from "assets/images/about/thangAvt.jpg";
import datAvt from "assets/images/about/dat.jpg";
import supervisor from "assets/images/about/supervisor.jpg";

import CardProfile from "../components/card/CardProfile";
const TOPPOINT = [
  {
    icon: "fal fa-send-back",
    name: "Giao diện thân thiện",
    content: `Sed pretium, ligula sollicitu r libero
          sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti.`,
  },
  {
    icon: "fal fa-heart",
    name: "Nhiệt huyết",
    content: `Sed pretium, 
          sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti.`,
  },
  {
    icon: "fal fa-chart-network",
    name: "Chuyên nghiệp",
    content: `Sed pretium, ligula sollicitudin laoreet viverra, tortor libero
          `,
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
    content: "Bị thiếu muối",
    facebook: "https://www.fb.com/dat375",
    instagram: "",
    mail: "",
    image: datAvt,
  },
  {
    name: "Phùng Thị Lan",
    title: "Tester",
    content: "",
    facebook: "",
    instagram: "",
    mail: "",
    image: nhatAvt,
  },
];
function About() {
  return (
    <div className={"component about "}>
      <article className={"bg-box first-content"}>
        <h3 className={"text-center mb-4"}>YOURLURE</h3>
        <p className={"text-center content"}>
          Sed pretium, ligula sollicitudin laoreet viverra, tortor libero
          sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti.
          Sed egestas, ante et vulputate volutpat, uctus metus libero eu augue.
          Morbi purus libero, faucibus adipiscing, commodo quis, gravida id,
          est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem
          at felis.
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
          src="https://www.youtube.com/embed/mf4upAPwHEo"
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
