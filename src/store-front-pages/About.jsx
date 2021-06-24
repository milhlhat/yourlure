import React from "react";
import PropTypes from "prop-types";
import "assets/scss/scss-pages/about.scss";
About.propTypes = {};

function About(props) {
  return (
    <div className="container about">
      <h1>Giới thiệu</h1>
      <div className="big-image">
        <img
          src="https://images.unsplash.com/photo-1580690497875-93aad5a9056d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIzNjU5ODQx&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=700"
          alt=""
        />
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
          <img
            // src="https://source.unsplash.com/300x300/?perth,australia"
            src="https://images.unsplash.com/photo-1599134733852-61560256bb50?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIzMzMyMTMz&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=300"
            className="img-responsive"
          />
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
          <img
            // src="https://source.unsplash.com/300x300/?perth,australia"
            src="https://images.unsplash.com/photo-1580692874422-eeda1658da9c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIzMzMyMTcz&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=300"
            className="img-responsive"
          />
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
          <img
            src="https://images.unsplash.com/photo-1591280063444-d3c514eb6e13?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIzMzMyMjA5&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=300"
            className="img-responsive"
          />
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
            <img src="https://source.unsplash.com/200x200/?perth,australia" alt="" />
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elite.</p>
          </div>
          <div className="info-detail mx-2">
            <img src="https://source.unsplash.com/200x200/?perth,australia" alt="" />
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elite.</p>
          </div>
          <div className="info-detail mx-2">
            <img src="https://source.unsplash.com/200x200/?perth,australia" alt="" />
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elite.</p>
          </div>
          <div className="info-detail mx-2">
            <img src="https://source.unsplash.com/200x200/?perth,australia" alt="" />
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elite.</p>
          </div>
          <div className="info-detail mx-2">
            <img src="https://source.unsplash.com/200x200/?perth,australia" alt="" />
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elite.</p>
          </div>
      </div>
    </div>
  );
}

export default About;
