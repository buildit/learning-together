import React, { Component } from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import { Link, Redirect } from "react-router-dom";
import { getCategoryList, getLocationList, findRoom } from "../../../api.js";
import { MessageComponent } from "../../messageModule";
import { ImageUploaderComponent } from "../../userModule";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "./workshopForm.scss";

class WorkshopForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.data ? props.data.name : "",
      location: props.data ? props.data.locationId : 1,
      locationList: [],
      link: props.data ? props.data.webex : "",
      description: props.data ? props.data.description : "",
      startDate: props.data ? moment(props.data.start) : moment(),
      endDate: props.data ? moment(props.data.end) : null,
      calendarFocused: false,
      categoryList: [],
      categorySelected: props.data ? props.data.categoryId : 1,
      startTime: props.data ? moment(props.data.start) : null,
      endTime: props.data ? moment(props.data.end) : null,
      error: {},
      redirect: false,
      workshopPicture: props.data ? props.data.imageUrl : "",
      room: props.data ? props.data.room : "",
      roomAvailable: props.data ? [] : [],
      roomSelected: props.data ? true : "",
      robinEventId: props.data ? props.data.robinEventId : null,
      updateRobinReservation: false,
      disableRoomSelection: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.redirectCallback = this.redirectCallback.bind(this);
    this.setWorkshopPicture = this.setWorkshopPicture.bind(this);
    this.getLocationCallBack = this.getLocationCallBack.bind(this);
    this.handleRobinUpdate = this.handleRobinUpdate.bind(this);
  }

  //TODO Handle Error
  componentDidMount() {
    getCategoryList()
      .then(response => this.setState({ categoryList: response.data }))
      .catch(error => {
        console.log(error);
      });

    getLocationList(this.getLocationCallBack);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      if (nextProps.data.name !== this.props.data.name) {
        this.setState({ name: nextProps.data.name });
      }

      if (nextProps.data.categoryId !== this.props.data.categoryId) {
        this.setState({
          categorySelected: nextProps.data.categoryId
        });
      }

      if (nextProps.data.imageUrl !== this.props.data.imageUrl) {
        this.setState({
          workshopPicture: nextProps.data.imageUrl
        });
      }

      if (nextProps.data.start !== this.props.data.start) {
        this.setState({
          startTime: moment(nextProps.data.start),
          startDate: moment(nextProps.data.start),
          endDate: moment(nextProps.data.end)
        });
      }

      if (nextProps.data.end !== this.props.data.end) {
        this.setState({
          endTime: moment(nextProps.data.end)
        });
      }

      if (nextProps.data.locationId !== this.props.data.locationId) {
        this.setState({
          location: nextProps.data.locationId
        });
      }

      if (nextProps.data.webex !== this.props.data.webex) {
        this.setState({ link: nextProps.data.webex });
      }

      if (nextProps.data.room !== this.props.data.room) {
        this.setState({ room: nextProps.data.room });
      }

      if (nextProps.data.description !== this.props.data.description) {
        this.setState({ description: nextProps.data.description });
      }

      if (nextProps.data.robinEventId !== this.props.data.robinEventId) {
        this.setState({ robinEventId: nextProps.data.robinEventId });
      }
    }
  }
  //If input is start time or date time modify moment object
  handleChange(e, name) {
    if (name !== undefined && (name === "startTime" || name === "endTime")) {
      const month = this.state.startDate.month();
      const day = this.state.startDate.date();
      const year = this.state.startDate.year();
      const time = e
        .year(year)
        .month(month)
        .date(day);
      this.setState({ [name]: time, roomAvailable: [] });
    } else if (e.target.name === "roomSelected") {
      const { options, selectedIndex } = e.target;
      this.setState({ [e.target.name]: e.target.value });
      this.setState({ room: options[selectedIndex].innerText });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  getLocationCallBack(response) {
    if (response.status === 200) {
      this.setState({ locationList: response.data });
    }
  }

  onDateChange(date) {
    const month = date.month();
    const day = date.date();
    const year = date.year();
    this.setState({
      startDate: date,
      endDate: date
    });

    if (this.state.startTime !== null) {
      const startTime = this.state.startTime
        .year(year)
        .month(month)
        .date(day);
      this.setState({
        startTime
      });
    }

    if (this.state.endTime !== null) {
      const endTime = this.state.endTime
        .year(year)
        .month(month)
        .date(day);
      this.setState({ endTime });
    }
  }

  onFocusChange({ focused }) {
    this.setState({ calendarFocused: focused });
  }

  handleRobinUpdate(e) {
    e.preventDefault();

    this.setState({
      disableRoomSelection: false,
      updateRobinReservation: true
    });
  }

  validateForm() {
    let invalid = false;
    let errors = {};

    if (this.state.name === "") {
      errors["name"] = "Enter a workshop name";
      invalid = true;
    }

    if (this.state.startDate === null) {
      errors["date"] = "Pick valid date";
      invalid = true;
    }

    if (
      this.state.startTime === "" ||
      this.state.endTime === "" ||
      this.state.startTime > this.state.endTime
    ) {
      errors["time"] = "Pick valid time";
      invalid = true;
    }

    this.setState({ error: errors });
    return invalid;
  }

  handleSubmit(e) {
    e.preventDefault();

    const error = this.validateForm();

    if (error) {
      window.scrollTo(0, 0);
    } else {
      const data = {
        name: this.state.name,
        start: this.state.startTime.format("YYYY-MM-DDTHH:mm:ss.SSS"),
        end: this.state.endTime.format("YYYY-MM-DDTHH:mm:ss.SSS"),
        locationId: this.state.location,
        categoryId: parseInt(this.state.categorySelected),
        webex: this.state.link,
        description: this.state.description,
        imageUrl: this.state.workshopPicture,
        room: this.state.room,
        robinEventId: this.state.robinEventId,
        roomSelected: this.state.roomSelected,
        updateRobinReservation: this.state.updateRobinReservation
      };
      this.props.handleSubmit(data);
    }
  }

  redirectCallback() {
    this.setState({ redirect: true });
  }

  setWorkshopPicture(picturePath) {
    this.setState({ workshopPicture: picturePath });
  }

  render() {
    const categories = this.state.categoryList.map(category => {
      return (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      );
    });

    const locations = this.state.locationList.map(location => {
      return (
        <option key={location.id} value={location.id}>
          {location.name}
        </option>
      );
    });

    const availableRooms = this.state.roomAvailable.map(room => {
      return (
        <option
          key={room.id}
          value={room.id}
          disabled={this.props.edit && this.state.disableRoomSelection}
        >
          {room.room}
        </option>
      );
    });

    if (
      this.state.location === 1 &&
      this.state.startTime !== null &&
      this.state.endTime !== null &&
      this.state.roomAvailable.length === 0
    ) {
      findRoom(this.state.startTime, this.state.endTime).then(response => {
        if (response.length === 0) {
          console.log("No rooms available - Pick another time");
        } else {
          this.setState({
            roomAvailable: response,
            roomSelected: ""
          });
        }
      });
    }

    return (
      <div className="workshop-form first-container">
        <form onSubmit={this.handleSubmit}>
          <div className="grid-container">
            <div className="grid-x grid-padding-x align-center">
              <div className="medium-8 cell">
                <label>
                  Workshop Name
                  <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    autoFocus
                  />
                  <span className="error">{this.state.error.name}</span>
                </label>
              </div>
              <div className="medium-8 cell">
                <label>
                  Category
                  <select
                    name="categorySelected"
                    value={this.state.categorySelected}
                    onChange={this.handleChange}
                  >
                    {categories}
                  </select>
                </label>
              </div>
              <div className="medium-8 cell">
                <label>Workshop Image:</label>
                <ImageUploaderComponent setPicture={this.setWorkshopPicture} />
              </div>
              <div className="medium-8 cell">
                <label>Date</label>
                <SingleDatePicker
                  date={this.state.startDate}
                  onDateChange={this.onDateChange}
                  focused={this.state.calendarFocused}
                  onFocusChange={this.onFocusChange}
                  numberOfMonths={1}
                />
                <span className="error">{this.state.error.date}</span>
              </div>
              <div className="medium-8 cell">
                <label>Start time</label>
                {
                  <TimePicker
                    className="custom-time-picker"
                    name="startTime"
                    defaultValue={null}
                    showSecond={false}
                    minuteStep={15}
                    allowEmpty={false}
                    use12Hours={true}
                    focusOnOpen={true}
                    onChange={(value, name = "startTime") =>
                      this.handleChange(value, name)
                    }
                    value={this.state.startTime}
                  />
                }

                <span className="error">{this.state.error.time}</span>
              </div>
              <div className="medium-8 cell">
                <label>End time</label>
                <TimePicker
                  className="custom-time-picker"
                  name="endTime"
                  defaultValue={null}
                  showSecond={false}
                  minuteStep={15}
                  allowEmpty={false}
                  use12Hours={true}
                  focusOnOpen={true}
                  onChange={(value, name = "endTime") => {
                    this.handleChange(value, name);
                  }}
                  value={this.state.endTime}
                />
                <span className="error">{this.state.error.time}</span>
              </div>
              <div className="medium-8 cell">
                <label>
                  Location
                  <select
                    name="location"
                    value={this.state.location}
                    onChange={this.handleChange}
                  >
                    {locations}
                  </select>
                </label>
              </div>
              {(this.state.location > 1 || this.props.edit) && (
                <div className="medium-8 cell">
                  <label>
                    {this.props.edit && this.props.data.robinEventId
                      ? "Reserved Room"
                      : "Room"}
                    <input
                      readOnly={this.props.edit && this.props.data.robinEventId}
                      name="room"
                      value={this.state.room}
                      onChange={this.handleChange}
                      type="text"
                      placeholder="room"
                    />
                    <span className="error">{this.state.error.room}</span>
                  </label>
                </div>
              )}
              <div className="medium-8 cell">
                {availableRooms.length > 0 &&
                this.state.location === 1 &&
                (!this.props.edit || !this.state.disableRoomSelection) ? (
                  <label>
                    Room Available
                    <select
                      name="roomSelected"
                      value={this.state.roomSelected}
                      onChange={this.handleChange}
                    >
                      <option value="">Select a room</option>
                      {availableRooms}
                    </select>
                  </label>
                ) : (
                  ""
                )}
                {availableRooms.length === 0 &&
                this.state.location === 1 &&
                this.state.startTime !== null &&
                this.state.endTime !== null ? (
                  <p>All rooms are taken at this time. Pick another time.</p>
                ) : (
                  ""
                )}
              </div>
              {this.props.edit && this.props.data.robinEventId && (
                <div className="medium-8 cell ">
                  <button
                    onClick={this.handleRobinUpdate}
                    className="button custom-button"
                  >
                    Update Robin reservation
                  </button>
                </div>
              )}
              <div className="medium-8 cell">
                <label>
                  WebEx Link
                  <input
                    name="link"
                    value={this.state.link}
                    onChange={this.handleChange}
                    type="url"
                    placeholder="webex link"
                  />
                  <span className="error">{this.state.error.link}</span>
                </label>
              </div>
              <div className="medium-8 cell">
                <label>
                  Description
                  <textarea
                    name="description"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.description}
                    placeholder="workshop description"
                    style={{ height: "100px" }}
                  />
                  <span className="error">{this.state.error.description}</span>
                </label>
              </div>
            </div>
          </div>
          <div className="grid-x align-center">
            <button className="button custom-button submit" type="submit">
              {this.props.edit ? "Update" : "Create"}
            </button>
            <Link to="/" className="hollow button secondary custom-button">
              Cancel{" "}
            </Link>
          </div>
        </form>
        {this.props.success && (
          <MessageComponent
            message="Success"
            callback={this.redirectCallback}
          />
        )}

        {this.state.redirect && <Redirect to={`/workshop/${this.props.id}`} />}
      </div>
    );
  }
}

export default WorkshopForm;
