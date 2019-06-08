import React, { Fragment } from "react";
import './onboarding.scss';
import { Container, Row, Col } from 'reactstrap';

const Onboarding = ({user}) => {

  const encourageProfileCompletion = () => {
    return (
      <Fragment>
        {
          (user.userInterests.length === 0)
            ?
            <div className="onboarding-container">
              <Container>
                <Row>
                  <Col sm="12" md="8">
                    <h3 className="greeting">Welcome {user.firstName}!</h3>
                    <p>
                      <b>Better Together </b>
                      is a platform built to help Buildit and Designit employees
                      share knowledge by creating and attending workshops. Help us to recomend workshops that may
                      interest
                      you by adding your office location and subjects that interest you to your profile.
                    </p>
                  </Col>
                  <Col sm="12" md="4">
                    <div className="onboarding-newUserContainer">
                      <h4>New User Checklist</h4>
                      <ul className="onboarding-checklist">
                        <li><input type="checkbox"/> <label htmlFor="">Complete Your Profile</label></li>
                        <li><input type="checkbox"/> <label htmlFor="">Find workshops relevant to you</label></li>
                        <li><input type="checkbox"/> <label htmlFor="">Create your own workshop</label></li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
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
