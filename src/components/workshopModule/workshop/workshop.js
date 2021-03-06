import React, { Component, Fragment } from "react";
import { JumbotronComponent } from "../../landingModule";
import "./workshop.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserPreviewComponent } from "../../userModule";
import Moment from "react-moment";
import { NavbarComponent } from "../../navbarModule";
import { Link, Redirect, NavLink } from "react-router-dom";
import { UserContext } from "../../../UserProvider";
import {
  createAndSendEmail,
  addCalEvent
} from "../../../services/outlookUtils";
import ReactPlayer from "react-player";

import {
  getWorkshop,
  coverGenerator,
  enrollWorkshop,
  unenrollWorkshop,
  cancelWorkshop,
  deleteEvent
} from "../../../api";
import { MessageComponent, MessageConfirmComponent } from "../../messageModule";
import { filterAttendees } from "../../../selectors";

export default class Workshop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workshop: {},
      confirmation: false,
      userId: null,
      educatorId: null,
      showMessage: false,
      message: "",
      confirmCancel: false,
      redirect: false,
      addedToCal: false,
      eventToCal: {},
      cancelWorkshop: false
    };
    this.getWorkshopCallback = this.getWorkshopCallback.bind(this);
    this.enrollWorshopCallback = this.enrollWorshopCallback.bind(this);
    this.unenrollWorshopCallback = this.unenrollWorshopCallback.bind(this);
    this.messageCallback = this.messageCallback.bind(this);
    this.cancelWorkshopCallback = this.cancelWorkshopCallback.bind(this);
    this.outlookCalCallback = this.outlookCalCallback.bind(this);
    this.outlookMailCallback = this.outlookMailCallback.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const userId = localStorage.getItem("userId");
    this.setState({
      userId: Number(userId)
    });
    getWorkshop(this.props.computedMatch.params.id, this.getWorkshopCallback);
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.computedMatch.params.id !== prevProps.computedMatch.params.id
    ) {
      getWorkshop(this.props.computedMatch.params.id, this.getWorkshopCallback);
    }
  }
  getWorkshopCallback(response) {
    const { data } = response;
    if (response.status === 200) {
      this.setState({
        workshop: data,
        educatorId: data.educator.id,
        event: {
          title: data.name ? data.name : "",
          description: data.description ? data.description : "",
          location: data.location ? data.location.name : "",
          startTime: data.start ? data.start : "",
          endTime: data.end ? data.end : ""
        }
      });
    } else {
      //show error message
      console.log(response);
    }
  }
  enrollWorshopCallback(response) {
    const { event } = this.state;
    if (response.status === 200) {
      const subject = `You have enrolled for ${event.title}!`;
      const content = `You have enrolled for the class ${
        event.title
        }! Hope your experience is engaging and fun!`;
      const recipients = [{ username: localStorage.getItem("username") }];
      createAndSendEmail({ subject, content, recipients });
      addCalEvent(event, this.outlookCalCallback);
      this.setState({
        showMessage: true,
        message: `You have successfully enrolled in ${event.title}!`
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
  outlookCalCallback(response) {
    if (response.statusCode === 404) {
      this.setState({
        showMessage: true,
        message:
          "Outlook calendar is down. Please note the time and date for your workshop."
      });
    } else {
      this.setState({
        addedToCal: true,
        showMessage: true,
        message: "Workshop has been successfully added to your Calendar"
      });
    }
  }

  outlookMailCallback(response) {
    if (response.statusCode === 404) {
      this.setState({
        showMessage: true,
        message:
          "Outlook is down. Please notify your attendees of the cancelled workshop."
      });
    } else {
      this.setState({
        addedToCal: true,
        showMessage: true,
        message:
          "We've sent an email letting your attendees know you have cancelled the workshop"
      });
    }
  }

  unenrollWorshopCallback(response) {
    if (response.status === 200) {
      this.setState({
        showMessage: true,
        message: "You have succesfully unenrolled."
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
    this.setState({
      showMessage: false,
      message: "",
      redirect: true
    });
  }

  cancelWorkshopCallback(response) {
    if (response.status === 200) {
      this.setState({
        confirmCancel: false,
        showMessage: true,
        cancelWorkshop: true,
        message: "You have cancelled your workshop"
      });
      const subject = `${this.state.workshop.name} is cancelled`;
      const { name, instructor, workshopAttendees } = this.state;
      const content = `Your class ${name} has been cancelled. Please contact the instructor ${instructor}`;
      createAndSendEmail(
        { subject, content, recipients: workshopAttendees },
        this.outlookMailCallback
      );
    } else {
      //show error message
      this.setState({
        confirmCancel: false,
        showMessage: true,
        message: "There was an error in cancellation. Please try again later."
      });
    }
  }

  renderRedirect() {
    if (this.state.redirect) {
      return this.state.cancelWorkshop ? (
        <Redirect to={`/user/${this.state.userId}`} />
      ) : null;
    }
  }

  onClickEnroll(e) {
    e.preventDefault();
    enrollWorkshop(this.state.workshop.id, this.enrollWorshopCallback);
  }
  onClickUnenroll(e) {
    e.preventDefault();
    unenrollWorkshop(this.state.workshop.id, this.unenrollWorshopCallback);
  }

  onClickCancel(e) {
    e.preventDefault();
    const attendees =
      this.state.workshop.workshopAttendees.length > 0
        ? `There are ${
        this.state.workshop.workshopAttendees.length
        } attendee(s).`
        : "";
    this.setState({
      confirmCancel: true,
      message: `Are you sure you want to cancel this workshop? ${attendees}`
    });
  }

  cancelWorkshopConfirmed() {
    if (this.state.workshop.robinEventId === null) {
      cancelWorkshop(this.state.workshop.id, this.cancelWorkshopCallback);
    } else {
      deleteEvent(this.state.workshop.robinEventId).then(response => {
        cancelWorkshop(this.state.workshop.id, this.cancelWorkshopCallback);
      });
    }
  }

  cancelWorkshopNoConfirm() {
    this.setState({
      confirmCancel: false,
      message: ""
    });
  }
  updateImage(location) {
    const formatted = location.replace(/\s/g, "-");
    const imagePath = `${process.env.PUBLIC_URL}/images/cover/${formatted}.jpg`;
    return imagePath;
  }

  addCalEvent(event, outlookCalCallback) {
    addCalEvent(event, outlookCalCallback);
  }

  render() {
    const {
      workshop,
      userId,
      educatorId,
      showMessage,
      message,
      addedToCal,
      event
    } = this.state;
    const attendees = workshop.workshopAttendees
      ? workshop.workshopAttendees
      : [];
    const baseUrl = "http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com/";
    const cover = workshop.imageUrl
      ? `${baseUrl}${workshop.imageUrl}`
      : coverGenerator(workshop.id);
    const location = workshop.location ? workshop.location : "";
    const instructor = workshop.educator
      ? workshop.educator
      : { firstName: "", lastName: "" };
    const isEducator = userId === educatorId;
    const isAttending = workshop && filterAttendees(userId, workshop);
    const isVideo = this.state.workshop.archiveLink ? true : false;

    return (
      <Fragment>
        {showMessage && (
          <MessageComponent message={message} callback={this.messageCallback} />
        )}
        {this.state.confirmCancel && (
          <MessageConfirmComponent
            message={message}
            yesCancel={this.cancelWorkshopConfirmed.bind(this)}
            noCancel={this.cancelWorkshopNoConfirm.bind(this)}
          />
        )}
        {this.renderRedirect()}
        <NavbarComponent location={this.props.location} />
        <section className="grid-container class-info">
          <article className="grid-x align-middle">
            <div className="small-12 medium-8 instructor-info">
              <span>
                <Moment format="dddd">{workshop.start}</Moment>,{" "}
                <Moment format="LL">{workshop.start}</Moment>
              </span>
              <h1 className="workshop-title">
                <b>{workshop.name}</b>
              </h1>
              <div className="photo-frame">
                {instructor.imageUrl ? (
                  <img
                    src={`${baseUrl}${instructor.imageUrl}`}
                    alt="Instructor"
                  />
                ) : (
                    <FontAwesomeIcon icon="user-circle" size="3x" />
                  )}
              </div>

              <p>
                Hosted by{" "}
                <strong>
                  <NavLink to={`/user/${this.state.educatorId}`} className="">
                    {instructor.firstName} {instructor.lastName}
                  </NavLink>
                </strong>
              </p>
            </div>

            <div className="cell small-12 medium-4 flex-container enroll-button">
              {isEducator ? (
                [
                  <Link
                    className=""
                    to={`/edit/${this.props.computedMatch.params.id}`}
                    key={1}
                  >
                    <button type="button" className="button flex-child-auto">
                      EDIT
                    </button>
                  </Link>,
                  <button
                    type="button"
                    className="button flex-child-auto large-flex-child-shrink unenroll"
                    onClick={this.onClickCancel.bind(this)}
                    key={2}
                  >
                    CANCEL WORKSHOP
                  </button>
                ]
              ) : isAttending ? (
                <button
                  type="button"
                  className="button unenroll flex-child-auto large-flex-child-shrink"
                  onClick={this.onClickUnenroll.bind(this)}
                >
                  UNENROLL
                </button>
              ) : (
                    <button
                      type="button"
                      className="button flex-child-auto large-flex-child-shrink"
                      onClick={this.onClickEnroll.bind(this)}
                    >
                      ENROLL
                </button>
                  )}
            </div>
          </article>
        </section>
        <section className="grid-container">
          <article className="grid-x grid-margin-x">
            <div className="cell small-12 medium-8 small-order-2 medium-order-1">
              {isVideo ? (
                <ReactPlayer url="https://youtu.be/iKhsC1Q4LDs"> </ReactPlayer>
              ) : (
                  <JumbotronComponent image={cover} />
                )}
              <h4>
                <b>Details</b>
              </h4>
              <p className="description">{workshop.description}</p>

              <div className="attendees">
                <h4>
                  <b>Attendees</b>
                </h4>
                <section className="grid-display attendee-grid">
                  {attendees.map((attendee, index) => {
                    return (
                      <UserPreviewComponent key={index} attendee={attendee} />
                    );
                  })}
                </section>
              </div>
            </div>

            <div className="cell small-12 medium-4 small-order-1 medium-order-2">
              <article className="detail">
                <div className="detail-icon">
                  <FontAwesomeIcon icon="clock" size="2x" />
                </div>
                <div className="detail-copy">
                  <p>
                    <span>
                      <Moment format="dddd">{workshop.start}</Moment>,{" "}
                      <Moment format="LL">{workshop.start}</Moment>
                    </span>
                    <br />
                    <Moment format="LT">{workshop.start}</Moment> -{" "}
                    <Moment format="LT">{workshop.end}</Moment>
                    <br />
                  </p>
                  {addedToCal ? (
                    <div>
                      <em>Added to Calendar!</em>
                    </div>
                  ) : (
                      <button
                        className="addToCal"
                        onClick={this.addCalEvent.bind(
                          this,
                          event,
                          this.outlookCalCallback
                        )}
                      >
                        Add to Calendar
                    </button>
                    )}
                </div>
              </article>
              <article className="detail">
                <div className="detail-icon">
                  <FontAwesomeIcon icon="map-marker" size="2x" />
                </div>
                <div className="detail-copy">
                  <p>
                    {" "}
                    {location.name} <br />
                    {workshop.room} <br />
                    {workshop.webex === "" ? null : (
                      <a href={workshop.webex}>Webex</a>
                    )}
                  </p>
                </div>
              </article>
            </div>
          </article>
        </section>
      </Fragment>
    );
  }
}

Workshop.contextType = UserContext;
