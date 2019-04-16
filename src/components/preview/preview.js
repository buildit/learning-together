import React from "react";
import Moment from 'react-moment';
import './preview.scss'
import {coverGenerator} from '../../api';

//TODO: ADD IN EDUCATOR NAME & WORKSHOP IMAGE
const Preview = ({ workshop }) => {
  const img = workshop.imageUrl ? workshop.imageUrl : coverGenerator(workshop.id);
  return (
   
      <div className="card" style={{ width: "100vw" }}>
      <div className="picture-frame">
        <img src={img} alt='workshop' />
      </div>

        <div className="card-section">
        <Moment format="LLLL">{workshop.start}</Moment>
          <h4 className="workshop-preview-title">{workshop.name}</h4>
          <p></p>
        </div>
      </div>

  )
};
export default Preview;

Preview.defaultProps = {
  workshop : {
    id: "",
    educator : {
      firstName: '',
      lastName: "",
      imageUrl: ""
    }
  }
}