import React from "react";
import './preview.scss'

const Preview = ({ workshop }) => {
  return (
    <div className="card-scroll">
      <div className="card" style={{ width: "300px" }}>
        <img src={workshop.image} alt={workshop.image_desc} />
        <div className="card-section" style={{ height: "15rem" }}>
          <h4>{workshop.name}</h4>
          <p>{workshop.date}</p>
          <p>{workshop.description}</p>
          <p>{workshop.instructor}</p>
        </div>
      </div>
    </div>
  )
};
export default Preview;