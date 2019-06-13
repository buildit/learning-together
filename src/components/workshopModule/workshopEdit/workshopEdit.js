import React, { Component } from "react";
import { WorkshopFormComponent } from "../workshopForm";
import {
  getWorkshop,
  updateWorkshop,
  deleteEvent,
  bookRoom
} from "../../../api.js";

class workshopEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sucess: false,
      data: {}
    };

    this.getWorkshopCallback = this.getWorkshopCallback.bind(this);
  }

  componentDidMount() {
    getWorkshop(this.props.computedMatch.params.id, this.getWorkshopCallback);
  }

  getWorkshopCallback(response) {
    console.log(response);
    if (response.status === 200) {
      const data = {
        name: response.data.name,
        start: response.data.start,
        end: response.data.end,
        locationId: response.data.locationId,
        categoryId: response.data.categoryId,
        webex: response.data.webex,
        description: response.data.description,
        imageUrl: response.data.imageUrl,
        room: response.data.room,
        robinEventId: response.data.robinEventId
          ? response.data.robinEventId
          : ""
      };
      this.setState({
        data
      });
    }
  }

  handleSubmit(data) {
    console.log("data", data);

    const {
      robinEventId,
      start,
      end,
      name,
      roomSelected,
      updateRobinReservation
    } = data;

    if (updateRobinReservation && robinEventId) {
      deleteEvent(robinEventId).then(
        bookRoom(start, end, name, roomSelected)
          .then(response => {
            console.log("response", response);
            if (response.status === 201) {
              console.log("inside success");
              console.log("robin id", response.data.data.id);
              data.robinEventId = response.data.data.id;
            }
          })
          .then(() =>
            updateWorkshop(this.props.computedMatch.params.id, data).then(
              response => {
                if (response.status === 200) {
                  this.setState({ success: true });
                }
              }
            )
          )
      );
    } else {
      updateWorkshop(this.props.computedMatch.params.id, data).then(
        response => {
          if (response.status === 200) {
            this.setState({ success: true });
          }
        }
      );
    }
  }

  render() {
    const { data } = this.state;
    return (
      <WorkshopFormComponent
        data={data}
        handleSubmit={this.handleSubmit.bind(this)}
        success={this.state.success}
        id={this.props.computedMatch.params.id}
        edit={true}
      />
    );
  }
}

export default workshopEdit;
