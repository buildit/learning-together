import React from 'react';
import './userpreview.scss';
import { NavLink } from 'react-router-dom';

const UserPreviewComponent = ({ attendee }) => {
    const baseUrl = "http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com/";
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