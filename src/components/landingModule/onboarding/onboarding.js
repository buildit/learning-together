import React, { Component } from "react";
import { Link } from 'react-router-dom';

import './onboarding.scss';

export default class Onboarding extends Component {
    render() {
        if (this.props.user && this.props.user.userInterests === 0) {
            return (
                <section className="grid-x complete-profile-callout">
                    <div className="cell medium-6">
                        <h3 className="greeting">Welcome {this.props.user.firstName}!</h3>
                        <p>
                            <b>Better Together </b>
                            is a platform built to help Buildit and Designit employees
                            share knowledge by creating and attending workshops. Help us to recomend workshops that may interest you by adding your office location and subjects that interest you to your profile.
                                               </p>
                    </div>
                    <div className="cell medium-6 flex-container align-self-middle">
                        <button className="button call-to-action complete-profile">
                            <Link to={`/settings/${this.props.user.userId}`} style={{ color: "white" }}>Complete Your Profile</Link>
                        </button>
                    </div>
                </section>
            )
        }
        return null
    }
}
