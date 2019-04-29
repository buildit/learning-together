import React, { Component, Fragment } from "react";
import { JumbotronComponent } from "../jumbotron";
import "./workshop.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserPreviewComponent } from "../userpreview";
import Moment from "react-moment";
import { NavbarComponent } from "../navbar";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserProvider";
import {
  getWorkshop,
  coverGenerator,
  enrollWorkshop,
  unenrollWorkshop
} from "../../api";
import { MessageComponent } from "../message";
import { filterAttendees } from "../../selectors";

export default class Workshop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workshop: {},
      confirmation: false,
      userId: null,
      educatorId: null,
      showMessage: false,
      message: ""
    };
    this.getWorkshopCallback = this.getWorkshopCallback.bind(this);
    this.enrollWorshopCallback = this.enrollWorshopCallback.bind(this);
    this.unenrollWorshopCallback = this.unenrollWorshopCallback.bind(this);
    this.messageCallback = this.messageCallback.bind(this);
  }

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    this.setState({ userId: Number(userId) });
    getWorkshop(this.props.computedMatch.params.id, this.getWorkshopCallback);
  }
  componentDidUpdate(prevProps) {
    if (this.props.computedMatch.params.id !== prevProps.computedMatch.params.id) {
      getWorkshop(this.props.computedMatch.params.id, this.getWorkshopCallback);
    }
  }
  getWorkshopCallback(response) {
    const { data } = response;
    if (response.status === 200) {
      this.setState({
        workshop: data,
        educatorId: data.educator.id
      });
    } else {
      //show error message
      console.log(response);
    }
  }
  enrollWorshopCallback(response) {
    if (response.status === 200) {
      this.setState({
        showMessage: true,
        message: "You have successfully enrolled!"
      });
      getWorkshop(this.props.computedMatch.params.id, this.getWorkshopCallback);
    } else {
      //show error message
      this.setState({
        showMessage: true,
        message: "There was an error in enrollment. Please try again later."
      });
    }
  }
  unenrollWorshopCallback(response) {
    if (response.status === 200) {
      this.setState({
        showMessage: true,
        message: "You have succesfully unenrolled!"
      });
      getWorkshop(this.props.computedMatch.params.id, this.getWorkshopCallback);
    } else {
      //show error message
      this.setState({
        showMessage: true,
        message: "There was an error in unenrollment. Please try again later."
      });
    }
  }
  messageCallback() {
    this.setState({ showMessage: false, message: "" });
  }

  onClickEnroll(e) {
    e.preventDefault();
    enrollWorkshop(this.state.workshop.id, this.enrollWorshopCallback);
  }
  onClickUnenroll(e) {
    e.preventDefault();
    unenrollWorkshop(this.state.workshop.id, this.unenrollWorshopCallback);
  }
  updateImage(location) {
    const formatted = location.replace(/\s/g, "-");
    const imagePath = `${process.env.PUBLIC_URL}/images/cover/${formatted}.jpg`;
    return imagePath;
  }

  render() {
    const {
      workshop,
      userId,
      educatorId,
      isEnrollSuccessful,
      enrollError,
      showMessage,
      message
    } = this.state;
    const attendees = workshop.workshopAttendees ? workshop.workshopAttendees : [];
    const baseUrl = "http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com/";
    const cover = workshop.imageUrl
      ? `${baseUrl}${workshop.imageUrl}`
      : coverGenerator(workshop.id);
    const location = workshop.location ? workshop.location : "";
    const instructor = workshop.educator
      ? workshop.educator
      : { firstName: "", lastName: "" };
    const { isUser } = this.props;
    const isEducator = userId === educatorId;
    const isAttending = workshop && filterAttendees(userId, workshop);
    console.log(workshop)
    return (
      <Fragment>
        {showMessage && (
          <MessageComponent message={message} callback={this.messageCallback} />
        )}
        <NavbarComponent isUser={isUser} location={this.props.location} />
        <div className="grid-container first-container">
          <div className="grid-x">
            <h1 className="workshop-title">
              <b>{workshop.name}</b>
            </h1>
          </div>

          <div className="grid-x">
            <div className="small-12 instructor-info">
              <div className="photo-frame">
              { instructor.imageUrl ? <img src={`${baseUrl}${instructor.imageUrl}`} /> : <FontAwesomeIcon icon="user-circle" size="3x"/>}
              </div>

              <p>
                Hosted by{" "}
                <strong>
                  {instructor.firstName} {instructor.lastName}
                </strong>
                <br />
                <a href="true" className="email">
                  Contact Instructor
                </a>
              </p>
            </div>
          </div>
          <div className="grid-x enroll-top">
            {isUser ? (
              isEducator ? (
                <button className="button expanded" onClick={() => { }}>
                  EDIT
                </button>
              ) : isAttending ? (
                <button
                  type="button"
                  className="button expanded"
                  onClick={this.onClickUnenroll.bind(this)}
                >
                  UNENROLL
                </button>
              ) : (
                    <button
                      type="button"
                      className="button expanded"
                      onClick={this.onClickEnroll.bind(this)}
                    >
                      ENROLL
                </button>
                  )
            ) : (
                <Link
                  type="button"
                  to="/login"
                  className="button expanded"
                  onClick={() => { }}
                >
                  LOGIN TO ENROLL
              </Link>
              )}
          </div>

          <div className="grid-x">
            <div className="small-2">
              <FontAwesomeIcon icon="clock" size="2x" />
            </div>
            <div className="small-9">
              <p>
                <span>
                  <Moment format="dddd">{workshop.start}</Moment>,{" "}
                  <Moment format="LL">{workshop.start}</Moment>
                </span>
                <br />
                <Moment format="LT">{workshop.start}</Moment> -{" "}
                <Moment format="LT">{workshop.end}</Moment>
                <br />
                <a href="true">Add to Calendar</a>
              </p>
            </div>
          </div>
          <div className="grid-x detail">
            <div className="small-2">
              <FontAwesomeIcon icon="map-marker" size="2x" />
            </div>
            <div className="small-10">
              <p>
                {" "}
                {location.name} <br />
                {workshop.room} <br />
                {workshop.webex === "" ? null : (
                  <a href={workshop.webex}>Webex</a>
                )}
              </p>
            </div>
          </div>
        </div>
        <JumbotronComponent image={cover} />
        <div className="grid-container">
          <p className="description">{workshop.description}</p>
          <hr />
          <div className="attendees">
            <h3>
              <b>Attendees</b>
            </h3>
            <section className="grid-display attendee-grid">
              {attendees.map((attendee, index) => {
                return <UserPreviewComponent key={index} attendee={attendee} />
              }
              )}
            </section>
          </div>
        </div>
        {isEnrollSuccessful && (
          <MessageComponent
            message="You have succesfully enrolled!"
            callback={this.messageCallback}
          />
        )}
        {enrollError && (
          <MessageComponent
            message="There was an error in enrollment. Please try again later"
            callback={this.messageCallback}
          />
        )}
      </Fragment>
    );
  }
}

Workshop.contextType = UserContext;
