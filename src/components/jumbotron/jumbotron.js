import React from "react";
import "./jumbotron.scss";

const Jumbotron = ({ image,title }) => {

const img = image ? image : `${process.env.PUBLIC_URL}/images/cover/default.jpg`

const style = {
  backgroundImage:`url(${img})`
}

  return (
    <section className="cover-frame" style={style}>
      { title ? `<h1 className="title"><b>{title}</b></h1>` : ""} 
    </section>
  );
};

export default Jumbotron;
