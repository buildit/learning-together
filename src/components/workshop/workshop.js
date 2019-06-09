import React, { Component, Fragment } from "react";
import { JumbotronComponent } from "../jumbotron";
import "./workshop.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserPreviewComponent } from "../userpreview";
import Moment from "react-moment";

import { Link, Redirect, NavLink } from "react-router-dom";
import { UserContext } from "../../UserProvider";
import AddToCalendar from "react-add-to-calendar";
import {
  getWorkshop,
  coverGenerator,
  enrollWorkshop,
  unenrollWorkshop,
  cancelWorkshop
} from "../../api";
import { MessageComponent } from "../message";
import { MessageConfirmComponent } from "../messageConfirm";
import { filterAttendees } from "../../selectors";
import { Container, Row, Col } from 'reactstrap';
import Select from "react-select";

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
      redirect: false
    };
    this.getWorkshopCallback = this.getWorkshopCallback.bind(this);
    this.enrollWorshopCallback = this.enrollWorshopCallback.bind(this);
    this.unenrollWorshopCallback = this.unenrollWorshopCallback.bind(this);
    this.messageCallback = this.messageCallback.bind(this);
    this.cancelWorkshopCallback = this.cancelWorkshopCallback.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const userId = localStorage.getItem("userId");
    this.setState({userId: Number(userId)});
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
    const {data} = response;
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
        message: "You have cancelled your workshop"
      });
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
      return <Redirect to={`/user/${this.state.userId}`}/>;
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
    cancelWorkshop(this.state.workshop.id, this.cancelWorkshopCallback);
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

  render() {
    const {workshop, userId, educatorId, showMessage, message} = this.state;
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
      : {firstName: "", lastName: ""};
    const isEducator = userId === educatorId;
    const isAttending = workshop && filterAttendees(userId, workshop);
    const event = {
      title: workshop.name ? workshop.name : "",
      description: workshop.description ? workshop.description : "",
      location: workshop.location ? workshop.location.name : "",
      startTime: workshop.start ? workshop.start : "",
      endTime: workshop.end ? workshop.end : ""
    };
    return (
      <Fragment>
        {showMessage && (
          <MessageComponent message={message} callback={this.messageCallback}/>
        )}
        {this.state.confirmCancel && (
          <MessageConfirmComponent
            message={message}
            yesCancel={this.cancelWorkshopConfirmed.bind(this)}
            noCancel={this.cancelWorkshopNoConfirm.bind(this)}
          />
        )}
        {this.renderRedirect()}

        <div className="workshop-header">


          <Container className="">
            <Row>
              <Col sm="12" md="9" className="workshop-headerTitleArea d-flex align-items-end">
                <h1 className="workshop-title">
                  {workshop.name}
                </h1>
              </Col>
              <Col sm="12" md="3" className="d-md-flex align-items-end">
                <div className="workshop-metaData">
                  <article className="detail">
                    <div className="detail-icon">
                      <FontAwesomeIcon icon="clock" size="2x"/>
                    </div>
                    <div className="detail-copy">
                      <p>
                    <span>
                      <Moment format="dddd">{workshop.start}</Moment>,{" "}
                      <Moment format="LL">{workshop.start}</Moment>
                    </span>
                        <br/>
                        <Moment format="LT">{workshop.start}</Moment> -{" "}
                        <Moment format="LT">{workshop.end}</Moment>
                        <br/>
                        <AddToCalendar
                          event={event}
                          buttonClassOpen="button"
                          buttonClassClosed="button"
                          dropdownClass="ics-dropdown"
                        />
                      </p>
                    </div>
                  </article>
                  <article className="detail">
                    <div className="detail-icon">
                      <FontAwesomeIcon icon="map-marker" size="2x"/>
                    </div>
                    <div className="detail-copy">
                      <p>
                        {" "}

                        {(location.name) ?  <span>{location.name} <br/></span> : ""}

                        {(workshop.room) ?  <span>{workshop.room} <br/></span> : ""}

                        {(workshop.webex) ?  <span><a href={workshop.webex}>Webex</a></span> : ""}

                      </p>
                    </div>
                  </article>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <Container className="workshop-body">
          <Row>
            <Col sm="12" md="12">

              <article className="d-md-flex justify-content-between align-items-center   workshop-actionBar">
                <div className="d-flex  align-items-center workshop-instructor">

                  <div className="-profilePic">
                    {instructor.imageUrl ? (
                      <img
                        src={`${baseUrl}${instructor.imageUrl}`}
                        alt="Instructor"
                      />
                    ) : (
                      ""
                    )}
                  </div>

                  <p>
                    Hosted by{" "}
                    <strong>
                      <NavLink to={`/user/${this.state.educatorId}`} className="">
                        {instructor.firstName} {instructor.lastName}
                      </NavLink>
                    </strong>
                    <br/>
                    <a href="true" className="email">
                      Contact Instructor
                    </a>
                  </p>
                </div>

                <div className="d-flex align-items-center  workshop-actionButtonContainer">
                  {
                    isEducator ? (
                      [
                        <Link
                          className=""
                          to={`/edit/${this.props.computedMatch.params.id}`}
                        >
                          <button type="button" className="-secondary">
                            EDIT
                          </button>
                        </Link>,
                        <button
                          type="button"
                          className="-secondary"
                          onClick={this.onClickCancel.bind(this)}
                        >
                          CANCEL WORKSHOP
                        </button>
                      ]
                    ) : isAttending ? (
                      <button
                        type="button"
                        className="-secondary"
                        onClick={this.onClickUnenroll.bind(this)}
                      >
                        Unenroll
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="-primary"
                        onClick={this.onClickEnroll.bind(this)}
                      >
                        Enroll
                      </button>
                    )
                  }
                </div>
              </article>
            </Col>
          </Row>

          <Row>
            <Col>
              <section className="grid-container">
                <article className="grid-x grid-margin-x">
                  <div className="cell small-12 medium-8 small-order-2 medium-order-1">
                    <JumbotronComponent image={cover}/>
                    <h4>
                      <b>Details</b>
                    </h4>
                    <p className="description">{workshop.description}</p>


                  </div>


                </article>
              </section>
            </Col>
            <Col sm="12" md="3">
              <div className="">
                <h4>
                 Attendees
                </h4>
                <section className="">
                  {attendees.map((attendee, index) => {
                    return (
                      <UserPreviewComponent key={index} attendee={attendee}/>
                    );
                  })}
                </section>
              </div>
            </Col>

          </Row>
        </Container>

      </Fragment>
    );
  }
}

Workshop.contextType = UserContext;
