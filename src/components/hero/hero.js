import React from "react";
import "./hero.scss";
import logo from './logo.png';



const Hero = ({ image,title }) => {

const img = image ? image : `${process.env.PUBLIC_URL}/images/cover/default.jpg`

const style = {
  backgroundImage:`url(${img})`
}

  return (
    <section className="cover-frame" style={style}>
    <h1 className="landing-logo"> <img src={logo} /></h1>
    </section>
  );
};

export default Hero;