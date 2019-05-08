import React, { Component } from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import { Link, Redirect } from "react-router-dom";
import { MessageComponent } from "../message";
import { ImageUploaderComponent } from "../imageUploader";
import { getCategoryList, getLocationList } from "../../api.js";
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
      startTime: props.data
        ? moment(props.data.start)
        : //.format("HH:mm:ss")
          // .slice(0, 5)
          null,
      endTime: props.data
        ? moment(props.data.end)
        : // .format("HH:mm:ss")
          // .slice(0, 5)
          null,
      error: {},
      redirect: false,
      workshopPicture: props.data ? props.data.imageUrl : "",
      room: props.data ? props.data.room : ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.redirectCallback = this.redirectCallback.bind(this);
    this.setWorkshopPicture = this.setWorkshopPicture.bind(this);
    this.getLocationCallBack = this.getLocationCallBack.bind(this);
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
    console.log("next", nextProps.data.end);
    console.log("current", this.props.data.end);

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
          /*.format("HH:mm:ss")
            .slice(0, 5)*/ startDate: moment(
            nextProps.data.start
          ),
          endDate: moment(nextProps.data.end)
        });
      }

      if (nextProps.data.end !== this.props.data.end) {
        this.setState({
          endTime: moment(nextProps.data.end)
          /*.format("HH:mm:ss")
            .slice(0, 5)*/
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
    }
  }
  //If input is start time or date time modify moment object
  handleChange(e, name) {
    console.log(name);
    console.log("e", e);

    if ((name !== undefined && name === "startTime") || name === "endTime") {
      console.log("inputing", name);
      const month = this.state.startDate.month();
      const day = this.state.startDate.date();
      const year = this.state.startDate.year();
      const time = e
        .year(year)
        .month(month)
        .date(day);
      console.log("new", time);
      console.log(e);
      this.setState({ [name]: time });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }

    //console.log(e.day('day'));
    //this.setState({ startTime: moment(e, 'HH:mm:ss') });
    console.log("e", moment(e, "HH:mm:ss"));
    //console.log('cloning', moment(e, 'HH:mm:ss')
    //console.log('e utc', moment(e, 'HH:mm:ss').utc())

    /*this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === "startTime" || e.target.name === "endTime") {
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
    }*/
  }

  getLocationCallBack(response) {
    if (response.status === 200) {
      this.setState({ locationList: response.data });
    }
  }

  onDateChange(date) {
    console.log("date is", date);
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
      console.log(endTime);
      this.setState({ endTime });
    }
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
        //.format("YYYY-MM-DDTHH:mm:ss.SSS")
        name: this.state.name,
        start: moment.utc(this.state.startTime),
        end: moment.utc(this.state.endTime),
        locationId: this.state.location,
        categoryId: parseInt(this.state.categorySelected),
        webex: this.state.link,
        description: this.state.description,
        imageUrl: this.state.workshopPicture,
        room: this.state.room
      };
      console.log(this.state.endDate);
      console.log(data);
      console.log(moment(data.end).valueOf());
      console.log(moment(data.start).valueOf());
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
                <TimePicker
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
                <span className="error">{this.state.error.time}</span>
              </div>
              <div className="medium-8 cell">
                <label>End time</label>
                <TimePicker
                  name="endTime"
                  defaultValue={null}
                  showSecond={false}
                  minuteStep={15}
                  allowEmpty={false}
                  use12Hours={true}
                  focusOnOpen={true}
                  onChange={(value, name = "endTime") =>
                    this.handleChange(value, name)
                  }
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
              <div className="medium-8 cell">
                <label>
                  Room
                  <input
                    name="room"
                    value={this.state.room}
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
            {console.log("startTime state is", this.state.startTime)}
            {console.log("endTime state is", this.state.endTime)}
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
