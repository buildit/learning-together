import React, { Component, Fragment } from "react";
import { WorkshopFormComponent } from "../workshopForm";
import {
  getWorkshop,
  updateWorkshop,
  deleteEvent,
  bookRoom
} from "../../../api.js";
import { MessageComponent } from "../../messageModule";
import { Redirect } from "react-router-dom";

class workshopEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sucess: false,
      data: {},
      disableRoomSelection: true,
      updateRobinReservation: false,
      error: false,
      redirect: false
    };
    this.getWorkshopCallback = this.getWorkshopCallback.bind(this);
    this.handleRobinUpdate = this.handleRobinUpdate.bind(this);
    this.removeEvent = this.removeEvent.bind(this);
    this.reserveRoom = this.reserveRoom.bind(this);
    this.handleUpdateWorkshop = this.handleUpdateWorkshop.bind(this);
    this.redirectCallback = this.redirectCallback.bind(this);
  }

  componentDidMount() {
    getWorkshop(this.props.computedMatch.params.id, this.getWorkshopCallback);
  }

  getWorkshopCallback(response) {
    const {
      name,
      start,
      end,
      locationId,
      categoryId,
      webex,
      description,
      imageUrl,
      room,
      archiveLink
    } = response.data;

    if (response.status === 200) {
      const data = {
        name,
        start,
        end,
        locationId,
        categoryId,
        webex,
        description,
        imageUrl,
        room,
        archiveLink,
        robinEventId: response.data.robinEventId
          ? response.data.robinEventId
          : ""
      };
      this.setState({
        data
      });
    }
  }

  handleRobinUpdate(e) {
    e.preventDefault();

    this.setState({
      disableRoomSelection: false,
      updateRobinReservation: true
    });
  }

  redirectCallback() {
    this.setState({ redirect: true });
  }

  async removeEvent(robinEventId) {
    const response = await deleteEvent(robinEventId);
    console.log("response", response);
    if (response.status === 200) {
      return response.data;
    } else {
      //HANDLE ERROR
      console.log("error");
      this.setState({ error: true });
    }

    return response;
  }

  async reserveRoom(data) {
    const { start, end, name, roomSelected } = data;
    const response = await bookRoom(start, end, name, roomSelected);
    if (response.status === 201) {
      return response.data.data.id;
    } else {
      //HANDLE ERROR
      this.setState({ error: true });
      console.log("error");
    }
  }

  async handleUpdateWorkshop(workshopId, data) {
    const response = await updateWorkshop(workshopId, data);
    console.log("response", response);
    if (response.status === 200) {
      this.setState({ success: true });
      return response;
    } else {
      //HANDLE ERROR
      console.log("error");
      this.setState({ error: true });
    }
  }

  async handleSubmit(data) {
    const { robinEventId } = data;
    if (this.state.updateRobinReservation && robinEventId) {
      try {
        await this.removeEvent(robinEventId);
        let newRobinEventId = await this.reserveRoom(data);
        data.robinEventId = newRobinEventId;
        await this.handleUpdateWorkshop(
          this.props.computedMatch.params.id,
          data
        );
      } catch (error) {
        //HANDLE ERROR
        console.log(error);
        this.setState({ error: true });
      }
    } else {
      try {
      } catch (error) {
        //HANDLE ERROR
        console.log(error);
        this.setState({ error: true });
      }
    }
  }

  render() {
    const { data } = this.state;
    return (
      <Fragment>
        <WorkshopFormComponent
          data={data}
          handleSubmit={this.handleSubmit.bind(this)}
          success={this.state.success}
          id={this.props.computedMatch.params.id}
          edit={true}
          handleRobinUpdate={this.handleRobinUpdate}
          disableRoomSelection={this.state.disableRoomSelection}
        />
        {this.state.error && (
          <MessageComponent
            message="There was an error. Try again later."
            callback={this.redirectCallback}
          />
        )}
        {this.state.redirect && <Redirect to={`/`} />}
      </Fragment>
    );
  }
}

export default workshopEdit;
