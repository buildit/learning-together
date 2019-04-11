import React from 'react';
import './user-profile.scss';
import profile from './pics/2.jpg';
import userData from './mock-data.json';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class UserProfileComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: "",
            classes: [],
            all: []
        };
    };

    componentDidMount() {
        //Merge attended and teaching array
        let attending = userData[0].classes.attending.map((workshop) => {
            workshop.status = "attending"
            return workshop
        })

        let teaching = userData[0].classes.teaching.map((workshop) => {
            workshop.status = "teaching"
            return workshop
        })

        const all = attending.concat(teaching);

        this.setState({
            user: userData[0],
            classes: all,
            all: all
        })
    }

    updateWorkshopList(event) {

        if (event.target.value === "attending" || event.target.value === "teaching") {
            const filtered = this.state.all.filter((workshop) => {
                return workshop.status === event.target.value
            })

            this.setState({
                classes: filtered
            })

        } else {
            this.setState({
                classes: this.state.all
            })
        }
    }

    render() {
        return (
            <section className="user grid-container full">
                <div className="grid-x user-profile">
                    <div className="cell small-6">
                        <div className="profile-pic">
                            <div className="profile-frame">
                                <img src={profile} alt="" />
                            </div>
                            <a href="/">Edit</a>
                        </div>
                        <div className="user-info">
                            <h2>Clarence Morris</h2>
                            <h3><FontAwesomeIcon icon="map-marker" /> <strong>Buildit Brooklyn</strong></h3>
                            <h3>Creative Tech</h3>
                        </div>
                    </div>
                </div>

                <div className="courses grid-container">
                    <hr />
                    <div className="upcoming grid-x">
                        <h2><b>Upcoming Courses</b></h2>
                        <select name="schedule-dropdown" onChange={this.updateWorkshopList.bind(this)}>
                            <option value="date">Date</option>
                            <option value="teaching">Teaching</option>
                            <option value="attending">Attending</option>
                        </select>
                        <section className="workshops-list">

                            {this.state.classes.map((workshop, index) => (
                                <article className="workshop grid-x grid-margin-x">
                                    <div className="date cell small-4">

                                        <div className="start"><p className="calender"><span><Moment format="MMMM">{workshop.start}</Moment></span> <span><Moment format="DD">{workshop.start}</Moment></span> <span><Moment format="YYYY">{workshop.start}</Moment></span></p>
                                            <span><Moment format="LT">{workshop.start}</Moment></span>
                                        </div>

                                    </div>
                                    <div className="workshop-info cell small-7">
                                        <h3><strong>{workshop.name}</strong></h3>
                                        <span className="location"><FontAwesomeIcon icon="map-marker" /> {workshop.location}</span>
                                        <span className="conference-room">{workshop.room}</span>
                                        <span className="instructor">{workshop.instructor.first} {workshop.instructor.last}</span>
                                    </div>
                                    <div className="grid-container button-container">
                                        <button className="button">Learn More</button>
                                    </div>
                                </article>

                            ))}

                        </section>
                    </div>
                </div>
            </section>
        )
    }
}
