import React, { Fragment } from "react";
import './onboarding.scss';


const Onboarding = ({ user }) => {

    const encourageProfileCompletion = () => {
        return (
            <Fragment>
                {
                    (user.userInterests.length === 0)
                        ?
                        <section className="grid-x complete-profile-callout">
                            <div className="cell medium-6">
                                <h3 className="greeting">Welcome {user.firstName}!</h3>
                                <p>
                                    <b>Better Together </b>
                                    is a platform built to help Buildit and Designit employees
                                    share knowledge by creating and attending workshops. Help us to recomend workshops that may interest you by adding your office location and subjects that interest you to your profile.
                                </p>
                            </div>
                            <div className="cell medium-6 flex-container align-self-middle">
                                <button className="button call-to-action complete-profile">
                                    Complete Your Profile
                        </button>
                            </div>
                        </section>
                        : ""
                }
            </Fragment>
        )
    }

    return (
        <Fragment>
            {
                (user ? encourageProfileCompletion()
                    : "")
            }
        </Fragment>
    )

}

export default Onboarding;

Onboarding.defaultProps = {
    user: {
        firstName: "",
        userInterests: []
    }
}