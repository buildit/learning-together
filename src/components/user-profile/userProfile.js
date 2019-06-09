import React, { Fragment } from "react";
import "./user-profile.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WorkshopPreviewComponent } from "../workshopPreview";
import { getUser, getWorkshopListDate } from "../../api";
import moment from 'moment';
import { groupBy, forEach } from 'lodash';
import { UserContext } from "../../UserProvider";
import { Container, Row, Col } from 'reactstrap';

export default class UserProfileComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      classes: [],
      all: [],
      attending: [],
      teaching: []
    };
    this.getUserCallback = this.getUserCallback.bind(this);
    this.filterByDay = this.filterByDay.bind(this)
  }

  componentDidMount() {
    //Merge attended and teaching array
    getUser(this.props.computedMatch.params.id, this.getUserCallback)
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.computedMatch.params.id !== prevProps.computedMatch.params.id
    ) {
      getUser(this.props.computedMatch.params.id, this.getUserCallback)
    }
  }

  filterByDay = (workshops) => {
    let datesArray = []
    const dates = groupBy(workshops, function (workshop) {
      const start = workshop.start ? workshop.start : workshop.startDate;
      return moment(start).format("dddd, MMMM Do")
    })

    forEach(dates, function (date, key) {
      let day = {}
      day[key] = date;

      datesArray.push(day)
    })

    return datesArray
  }

  getUserCallback(data) {

    getWorkshopListDate(moment().format())
      .then(response => {

        const attend = data.data.workshopsAttending.map(workshop => {
          return (
            response.data.filter(attending => {
                return (
                  attending.id === workshop.workshopId
                )
              }
            )
          )
        })

        const teach = data.data.workshopsTeaching.map(workshop => {
          return (
            response.data.filter(teaching => {
                return (
                  teaching.id === workshop.workshopId
                )
              }
            )
          )
        })

        this.setState({
          all: response.data,
          attending: this.filterByDay([].concat(...attend)),
          teaching: this.filterByDay([].concat(...teach))
        })
      })
      .catch(error => this.setState({error: 'Please try again later'}))

    this.setState({
      user: data.data,
    });
  }

  updateWorkshopList(event) {
    if (
      event.target.value === "attending" ||
      event.target.value === "teaching"
    ) {
      const filtered = this.state.all.filter(workshop => {
        return workshop.status === event.target.value;
      });

      this.setState({
        classes: filtered
      });
    } else {
      this.setState({
        classes: this.state.all
      });
    }
  }

  render() {
    const {user} = this.state;
    const baseUrl = "https://bettertogether.buildit.systems/";

    return (
      <Fragment>

        <Container>
          <Row>
            <Col>
              <div className="user-container d-flex user-card">
                <div className="user-profilePic">

                  {Object.keys(user).length > 0 && <img src={baseUrl + user.imageUrl} alt="profile"/>}

                  <p>
                    <a href={`/#/settings/${user.id}`}>Edit</a>
                  </p>
                </div>

                <div className="user-info">
                  <h2>
                    {user.firstName} {user.lastName}
                  </h2>


                  {user.location ? (
                    <p>
                      <FontAwesomeIcon icon="map-marker"/>{" "}
                      <span>{user.location.name}</span>
                    </p>
                  ) : (
                    ""
                  )}

                  <p>{user.role ? user.role.name : ""} </p>
                  <p>{user.userInterests ? (
                      user.userInterests.map((interest, idx) => {
                        if (idx === 0) return interest.name
                        else return ', ' + interest.name
                      })
                    )
                    : "Professional Development, Social Activiites, Arts & Culture"} </p>

                </div>
              </div>

            </Col>
          </Row>

          <Row className="user-workshopContainer">
            <Col>

              <header className="user-workshopHeader">
                <h3>
                  My Workshops
                </h3>
              </header>

            </Col>
          </Row>
          <Row>
            <Col sm="12" md="6">


              <section className="">
                <div className="">
                  <header className="user-workshopHeader">
                    <h4 className="schedule-header">Teaching</h4>
                  </header>
                  {(this.state.teaching.length > 0)
                    ?
                    <article className="">

                      {this.state.teaching.map((date, index) => {
                        return (

                          Object.keys(date).map((key, index) => {

                            return (
                              <Fragment key={`workshop-list-${index}`}>
                                <b className="time-header">{key}</b>
                                <article className="workshopsforday">
                                  {date[key].map((workshop, index) => {
                                    return (
                                      <WorkshopPreviewComponent workshop={workshop}
                                                                key={`workshop-preview-${index}`}/>
                                    )
                                  })}
                                </article>
                              </Fragment>
                            )
                          })


                        )
                      })}

                    </article>
                    :
                    <section className="user-workshopList -empty user-card">
                      Not currently teaching any workshops.
                    </section>
                  }
                </div>
              </section>


            </Col>
            <Col sm="12" md="6">

              <section className="user-workshopList">
                <div className="">
                  <header className="user-workshopHeader">
                    <h4 className="">Attending</h4>
                  </header>
                  {(this.state.attending.length > 0)
                    ?
                    <article className="cell medium-10">
                      {this.state.attending.map((date, index) => {
                        return (

                          Object.keys(date).map((key, index) => {

                            return (
                              <Fragment key={`workshop-list-${index}`}>
                                <b className="time-header">{key}</b>
                                <article className="workshopsforday">
                                  {date[key].map((workshop, index) => {
                                    return (
                                      <WorkshopPreviewComponent workshop={workshop}
                                                                key={`workshop-preview-${index}`}/>
                                    )
                                  })}
                                </article>
                              </Fragment>
                            )
                          })
                        )
                      })}
                    </article>
                    :

                    <section className="user-workshopList -empty user-card">
                      Not currently attending any workshops.
                    </section>
                  }
                </div>
              </section>


            </Col>

          </Row>

        </Container>

      </Fragment>
    );
  }
}

UserProfileComponent.contextType = UserContext;
