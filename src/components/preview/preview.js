import React from "react";
import Moment from 'react-moment';
import './preview.scss'

const Preview = ({ workshop }) => {
  return (
    <div className="card-scroll-single">
      <div className="card" style={{ width: "84vw" }}>
      <div className="picture-frame">
        <img src={workshop.image} alt={workshop.image_desc} />
        </div>

        <div className="card-section">
        <Moment format="LLLL">{workshop.start}</Moment>
          <h2>{workshop.name}</h2>
          <p>{workshop.instructor.first} {workshop.instructor.last}</p>
        </div>
      </div>
    </div>
  )
};
export default Preview;