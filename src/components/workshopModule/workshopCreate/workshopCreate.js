import React, { Component } from "react";
import { WorkshopFormComponent } from "../workshopForm";
import { createWorkshop, bookRoom } from "../../../api.js";

class workshopCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      workshopId: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  reserveRoom(data) {
    const { start, end, name, roomSelected } = data;
    console.log(data);

    return bookRoom(start, end, name, roomSelected).then(response => {
      console.log("response", response);
      if (response.status === 201) {
        console.log("inside success");
        console.log("robin id", response.data.data.id);
        return response.data.data.id;
      }
      return;
    });
  }

  handleSubmit(data) {
    console.log(data);
    if (data.locationId === 1 && data.roomSelected) {
      this.reserveRoom(data).then(response => {
        console.log("setting robin", response);
        data.robinEventId = response;

        createWorkshop(data)
          .then(response => {
            if (response.status === 200) {
              this.setState({ success: true, workshopId: response.data });
            }
          })
          .catch(error => {
            console.log(error);
          });
      });
    } else {
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
    console.log("data", data);
    //this.props.handleSubmit(data);
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
