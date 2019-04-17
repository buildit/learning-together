import React, { Component, Fragment } from 'react'
import { JumbotronComponent } from '../jumbotron'
import './workshop.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UserPreviewComponent } from '../userpreview'
import workshopData from "./mock-workshops.json"
import Moment from 'react-moment';
import { NavbarComponent } from '../navbar';
import { Link, withRouter } from 'react-router-dom';
import { getWorkshop, coverGenerator, enrollWorkshop, unenrollWorkshop } from '../../api';
import { MessageComponent } from '../message'

export default class Workshop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      workshop: {},
      showMessage: false,
      message: ''
    };
    this.getWorkshopCallback = this.getWorkshopCallback.bind(this)
    this.enrollWorshopCallback = this.enrollWorshopCallback.bind(this)
    this.unenrollWorshopCallback = this.unenrollWorshopCallback.bind(this)
    this.messageCallback = this.messageCallback.bind(this)
  };

  componentDidMount() {
    getWorkshop(this.props.computedMatch.params.id, this.getWorkshopCallback)
  }
  getWorkshopCallback(response) {
    console.log(response)
    if (response.status === 200) {
      this.setState({
        workshop: response.data
      })
    }
    else {
      //show error message
      console.log(response)
    }
  }
  enrollWorshopCallback(response) {
    if (response.status === 200) {
      this.setState({ showMessage: true, message: 'You have succesfully enrolled!' })
    }
    else {
      //show error message
      this.setState({ showMessage: true, message: 'There was an error in enrollment. Please try again later.' })
      console.log(response)
    }
  }
  unenrollWorshopCallback(response) {
    if (response.status === 200) {
      this.setState({ showMessage: true, message: 'You have succesfully unenrolled!' })
    }
    else {
      //show error message
      this.setState({ showMessage: true, message: 'There was an error in unenrollment. Please try again later.' })
      console.log(response)
    }
  }
  messageCallback() {
    this.setState({ showMessage: false, message: '' })
  }

  onClickEnroll(e) {
    e.preventDefault()
    enrollWorkshop(this.state.workshop.id, this.enrollWorshopCallback)
  }
  onClickUnenroll(e) {
    e.preventDefault()
    unenrollWorkshop(this.state.workshop.id, this.enrollWorshopCallback)
  }
  updateImage(location) {
    const formatted = location.replace(/\s/g, "-")
    const imagePath = `${process.env.PUBLIC_URL}/images/cover/${formatted}.jpg`
    return imagePath
  }

  render() {

    const { workshop, isEnrollSuccessful, enrollError } = this.state
    const attendees = (workshop.attendees ? workshop.attendees : []);
    const cover = workshop.imageUrl ? workshop.imageUrl : coverGenerator(workshop.id);
    const location = workshop.location ? workshop.location : "";
    const instructor = (workshop.educator ? workshop.educator : { firstName: "", lastName: "" })
    const { isUser } = this.props
    return (
      <Fragment>
        <NavbarComponent isUser={isUser} location={this.props.location} />
        <div className="grid-container">
          <div className="grid-x">

            <h1 className="workshop-title"><b>{workshop.name}</b></h1>
          </div>

          <div className="grid-x">
            <div className="small-12 instructor-info">
              <div className="photo-frame">
                <img src={instructor.imageUrl} />
              </div>

              <p>Hosted by <strong>{instructor.firstName}  {instructor.lastName}</strong><br />
                <a href="true" className="email">Contact Instructor</a></p>

            </div>


          </div>
          <div className="grid-x enroll-top">

            <Link type="button" to={isUser ? "/enroll" : "/login"} className="button expanded">ENROLL</Link>
          </div>

          <div className="grid-x">

            <div className="small-2">
              <FontAwesomeIcon icon="clock" size="2x" />
            </div>
            <div className="small-9">
              <p><span><Moment format="dddd">{workshop.start}</Moment>, <Moment format="LL">{workshop.start}</Moment></span><br />
                <Moment format="LT">{workshop.start}</Moment> - <Moment format="LT">{workshop.end}</Moment><br />
                <a href="true">Add to Calender</a></p>
            </div>

          </div>
          <div className="grid-x detail">
            <div className="small-2">
              <FontAwesomeIcon icon="map-marker" size="2x" />
            </div>
            <div className="small-10">
              <p> {location.name} <br />
                Black <br /><a href={workshop.webex}>Webex</a> </p>
            </div>
          </div>
        </div>


        <JumbotronComponent image={cover} />
        <div className="grid-container">
          <p className="description">
            {workshop.description}

          </p>
          <hr />
          <div className="attendees">
            <h3><b>Attendees</b></h3>
            <section className="grid-display attendee-grid">

              {attendees.map((attendee, index) => (

                <UserPreviewComponent key={index} attendee={attendee} />

              ))}

            </section>
          </div>
        </div>
        {
          isEnrollSuccessful && (<MessageComponent message='You have succesfully enrolled!' callback={this.messageCallback} />)
        }
        {
          enrollError && (<MessageComponent message='There was an error in enrollment. Please try again later' callback={this.messageCallback} />)
        }
      </Fragment>
    )
  }
}