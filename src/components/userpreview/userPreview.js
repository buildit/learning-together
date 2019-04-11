import React from 'react';
import './userpreview.scss';
import { NavLink } from 'react-router-dom';

const UserPreviewComponent = ({ attendee }) => {

    const showPhoto = () => {
        return ((attendee.picture !== "") ? `${attendee.picture}.jpg` : "");
    }

    return (
        <div className="user-preview">
            <NavLink to="/user" className="">
                <div className="photo-frame">
                    <img src={showPhoto()} alt="" />
                </div>
                <div>
                    <p>{attendee.name.first}<br />{attendee.name.last}</p>
                </div>
            </NavLink>
        </div>
    )
}

export default UserPreviewComponent;