import React from "react";
import "./hero.scss";

const Hero = ({ image }) => {
  const img = image
    ? image
    : `${process.env.PUBLIC_URL}/images/cover/default.jpg`;

  const style = {
    backgroundImage: `url(${img})`
  };

  return <section className="cover-frame" style={style} />;
};

export default Hero;
