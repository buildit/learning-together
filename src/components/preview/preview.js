import React from "react";

const Preview = ({ workshop }) => {
  return (
    <div className="cell small-2">
      <div class="card" style={{ width: "300px" }}>
        <div classname="card-section">
          <img src={workshop.image} alt={workshop.image_desc} />
        </div>
        <div class="card-section">
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