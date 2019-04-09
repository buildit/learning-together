import React, { Component } from 'react';
import './user-profile.scss';
import profile from './pics/2.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class UserProfileComponent extends React.Component {
    render() {
        return (
            <section class="grid-container full">
                <div className="grid-x user-profile">
                    <div className="cell small-6">               
                        <div className="profile-pic">
                        <div className="profile-frame">
                        <img src={profile} />    
                        </div>
                        <a href="/">Edit</a> 
                        </div>
                        <div className="user-info">
                            <h2>Clarence Morris</h2>
                            <h3><FontAwesomeIcon icon="map-marker" /> <strong>Buildit Brooklyn</strong></h3>
                            <h3>Creative Tech</h3>
                        </div>
                        
                        <div className="courses grid-container full">
                        <hr />

                            <h2><b>Courses</b></h2>
                            <select name="schedule-dropdown" id="">
                                <option value="">Teaching</option>
                                <option value="">Attending</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>
        ) 
    }
}
