import React, { Component } from "react";
import { fetchWorkshops } from "../../api";
import { WorkshopPreviewComponent } from "../workshopPreview";
import moment from "moment";

class Browse extends Component {
  state = {
    workshops: []
  };

  componentDidMount() {
    fetchWorkshops().then(workshops => {
      //console.log("received", workshops);
      this.setState({ workshops });
    });
  }

  render() {
    const dates = this.state.workshops.map(workshop =>
      workshop.start.slice(0, 10)
    );

    //console.log("dates array", dates);

    return (
      <div>
        <h1>All workshops</h1>
        {this.state.workshops.map(workshop => {
          return (
            <WorkshopPreviewComponent key={workshop.id} workshop={workshop} />
          );
        })}
      </div>
    );
  }
}

export default Browse;
