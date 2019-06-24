import React, { Component, Fragment } from "react";
import { WorkshopFormComponent } from "../workshopForm";
import { createWorkshop, bookRoom } from "../../../api.js";
import { MessageComponent, LoadingComponent } from "../../messageModule";
import { Redirect } from "react-router-dom";

class workshopCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      workshopId: null,
      error: false,
      redirect: false,
      isCreating: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.bookWorkshop = this.bookWorkshop.bind(this);
    this.reserveRoom = this.reserveRoom.bind(this);
    this.redirectCallback = this.redirectCallback.bind(this);
  }

  redirectCallback() {
    this.setState({ redirect: true });
  }

  async reserveRoom(data) {
    const { start, end, name, roomSelected } = data;
    const response = await bookRoom(start, end, name, roomSelected);
    if (response.status === 201) {
      return response.data.data.id;
    } else {
      //HANDLE ERROR
      this.setState({ error: true });
    }
  }

  async bookWorkshop(data) {
    const response = await createWorkshop(data);
    if (response.status === 200) {
      this.setState({ success: true });
      return response.data;
    } else {
      //HANDLE ERROR
      this.setState({ error: true });
    }
  }

  async handleSubmit(data) {
    this.setState({ isCreating: true });
    if (data.locationId === 1 && data.roomSelected) {
      try {
        let response = await this.reserveRoom(data);
        data.robinEventId = response;
        let workshopId = await this.bookWorkshop(data);
        this.setState({ isCreating: false, success: true, workshopId });
      } catch (error) {
        //HANDLE ERROR
        this.setState({ error: true });
      }
    } else {
      try {
        let workshopId = await this.bookWorkshop(data);
        this.setState({ isCreating: false, success: true, workshopId });
      } catch (error) {
        //HANDLE ERROR
        this.setState({ error: true });
      }
    }
  }

  render() {

    return (
      <Fragment>
        <WorkshopFormComponent
          handleSubmit={this.handleSubmit}
          success={this.state.success}
          id={this.state.workshopId}
        />
        {this.state.error && (
          <MessageComponent
            message="There was an error. Try again later."
            callback={this.redirectCallback}
          />
        )}
        {this.state.isCreating  && (<LoadingComponent />)}
        {this.state.redirect && <Redirect to={`/`} />}
      </Fragment>
    );
  }
}

export default workshopCreate;
