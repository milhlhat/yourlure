import React from "react";
import { Link } from "react-router-dom";

import "./scss/card-profile.scss";

function CardProfile(props) {
  const { name, title, content, facebook, instagram, mail, image } = props.item;

  return (
    <div className="member member-anim text-center">
      <figure className="member-media">
        <img src={image} alt="member" className={"avatar"} />

        <figcaption className="member-overlay">
          <div className="member-overlay-content">
            <h2 className="member-title">
              {name}
              <span className={"mt-2"}>{title}</span>
            </h2>
            <p>{content}</p>
            <div className="social-icons social-icons-simple">
              <a
                href={facebook}
                className="social-icon"
                title="Facebook"
                target="_blank"
              >
                <i className="fab fa-facebook-f" />
              </a>
              <Link to="#" className="social-icon" title="Mail">
                <i
                  className="fal fa-envelope-open-text"
                  onClick={(e) => {
                    window.location = `mailto:${mail}`;
                    e.preventDefault();
                  }}
                />
              </Link>
              <a
                href={instagram}
                className="social-icon"
                title="Instagram"
                target="_blank"
              >
                <i className="fab fa-instagram" />
              </a>
            </div>
          </div>
        </figcaption>
      </figure>

      <div className="member-content">
        <h3 className="member-title">
          {name}
          <span>{title}</span>
        </h3>
      </div>
    </div>
  );
}

export default CardProfile;
