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


  /*
    async reserveRoom(data) {
      
      const { start, end, name, roomSelected } = data;

      const response = await bookRoom (start, end, name, roomSelected)
    }


  */


  reserveRoom(data) {
    const { start, end, name, roomSelected } = data;

    return bookRoom(start, end, name, roomSelected).then(response => {
      if (response.status === 201) {
        return response.data.data.id;
      }
      return;
    });
  }

  handleSubmit(data) {
    if (data.locationId === 1 && data.roomSelected) {
      this.reserveRoom(data).then(response => {
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
