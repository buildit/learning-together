import React from "react";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from 'react-moment';
import "./workshopPreview.scss";

const WorkshopPreview = ({ workshop }) => {
  return (
<Link to={`/workshop/${workshop.workshopId ? workshop.workshopId : workshop.id}`} className="workshop-link grid-x grid-margin-x" >
    <div className="cell small-12 cell">
    <p className="from-now"><Moment format="dddd">{workshop.start}</Moment> <Moment format="LT">{workshop.start}</Moment> | <Moment fromNow>{workshop.start}</Moment></p>
    </div>
            <div className="start small-3 medium-1 cell"><p className="calender"><span><Moment format="MMM">{workshop.start}</Moment></span> <span><Moment format="DD">{workshop.start}</Moment></span></p>
            </div>
            <div className="small-9 cell">
<h3 className="title"><strong>{workshop.name}</strong></h3>
<p>{workshop.description}</p>
</div>
        </Link>
   

  );
};
export default WorkshopPreview;
