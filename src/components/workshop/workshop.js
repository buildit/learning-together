import React, { Component, Fragment } from "react";
import { JumbotronComponent } from "../jumbotron";
import "./workshop.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserPreviewComponent } from "../userpreview";
import Moment from "react-moment";
import { NavbarComponent } from "../navbar";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserProvider";
import AddToCalendar from 'react-add-to-calendar';
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
    const { isUser } = this.props;
    const isEducator = userId === educatorId;
    const isAttending = workshop && filterAttendees(userId, workshop);
    const event = {
      title: workshop.name ? workshop.name : '',
      description: workshop.description ? workshop.description : '',
      location: workshop.location ? workshop.location.name : '',
      startTime: workshop.start ? workshop.start : '',
      endTime: workshop.end ? workshop.end : ''
    }
    return (
      <Fragment>
        {showMessage && (
          <MessageComponent message={message} callback={this.messageCallback} />
        )}
        <NavbarComponent isUser={isUser} location={this.props.location} />          
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
         
          <div className="cell small-12 medium-4 flex-container enroll-button">
            {isUser ? (
              isEducator ? (
                <Link
                  className=""
                  to={`/edit/${this.props.computedMatch.params.id}`}
                >
                  <button type="button" className="button flex-child-auto">
                    EDIT
                  </button>
                </Link>
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
                  )
            ) : (
                <Link
                  type="button"
                  to="/login"
                  className="button expanded button flex-child-auto large-flex-child-shrink"
                  onClick={() => { }}
                >
                  LOGIN TO ENROLL
              </Link>
              )}
          </div>
  
          </article>
   
          </section>
          <section className="grid-container">
         
          <article className="grid-x grid-margin-x">
       
 
        <div className="cell small-12 medium-8 small-order-2 medium-order-1">
        <JumbotronComponent image={cover} />
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
                return <UserPreviewComponent key={index} attendee={attendee} />;
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
                <AddToCalendar event={event} buttonClassOpen='button' buttonClassClosed='button' dropdownClass='ics-dropdown' />
              </p>
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
