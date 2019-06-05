import React, { Component, Fragment } from "react";
import { WorkshopPreviewComponent } from "../workshopPreview";
import { NavbarComponent } from "../../navbarModule";
import { getWorkshopList } from "../../../api";
import "./workshoplist.scss";

class WorkshopList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      workshops: []
    };
  }

  componentDidMount() {
    getWorkshopList(this.props.computedMatch.params.id).then(data => {
      this.setState({
        workshops: data.data,
        title: this.props.computedMatch.params.title
      });
    });
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.computedMatch.params.id !== prevProps.computedMatch.params.id
    ) {
      getWorkshopList(this.props.computedMatch.params.id).then(data => {
        this.setState({
          workshops: data.data,
          title: this.props.computedMatch.params.title
        });
      });
    }
  }

  render() {
    return (
      <Fragment>
        <NavbarComponent
          location={this.props.location}
        />
        <section className="current-category first-container">
          <h1 className="section-title">
            <b>{this.state.title}</b>
          </h1>
        </section>
        <section className="workshop-list grid-container">
          <div className="grid medium-6">
            {this.state.workshops.map(workshop => (
              <WorkshopPreviewComponent key={workshop.id} workshop={workshop} />
            ))}
          </div>
        </section>
      </Fragment>
    );
  }
}

export default WorkshopList;
