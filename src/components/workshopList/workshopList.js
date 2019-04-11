import React, { Component, Fragment } from "react";
import { WorkshopPreviewComponent } from "../workshopPreview";
import { NavbarComponent } from "../navbar";

class WorkshopList extends Component {
  render() {
    const workshopList = this.props.location.state.filter(workshop => {
      return workshop.category === this.props.location.category;
    });

    return (
      <Fragment>
        <NavbarComponent isUser={this.props.isUser} location={this.props.location} />
        {workshopList.map(workshop => (
          <WorkshopPreviewComponent key={workshop.id} workshop={workshop} />
        ))}
        {workshopList.length === 0 ? (
          <p>No workshops under this category</p>
        ) : null}

      </Fragment>
    );
  }
}

export default WorkshopList;
