import React from "react";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from 'react-moment';
import "./workshopPreview.scss";

const WorkshopPreview = ({ workshop }) => {
  
  return (
   
    <article className="workshop grid-container">
 <Link to="/workshop" className="workshop-link grid-x grid-margin-x">
   
<div className="small-12 cell">
<h3><strong>{workshop.name}</strong></h3>
</div>

            <div className="start small-3 cell"><p className="calender"><span><Moment format="MMM">{workshop.start}</Moment></span> <span><Moment format="DD">{workshop.start}</Moment></span></p>
                <span><Moment format="LT">{workshop.start}</Moment></span>
            </div>

            <div className="small-8 cell">
            <span className="location"><FontAwesomeIcon icon="map-marker" /> {workshop.location}</span>
            <span className="conference-room">{workshop.room}</span>
            <span className="instructor">{workshop.instructor.first} {workshop.instructor.last}</span>
            </div>
       
        </Link>
    </article>
  
  );
};
export default WorkshopPreview;
