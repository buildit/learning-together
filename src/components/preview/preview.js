import React from "react";
import Moment from "react-moment";
import "./preview.scss";
import { coverGenerator } from "../../api";

//TODO: ADD IN EDUCATOR NAME
const Preview = ({ workshop }) => {
  const img = workshop.imageUrl
    ? `http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com${
        workshop.imageUrl
      }`
    : coverGenerator(workshop.id);
  const { name, start } = workshop;
  const { firstName, lastName } = workshop.educator;
  return (
    <div className="card" style={{ width: "100vw" }}>
      <div className="picture-frame">
        <img src={img} alt="workshop" />
      </div>

      <div className="card-section">
        <Moment format="LLLL">{start}</Moment>
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
