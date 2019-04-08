import React from "react";

const Preview = props => {
  return (
    <div>
      <img src={props.workshop.image} alt={props.workshop.image_desc} />
      <h4>{props.workshop.name}</h4>
      <p>{props.workshop.date}</p>
      <p>{props.workshop.description}</p>
      <p>{props.workshop.instructor}</p>
    </div>
  );
};
export default Preview;
