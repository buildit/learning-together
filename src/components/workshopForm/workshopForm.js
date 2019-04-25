import React, { Component } from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import { Link, Redirect } from "react-router-dom";
import { MessageComponent } from "../message";
import { ImageUploaderComponent } from "../imageUploader";
import { createWorkshop, getCategoryList } from "../../api.js";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "./workshopForm.scss";

class WorkshopForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      location: 1,
      link: "",
      description: "",
      startDate: moment(),
      endDate: null,
      calendarFocused: false,
      categoryList: [],
      categorySelected: 1,
      startTime: "",
      endTime: "",
      error: {},
      success: false,
      redirect: false,
      workshopPicture: "",
      workshopId: null,
      room: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.redirectCallback = this.redirectCallback.bind(this);
    this.setWorkshopPicture = this.setWorkshopPicture.bind(this);
  }

  //TODO Handle Error
  componentDidMount() {
    getCategoryList()
      .then(response => this.setState({ categoryList: response.data }))
      .catch(error => {
        console.log(error);
      });
  }

  //If input is start time or date time modify moment object
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === "startTime" || e.target.name === "endTime") {
      this.setState({ [e.target.name]: e.target.value });

      if (e.target.name === "startTime" && this.state.startDate) {
        this.state.startDate.set({ h: e.target.value.slice(0, 2) });
        this.state.startDate.set({ m: e.target.value.slice(3, 5) });
      }

      if (e.target.name === "endTime" && this.state.startDate) {
        const endDate = this.state.startDate.clone();
        endDate.set({ h: e.target.value.slice(0, 2) });
        endDate.set({ m: e.target.value.slice(3, 5) });
        this.setState({ endDate });
      }
    }
  }

  onDateChange(date) {
    this.setState({
      startDate: date,
      endDate: date,
      startTime: "",
      endTime: ""
    });
  }

  onFocusChange({ focused }) {
    this.setState({ calendarFocused: focused });
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

    if (this.state.link === "") {
      errors["link"] = "Enter a valid Url";
      invalid = true;
    }

    if (this.state.description === "") {
      errors["description"] = "Enter a workshop description";
      invalid = true;
    }

    if (this.state.room === "") {
      errors["room"] = "Enter a room where workshop will be held";
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
        start: this.state.startDate.format("YYYY-MM-DDTHH:mm:ss.SSS"),
        end: this.state.endDate.format("YYYY-MM-DDTHH:mm:ss.SSS"),
        locationId: this.state.location,
        categoryId: this.state.categorySelected,
        webex: this.state.link,
        description: this.state.description,
        imageUrl: this.state.workshopPicture,
        room: this.state.room
      };
      console.log("data", data);
      createWorkshop(data).then(response => {
        if (response.status === 200) {
          this.setState({ success: true, workshopId: response.data });
        }
      });
    }
  }

  redirectCallback() {
    this.setState({ redirect: true });
  }

  setWorkshopPicture(picturePath) {
    this.setState({ workshopPicture: picturePath });
  }

  render() {
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
                    placeholder="workshop name"
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
                    {this.state.categoryList.map(category => {
                      return (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      );
                    })}
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
                <label>
                  Start Time
                  <input
                    type="time"
                    name="startTime"
                    min="10:00"
                    max="18:00"
                    value={this.state.startTime}
                    required
                    onChange={this.handleChange}
                  />
                  <span className="error">{this.state.error.time}</span>
                </label>
                <label>
                  End Time
                  <input
                    type="time"
                    name="endTime"
                    min="10:00"
                    max="18:00"
                    value={this.state.endTime}
                    required
                    onChange={this.handleChange}
                  />
                  <span className="error">{this.state.error.time}</span>
                </label>
              </div>
              <div className="medium-8 cell">
                <label>
                  Location
                  <select
                    name="location"
                    value={this.state.location}
                    onChange={this.handleChange}
                  >
                    <option value="1">New York </option>
                    <option value="2">London</option>
                    <option value="3">Edinburgh </option>
                    <option value="4">Dublin</option>
                    <option value="5">Denver </option>
                    <option value="6">Dallas </option>
                  </select>
                </label>
              </div>
              <div className="medium-8 cell">
                <label>
                  Room
                  <input
                    name="room"
                    onChange={this.handleChange}
                    type="text"
                    placeholder="room"
                  />
                  <span className="error">{this.state.error.room}</span>
                </label>
              </div>
              <div className="medium-8 cell">
                <label>
                  WebEx Link
                  <input
                    name="link"
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
              Create{" "}
            </button>
            <Link to="/" className="hollow button secondary custom-button">
              Cancel{" "}
            </Link>
          </div>
        </form>
        {this.state.success && (
          <MessageComponent
            message="Success"
            callback={this.redirectCallback}
          />
        )}
        {this.state.redirect && (
          <Redirect to={`/workshop/${this.state.workshopId}`} />
        )}
      </div>
    );
  }
}

export default WorkshopForm;
