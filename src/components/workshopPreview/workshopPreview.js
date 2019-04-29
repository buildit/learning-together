import React from "react";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from 'react-moment';
import "./workshopPreview.scss";

const WorkshopPreview = ({ workshop }) => {
  return (

    
 <Link to={`/workshop/${workshop.id}`} className="workshop-link grid-x grid-margin-x">
    <div className="cell small-12 cell">
    <p className="from-now"><Moment format="dddd">{workshop.startDate}</Moment> <Moment format="LT">{workshop.startDate}</Moment> | <Moment fromNow>{workshop.startDate}</Moment></p>
    </div>
            <div className="start small-3 cell"><p className="calender"><span><Moment format="MMM">{workshop.startDate}</Moment></span> <span><Moment format="DD">{workshop.startDate}</Moment></span></p>
            </div>
            <div className="small-9 cell">
<h3><strong>{workshop.name}</strong></h3>
</div>
        </Link>
   

  );
};
export default WorkshopPreview;
