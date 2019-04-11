import React, { Fragment } from 'react';
import './user-profile.scss';
import profile from './pics/2.jpg';
import userData from './mock-data.json';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavbarComponent } from '../navbar';
import { WorkshopPreviewComponent } from "../workshopPreview";

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
        const { isUser } = this.props
        return (
            <Fragment>
                <NavbarComponent isUser={this.props.isUser} />
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
                                        <WorkshopPreviewComponent key={workshop.id} workshop={workshop} />

                                    ))}

                                </section>
                            </div>
                        </div>
                    </section>

            </Fragment>
        )
    }
}
