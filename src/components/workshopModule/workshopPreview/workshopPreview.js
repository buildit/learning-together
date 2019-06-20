import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import "./workshopPreview.scss";

const WorkshopPreview = ({ workshop }) => {
  const start = workshop.start ? workshop.start : workshop.startDate;
  const wrkshopId = workshop.id ? workshop.id : workshop.workshopId;
  const isVideo = workshop.archiveLink ? true : false ;
 
  return (
    <Link
      to={`/workshop/${
        wrkshopId
        }`}
      className="workshop-link grid-x grid-margin-x"
    >

      <div className="start small-3 medium-2 cell">
      
          <p>
          {isVideo ?  "" : <Moment format="LT">{start}</Moment>}
          </p>{" "}
   
      </div>
      <div className="small-9 medium-8 cell">
      <div className="workshop-data">
        <h5 className="title">
          {workshop.name}
        </h5>
        <p>Instructor: <b>{workshop.educator.firstName} {workshop.educator.lastName}</b></p>
      </div>
      </div>
    </Link>
  );
};
export default WorkshopPreview;
