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
          p Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Consequuntur non recusandae aspernatur unde sed temporibus omnis, sunt
          ut neque repellat beatae rerum est deleniti sit quam itaque, ab
          molestias exercitationem.
        </p>
        <p>
          p Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Consequuntur non recusandae aspernatur unde sed temporibus omnis, sunt
          ut neque repellat beatae rerum est deleniti sit quam itaque, ab
          molestias exercitationem.
        </p>
        <p>
          p Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Consequuntur non recusandae aspernatur unde sed temporibus omnis, sunt
          ut neque repellat beatae rerum est deleniti sit quam itaque, ab
          molestias exercitationem.
        </p>
      </div>
      <div className="row mt-5">
        <div className="col-12 col-md-6 order-md-1 my-auto showcase-text">
          <img src={img1} className="img-responsive" />
        </div>
        <div className="col-12 col-md-6 order-md-2 my-auto showcase-text text-case">
          <span>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam ex
            est sit in? Ipsa, nulla numquam reiciendis iure cum mollitia animi,
            deserunt totam error nesciunt sequi asperiores quibusdam earum enim.
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6 order-md-2 my-auto showcase-text">
          <img src={img6} className="img-responsive" />
        </div>
        <div className="col-12 col-md-6 order-md-1 my-auto showcase-text text-case">
          <span>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam ex
            est sit in? Ipsa, nulla numquam reiciendis iure cum mollitia animi,
            deserunt totam error nesciunt sequi asperiores quibusdam earum enim.
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6 order-md-1 my-auto showcase-text">
          <img src={img4} className="img-responsive" />
        </div>
        <div className="col-12 col-md-6 order-md-2 my-auto showcase-text text-case">
          <span>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam ex
            est sit in? Ipsa, nulla numquam reiciendis iure cum mollitia animi,
            deserunt totam error nesciunt sequi asperiores quibusdam earum enim.
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
