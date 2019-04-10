import React, { Component } from "react";
import { WorkshopPreviewComponent } from "../workshopPreview";

class WorkshopList extends Component {
  render() {
    const workshopList = this.props.location.state.filter(workshop => {
      return workshop.category === this.props.location.category;
    });

    return (
      <div>
        {workshopList.map(workshop => (
          <WorkshopPreviewComponent key={workshop.id} workshop={workshop} />
        ))}
        {workshopList.length === 0 ? (
          <p>No workshops under this category</p>
        ) : null}
      </div>
    );
  }
}

export default WorkshopList;
