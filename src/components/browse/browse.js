import React, { Component, Fragment } from "react";
import { fetchWorkshops } from "../../api";
import { WorkshopPreviewComponent } from "../workshopPreview";
import { NavbarComponent } from "../navbar";
import { SortComponent } from "../sort";
import "./browse.scss";

class Browse extends Component {
  state = {
    workshops: [],
    sortBy: 'date'
  };

  componentDidMount() {
    fetchWorkshops().then(workshops => {
      this.setState({ workshops });
    });
  }

 handleSort(sort) {
    this.setState({sortBy: sort})
 }

  render() {
    const sortedWorkshops = this.state.workshops.sort((a,b) => {
      if (this.state.sortBy === 'date') {
        return a.start > b.start ? 1 : -1
      } else if (this.state.sortBy === 'name') {
        return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      } 
    })

    return (
      <Fragment>
        <NavbarComponent isUser={this.props.isUser} />
        <section id="browser-container" className="current-category first-container">
          <h1 className="section-title"><b>All Workshops</b></h1>
        </section>
        <SortComponent handleSort={this.handleSort.bind(this)} />
        {sortedWorkshops.map(workshop => {
          return (
            <WorkshopPreviewComponent key={workshop.id} workshop={workshop} />
          );
        })}
      </Fragment>
    );
  }
}

export default Browse;
