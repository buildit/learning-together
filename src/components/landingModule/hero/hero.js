import React from "react";
import { Link } from 'react-router-dom';
import "./hero.scss";

const Hero = ({ image }) => {

  const img = image ? image : `${process.env.PUBLIC_URL}/images/cover/default.jpg`

  const style = {
    backgroundImage: `url(${img})`
  }

  return (
    <section className="cover-frame" style={style}>


      <div className="copy">
        <h1>Better Together</h1>
        <div className="calls-to-action">
          <Link
            className="call-to-action-link"
            to={`/create`}
          >
            <button type="button" className="button call-to-action large">
              <b>Create A Workshop</b>
            </button>
          </Link>

          <Link
            className="call-to-action-link"
            to={`/workshops`}
          >
            <button type="button" className="button call-to-action browse large">
              <b>Browse Workshops</b>
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Hero;
