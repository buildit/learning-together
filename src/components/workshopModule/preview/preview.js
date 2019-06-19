import React from "react";
import Moment from "react-moment";
import "./preview.scss";
import { coverGenerator } from "../../../api";

//TODO: ADD IN EDUCATOR NAME & WORKSHOP IMAGE

const Preview = ({ workshop }) => {
  const img = workshop.imageUrl
    ? `https://bettertogether.buildit.systems${
    workshop.imageUrl
    }`
    : coverGenerator(workshop.id);
  const { name, start } = workshop;
  const { firstName, lastName } = workshop.educator;
  const isVideo = workshop.archiveLink ? true : false ;

  return (

    <div className="preview card" >
      {
        img ? <div className="picture-frame"><img src={img} alt={name} /> </div>
          : ""
      }

      <div className="card-section">
        {isVideo ?  "" : <Moment format="LLLL">{start}</Moment>}
        
        <h4 className="workshop-preview-title">{name}</h4>
        <p>
          Instructor:{" "}
          <b>
            {firstName} {lastName}
          </b>
        </p>
      </div>
    </div>
  );
};
export default Preview;

Preview.defaultProps = {
  workshop: {
    id: "",
    educator: {
      firstName: "",
      lastName: "",
      imageUrl: ""
    }
  }
};
