import React, { Component } from 'react';
import './user-profile.scss';
import profile from './pics/2.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class UserProfileComponent extends Component {
    render() {
        return (
            <section className="grid-container full">
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
                    <div className="grid-x">
                        <h2><b>Courses</b></h2>
                        <select name="schedule-dropdown" id="">
                            <option value="">Teaching</option>
                            <option value="">Attending</option>
                        </select>
                        <section className="workshops">

                            <article className="workshop grid-x">
                                <div className="date cell small-3">

                                    <date><span>September</span> <span>20th</span> <span>2019</span></date>

                                </div>
                                <div className="workshop-info cell small-6">
                                    <h3><strong>uBuildit Knowledge Sharing Session : Enterprise Architecture</strong></h3>
                                    <span className="location"><FontAwesomeIcon icon="map-marker" /> Buildit Brooklyn</span>
                                    <span className="conference-room">Black</span>
                                    <span className="instructor">Alex Kalinovsky</span>
                                </div>
                                <div className="cell small-3 button-container">
                                    <button className="button">Learn More</button>
                                </div>
                            </article>

                            <article className="workshop grid-x">
                                <div className="date cell small-3">

                                    <date><span>September</span> <span>20th</span> <span>2019</span></date>

                                </div>
                                <div className="workshop-info cell small-6">
                                    <h3><strong>uBuildit Knowledge Sharing Session : Enterprise Architecture</strong></h3>
                                    <span className="location"><FontAwesomeIcon icon="map-marker" /> Buildit Brooklyn</span>
                                    <span className="conference-room">Black</span>
                                    <span className="instructor">Clarence Morris</span>
                                </div>
                                <div className="cell small-3 button-container">
                                    <button className="button">Learn More</button>
                                </div>
                            </article>

                        </section>
                    </div>
                </div>
            </section>
        )
    }
}
