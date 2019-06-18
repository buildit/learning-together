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
    this.bookWorkshop = this.bookWorkshop.bind(this);
  }

  async reserveRoom(data) {
    const { start, end, name, roomSelected } = data;
    const response = await bookRoom(start, end, name, roomSelected);
    if (response.status === 201) {
      return response.data.data.id;
    } else {
      //HANDLE ERROR
    }
  }

  async bookWorkshop(data) {
    const response = await createWorkshop(data);
    if (response.status === 200) {
      this.setState({ success: true });
      return response.data;
    } else {
      //HANDLE ERROR
    }
  }

  async handleSubmit(data) {
    if (data.locationId === 1 && data.roomSelected) {
      try {
        let response = await this.reserveRoom(data);
        data.robinEventId = response;
        let workshopId = await this.bookWorkshop(data);
        this.setState({ success: true, workshopId });
      } catch (error) {
        console.log(error);
        //HANDLE ERROR
      }
    } else {
      try {
        let workshopId = await this.bookWorkshop(data);
        this.setState({ success: true, workshopId });
      } catch (error) {
        console.log(error);
        //HANDLE ERROR
      }
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
