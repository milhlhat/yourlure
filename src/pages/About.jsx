import React from "react";
import PropTypes from "prop-types";
import 'assets/scss/scss-pages/about.scss';
About.propTypes = {};

function About(props) {
  return (
    <div className="container">
      <h1>Use Bootstrap 3's carousel to show multiple items per slide.</h1>
      <div className="row">
        <div className="col-md-12">
          <div className="carousel slide multi-item-carousel" id="theCarousel">
            <div className="carousel-inner">
              <div className="item active">
                <div className="col-4">
                  <a href="#1">
                    <img
                      src="https://source.unsplash.com/300x300/?perth,australia"
                      className="img-responsive"
                    />
                  </a>
                </div>
              </div>
              <div className="item">
                <div className="col-4">
                  <a href="#1">
                    <img
                      src="https://source.unsplash.com/300x300/?fremantle,australia"
                      className="img-responsive"
                    />
                  </a>
                </div>
              </div>
              <div className="item">
                <div className="col-4">
                  <a href="#1">
                    <img
                      src="https://source.unsplash.com/300x300/?west-australia"
                      className="img-responsive"
                    />
                  </a>
                </div>
              </div>
              <div className="item">
                <div className="col-4">
                  <a href="#1">
                    <img
                      src="https://source.unsplash.com/300x300/?perth"
                      className="img-responsive"
                    />
                  </a>
                </div>
              </div>
              <div className="item">
                <div className="col-4">
                  <a href="#1">
                    <img
                      src="https://source.unsplash.com/300x300/?quokka,perth"
                      className="img-responsive"
                    />
                  </a>
                </div>
              </div>
              <div className="item">
                <div className="col-4">
                  <a href="#1">
                    <img
                      src="https://source.unsplash.com/300x300/?margaretriver,australia"
                      className="img-responsive"
                    />
                  </a>
                </div>
              </div>

              <div className="item">
                <div className="col-4">
                  <a href="#1">
                    <img
                      src="https://source.unsplash.com/300x300/?perth,australia&r=7"
                      className="img-responsive"
                    />
                  </a>
                </div>
              </div>
            </div>
            <a
              className="left carousel-control"
              href="#theCarousel"
              data-slide="prev"
            >
              <i className="glyphicon glyphicon-chevron-left"></i>
            </a>
            <a
              className="right carousel-control"
              href="#theCarousel"
              data-slide="next"
            >
              <i className="glyphicon glyphicon-chevron-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
