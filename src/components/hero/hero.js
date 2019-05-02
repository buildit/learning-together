import React from "react";
import { Link, withRouter } from 'react-router-dom';
import "./hero.scss";

const Hero = ({ image,title,isUser }) => {

const img = image ? image : `${process.env.PUBLIC_URL}/images/cover/default.jpg`

const style = {
  backgroundImage:`url(${img})`
}

  return (
    <section className="cover-frame" style={style}>
    <div className="copy">
    <h1>Better Together</h1> <br />
    <p>A place for Buildit and Designit employees to learn togther by creating and attending workshops</p>
      {!isUser && (
        <Link
        className=""
        to={`/register`}
        >
        <button type="button" className="button call-to-action  large">
        <b>Create An Account</b>
        </button>
        </Link>
      )}
      {isUser && (
        <Link
        className=""
        to={`/create`}
        >
        <button type="button" className="button call-to-action large">
        <b>Create A Workshop</b>
        </button>
        </Link>
      )}
      </div>
    </section>
  );
};

export default Hero;
