import React from "react";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from 'react-moment';
import "./workshopPreview.scss";

const WorkshopPreview = ({ workshop }) => {
  
  return (

    <article className="workshop grid-x grid-margin-x">
        <div className="date cell small-4">

            <div className="start"><p className="calender"><span><Moment format="MMMM">{workshop.start}</Moment></span> <span><Moment format="DD">{workshop.start}</Moment></span> <span><Moment format="YYYY">{workshop.start}</Moment></span></p>
                <span><Moment format="LT">{workshop.start}</Moment></span>
            </div>

        </div>
        <div className="workshop-info cell small-7">
            <h3><strong>{workshop.name}</strong></h3>
            <span className="location"><FontAwesomeIcon icon="map-marker" /> {workshop.location}</span>
            <span className="conference-room">{workshop.room}</span>
            <span className="instructor">{workshop.instructor.first} {workshop.instructor.last}</span>
        </div>
        <div className="grid-container button-container">
            <Link to="/workshop" className="button">Learn More</Link>
        </div>
    </article>
  );
};
export default WorkshopPreview;
