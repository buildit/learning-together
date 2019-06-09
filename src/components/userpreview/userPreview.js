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
            <NavLink to={`/user/${attendee.id}`} className="d-flex align-items-center">
                <div className="-profilePic -small ">
                    <img src={showPhoto()} alt="" />
                </div>

                {attendee.firstName} {attendee.lastName}

            </NavLink>
        </div>
    )
}

export default UserPreviewComponent;
