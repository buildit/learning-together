import React, { Component } from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import { Link } from "react-router-dom";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "./workshopForm.scss";

class WorkshopForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      location: "New York",
      link: "",
      description: "",
      date: moment(),
      calendarFocused: false,
      time: "",
      error: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === "time") {
      this.setState({ time: e.target.value });

      if (this.state.date) {
        this.state.date.set({ h: e.target.value.slice(0, 2) });
        this.state.date.set({ m: e.target.value.slice(3, 5) });
      }
    }
  }

  onDateChange(date) {
    this.setState({ date });
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

    if (this.state.date === null) {
      errors["date"] = "Pick valid date";
      invalid = true;
    }

    if (this.state.time === "") {
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

    this.setState({ error: errors });
    return invalid;
  }

  //TO DO: REDIRECT TO USER TO SUCCESS PAGE
  handleSubmit(e) {
    e.preventDefault();

    const error = this.validateForm();

    if (error) {
      window.scrollTo(0, 0);
    } else {
      console.log({
        name: this.state.name,
        date: this.state.date,
        location: this.state.location,
        link: this.state.link,
        description: this.state.description
      });

      console.log("form was submitted");
    }
  }

  render() {
    return (
      <div className="workshop-form">
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
                <label>Date</label>
                <SingleDatePicker
                  date={this.state.date}
                  onDateChange={this.onDateChange}
                  focused={this.state.calendarFocused}
                  onFocusChange={this.onFocusChange}
                  numberOfMonths={1}
                />
                <span className="error">{this.state.error.date}</span>
                <label>
                  {" "}
                  Time
                  <input
                    type="time"
                    name="time"
                    min="10:00"
                    max="18:00"
                    value={this.state.time}
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
                    <option value="New York">New York </option>
                    <option value="Denver">Denver </option>
                    <option value="Bangalore">Bangalore </option>
                    <option value="Dublin">Dublin</option>
                    <option value="Edinburgh">Edinburgh </option>
                    <option value="Gdansk">Gdansk</option>
                    <option value="London">London</option>
                    <option value="Plano">Plano</option>
                    <option value="Warshaw">Warsaw </option>
                  </select>
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
      </div>
    );
  }
}

export default WorkshopForm;
