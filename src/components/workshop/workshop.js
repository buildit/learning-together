import React, { Component, Fragment } from 'react'
import { JumbotronComponent } from '../jumbotron'
import './workshop.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UserPreviewComponent } from '../userpreview'
import Moment from 'react-moment';
import { NavbarComponent } from '../navbar';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserProvider'
import { getWorkshop, coverGenerator } from '../../api';

export default class Workshop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      workshop: {},
      confirmation: false,
      userId: null,
      educatorId: 12
    };
  };

  componentDidMount() {
    this.setState({
      userId: this.context.userId
    })
    /*todo set educatorId: data.data.educatorId from response*/
    getWorkshop(this.props.computedMatch.params.id)
      .then((data) => {
        this.setState({
          workshop: data.data
        })
      })
  }

  updateImage(location) {
    const formatted = location.replace(/\s/g, "-")
    const imagePath = `${process.env.PUBLIC_URL}/images/cover/${formatted}.jpg`
    return imagePath
  }

  render() {
    const { workshop, userId, educatorId } = this.state
    const attendees = (workshop.attendees ? workshop.attendees : []);
    const cover = workshop.imageUrl ? workshop.imageUrl : coverGenerator(workshop.id);
    const location = workshop.location ? workshop.location : "";
    const instructor = (workshop.educator ? workshop.educator : { firstName: "", lastName: "" })
    const { isUser } = this.props
    const isEducator = userId === educatorId
    const isAttending = null /*selector function here to parse userId from workshop.workshopAttendees*/
    console.log('userId: ', typeof userId, 'educatorId: ', typeof educatorId, 'isEducator: ', isEducator)
    console.log('context userID: ', this.context.userId)
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
                <img src={instructor.imageUrl} alt="" />
              </div>

              <p>Hosted by <strong>{instructor.firstName}  {instructor.lastName}</strong><br />
                <a href="true" className="email">Contact Instructor</a></p>

            </div>


          </div>
          <div className="grid-x enroll-top">
            {/*todo if isUser && userId === educatorId then edit button. if isUser && workshopUsers does not include userId, change to enroll or cancel enroll? or enrolled??   */}
            {/* <Link type="button" to={isUser ? "/enroll" : "/login"} className="button expanded">ENROLL</Link> */}
            {
              isEducator
                ? <button className="button expanded">EDIT</button>
                : isAttending
                  ? <button type="button" className="button expanded">UNENROLL</button>
                  : <button type="button" className="button expanded">ENROLL</button>

            }
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
      </Fragment>
    )
  }
}

Workshop.contextType = UserContext