import React, { Component, Fragment } from "react";
import { WorkshopPreviewComponent } from "../workshopPreview";
import { NavbarComponent } from "../navbar";
import workshopData from "./mock-workshops.json"
import "./workshoplist.scss";

class WorkshopList extends Component {
  render() {
    // const workshopList = this.props.location.state.filter(workshop => {
    //   return workshop.category === this.props.location.category;
    // });

    return (
      <Fragment>
        <NavbarComponent isUser={this.props.isUser} location={this.props.location} />
        <section className="current-category">
          <h1 className="section-title"><b>UX</b></h1>
        </section>
        <section class="workshop-list grid-container">
        <div className="grid-x">
        {workshopData.map(workshop => (
          <WorkshopPreviewComponent key={workshop.id} workshop={workshop} />
        ))}
        {/* {workshopList.length === 0 ? (
          <p>No workshops under this category</p>
        ) : null} */}
        </div>
        </section>

      </Fragment>
    );
  }
}

export default WorkshopList;
