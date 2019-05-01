import React from 'react';
import './userpreview.scss';
import { NavLink } from 'react-router-dom';

const UserPreviewComponent = ({ attendee }) => {
    const baseUrl = "https://bettertogether.buildit.systems/";
    const showPhoto = () => {
        return ((attendee.imageUrl !== "") ? `${baseUrl}${attendee.imageUrl}` : "");
    }
    if (typeof attendee.id === 'undefined') {
        attendee.id = attendee.userId
    }
    return (
        <div className="user-preview">
            <NavLink to={`/user/${attendee.id}`} className="">
                <div className="photo-frame">
                    <img src={showPhoto()} alt="" />
                </div>
                <div>
                    <p>{attendee.firstName}<br />{attendee.lastName}</p>
                </div>
            </NavLink>
        </div>
    )
}

export default UserPreviewComponent;