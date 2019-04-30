import React, { Component, Fragment } from "react";
import { fetchWorkshops } from "../../api";
import { WorkshopPreviewComponent } from "../workshopPreview";
import { NavbarComponent } from "../navbar";
import { SortComponent } from "../sort";
import moment from "moment";
import "./browse.scss";

class Browse extends Component {
  state = {
    workshops: []
  };

  componentDidMount() {
    fetchWorkshops().then(workshops => {
      console.log(workshops)
      this.setState({ workshops });
    });
  }

  render() {
    const dates = this.state.workshops.map(workshop =>
      workshop.start.slice(0, 10)
    );

    return (
      <Fragment>
        <NavbarComponent isUser={this.props.isUser} />
        <section id="browser-container" className="current-category first-container">
          <h1 className="section-title"><b>All Workshops</b></h1>
        </section>
        <SortComponent/>
        {this.state.workshops.map(workshop => {
          return (
            <WorkshopPreviewComponent key={workshop.id} workshop={workshop} />
          );
        })}
      </Fragment>
    );
  }
}

export default Browse;
