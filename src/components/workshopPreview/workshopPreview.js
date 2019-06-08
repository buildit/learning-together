import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import "./workshopPreview.scss";

const WorkshopPreview = ({workshop}) => {
  const start = workshop.start ? workshop.start : workshop.startDate;
  const wrkshopId = workshop.id ? workshop.id : workshop.workshopId;

  return (
    <Link
      to={`/workshop/${
        wrkshopId
        }`}
      className="workshop-card d-flex align-items-start"
    >

      <div className="workshop-cardTime">

        <h5>
          <Moment format="LT">{start}</Moment>
        </h5>{" "}

      </div>

        <div className="workshop-cardMetadata">
          <h3 className="title">
            {workshop.name}
          </h3>
          <p>Instructor: {workshop.educator.firstName} {workshop.educator.lastName}</p>
        </div>

    </Link>
  );
};
export default WorkshopPreview;
