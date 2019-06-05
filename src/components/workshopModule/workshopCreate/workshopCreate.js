import React, { Component } from "react";
import { WorkshopFormComponent } from "../workshopForm";
import { createWorkshop } from "../../../api.js";

class workshopCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      workshopId: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(data) {
    createWorkshop(data)
      .then(response => {
        if (response.status === 200) {
          this.setState({ success: true, workshopId: response.data });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <WorkshopFormComponent
        handleSubmit={this.handleSubmit}
        success={this.state.success}
        id={this.state.workshopId}
      />
    );
  }
}

export default workshopCreate;
