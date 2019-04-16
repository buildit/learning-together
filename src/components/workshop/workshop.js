import React, { Component, Fragment } from 'react'
import { JumbotronComponent } from '../jumbotron'
import './workshop.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UserPreviewComponent } from '../userpreview'
import workshopData from "./mock-workshops.json"
import Moment from 'react-moment';
import { NavbarComponent } from '../navbar';
import { Link} from 'react-router-dom';
import {UserContext } from '../../UserProvider'

export default class Workshop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      workshop: {},
      confirmation: false,
      userId: ''
    };
  };

  componentDidMount() {
    this.setState({
      workshop: workshopData[0],
      userId: this.context.userId
    })
  }

  updateImage(location) {
    const formatted = location.replace(/\s/g, "-")
    const imagePath = `${process.env.PUBLIC_URL}/images/cover/${formatted}.jpg`
    return imagePath
  }

  render() {
    console.log('workshop state', this.state.userId)
    const {workshop, userId} = this.state
    const attendees = (workshop.attendees ? workshop.attendees : []);
    const cover = (workshop.location ? this.updateImage(workshop.location) : "")
    const instructor = (workshop.instructor ? workshop.instructor : { first: "", last: "" })
    const { isUser } = this.props
    return (
      <Fragment>
        <NavbarComponent isUser={isUser} location={this.props.location}/>
        <div className="grid-container">
        <div className="grid-x">
          
          <h1 className="workshop-title"><b>{workshop.name}</b></h1>
        </div>  
          
            <div className="grid-x">
            <div className="small-12 instructor-info">
              <div className="photo-frame">
              <img src={instructor.image} alt=""/>
              </div>
              
              <p>Hosted by <strong>{instructor.first}  {instructor.last}</strong><br />
              <a href="true" className="email">Contact Instructor</a></p>
            
              </div>


            </div>
            <div className="grid-x enroll-top">
          {/*todo if isUser && userId === educatorId then edit button. if isUser && workshopUsers does not include userId, change to enroll or cancel enroll? or enrolled??   */}
            <Link type="button" to={isUser ? "/enroll" : "/login"} className="button expanded">ENROLL</Link>
            </div>
            
            <div className="grid-x">

                <div className="small-2">
                  <FontAwesomeIcon icon="clock" size="2x"/> 
                </div>
                <div className="small-9">
                  <p><span><Moment format="dddd">{workshop.start}</Moment>, <Moment format="LL">{workshop.start}</Moment></span><br />
                  <Moment format="LT">{workshop.start}</Moment> - <Moment format="LT">{workshop.end}</Moment><br />
                  <a href="true">Add to Calender</a></p>
                </div>

            </div>
              <div className="grid-x detail">
                <div className="small-2">
                    <FontAwesomeIcon icon="map-marker" size="2x"/>
                </div>
                <div className="small-10">
                  <p> Brooklyn <br />
                  Black <br /><a href={workshop.remote}>Webex</a> </p>
                </div>
            </div>
            </div>
         

            <JumbotronComponent image={workshop.image}/>
            <div className="grid-container">
            <p className="description">
              Does it sound like an ad? Maybe. Is it true? Let’s figure it out!
  
              Comm’n join me for uBuildit Knowledge Sharing Session titled “Custom Elements or why you don’t need React anymore”
              I will talk about this powerful but heavily underestimated technology  and share my personal experience of working with it in production
  
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