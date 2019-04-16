import React from "react";
import Moment from 'react-moment';
import './preview.scss'

//TODO: ADD IN EDUCATOR NAME & WORKSHOP IMAGE
const Preview = ( workshop) => {
  const {name, start} = workshop.workshop
  const {firstName, lastName} = workshop.workshop.educator

  return (
    <div className="card-scroll-single">
      <div className="card" style={{ width: "84vw" }}>
      <div className="picture-frame">
        <img src='https://source.unsplash.com/random/400x400' alt='workshop' />
        </div>

        <div className="card-section">
        <Moment format="LLLL">{start}</Moment>
          <h2>{name}</h2>
          <p>Instructor: {firstName} {lastName}</p>
        </div>
      </div>
    </div>
  )
};
export default Preview;