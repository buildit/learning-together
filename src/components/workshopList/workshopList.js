import React, { Component, Fragment } from "react";
import { WorkshopPreviewComponent } from "../workshopPreview";
import { NavbarComponent } from "../navbar";
import workshopData from "./mock-workshops.json";
import { getWorkshopList, coverGenerator } from "../../api";
import "./workshoplist.scss";

class WorkshopList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      workshops: []
    }
  }

  componentDidMount() {
    getWorkshopList(this.props.computedMatch.params.id)
      .then((data) => {
        this.setState({
          workshops: data.data,
          title: this.props.computedMatch.params.title
        })
      })
  }
  componentDidUpdate(prevProps) {
    if (this.props.computedMatch.params.id !== prevProps.computedMatch.params.id) {
      getWorkshopList(this.props.computedMatch.params.id)
        .then((data) => {
          this.setState({
            workshops: data.data,
            title: this.props.computedMatch.params.title
          })
        })
    }
  }

  render() {
    return (
      <Fragment>
        <NavbarComponent isUser={this.props.isUser} location={this.props.location} />
        <section className="current-category first-container">
          <h1 className="section-title"><b>{this.state.title}</b></h1>
        </section>
        <section className="workshop-list grid-container">
          <div className="grid-x">
            {this.state.workshops.map(workshop => (
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
