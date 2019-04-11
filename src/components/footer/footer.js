import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./footer.scss";

const FooterComponent = ({ isUser }) => {
  return (
    <div className="footer">
      {
        isUser &&
        <Link
          to="/create-workshop"
          className="flex flex-column justify-center align-items-center"
        >
          <FontAwesomeIcon icon="pencil-alt" />
          <p>Create Class</p>
        </Link>
      }
      <Link
        to="/workshops"
        className="flex flex-column justify-center align-items-center"
      >
        <FontAwesomeIcon icon="search" />
        <p>Browse</p>
      </Link>
    </div>
  );
};

export default FooterComponent;
