import React, { Component, Fragment } from 'react'
import { JumbotronComponent } from '../jumbotron'
import './workshop.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UserPreviewComponent } from '../userpreview'
import workshopData from "./mock-workshops.json"
import Moment from 'react-moment';
import { NavbarComponent } from '../navbar';
import { Link, withRouter } from 'react-router-dom';

export default class Workshop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      workshop: {},
      confirmation: false
    };
  };

  componentDidMount() {
    this.setState({
      workshop: workshopData[0]
    })
  }

  updateImage(location) {
    const formatted = location.replace(/\s/g, "-")
    const imagePath = `${process.env.PUBLIC_URL}/images/cover/${formatted}.jpg`
    return imagePath
  }

  render() {

    const workshop = this.state.workshop
    const attendees = (workshop.attendees ? workshop.attendees : []);
    const cover = (workshop.location ? this.updateImage(workshop.location) : "")
    const instructor = (workshop.instructor ? workshop.instructor : { first: "", last: "" })
    const { isUser } = this.props
    return (
      <Fragment>
        <NavbarComponent isUser={isUser} location={this.props.location}/>
          <JumbotronComponent image={workshop.image} title={workshop.name} />
          <div className="grid-container">
            <div className="grid-x">
              <p><strong>{instructor.first}  {instructor.last}</strong></p>
            </div>
            <div className="grid-x grid-margin-x enroll-top">

              <div className="cell detail small-6">
                <p className="calender"><span><Moment format="MMMM">{workshop.start}</Moment></span> <span><Moment format="DD">{workshop.start}</Moment></span> <span><Moment format="YYYY">{workshop.start}</Moment></span></p>
                <a href="true">Add to Calendar</a>
              </div>
              <div className="cell detail small-6">
                <p><FontAwesomeIcon icon="map-marker" /> Brooklyn</p>
                <p><FontAwesomeIcon icon="building" /> Black</p>
                <p><FontAwesomeIcon icon="video" /> <a href={workshop.remote}>Webex</a></p>
              </div>
            </div>
          </div>
          <div className="grid-y grid-padding-y enroll">
          {
            isUser ?
            <Link type="button" to="/create-workshop" className="button success">ENROLL</Link>
            : <Link type="button" to="/login" className="button success">LOGIN TO ENROLL</Link>
          }
            
            <p className="description">
              Does it sound like an ad? Maybe. Is it true? Let’s figure it out!
  
              Comm’n join me for uBuildit Knowledge Sharing Session titled “Custom Elements or why you don’t need React anymore”
              I will talk about this powerful but heavily underestimated technology  and share my personal experience of working with it in production
  
            </p>
            <hr />
            <div className="attendees">
              <h3><b>Attending:</b></h3>
              <section className="grid-display attendee-grid">

                {attendees.map((attendee, index) => (

                  <UserPreviewComponent key={index} attendee={attendee} />

                ))}

              </section>
            </div>
            <p className="feedback">Send Instructor Feedback: </p> {/*hidden until after user has attended*/}
            <a href="true" className="email">Instructor email</a>
          </div>
      </Fragment>
    )
  }
}