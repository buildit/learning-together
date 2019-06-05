import React, { Fragment } from "react";
import "./user-profile.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavbarComponent } from "../../navbarModule";
import { WorkshopPreviewComponent } from "../../workshopModule";
import { getUser, getWorkshopListDate } from "../../../api";
import moment from 'moment';
import { groupBy, forEach } from 'lodash';
import { UserContext } from "../../../UserProvider";

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
      .catch(error => this.setState({ error: 'Please try again later' }))

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
    const { user } = this.state;
    const baseUrl = "https://bettertogether.buildit.systems/";

    return (
      <Fragment>
        <NavbarComponent />
        <section className="user grid-container">
          <div className="grid-x user-profile grid-margin-x">
            <div className="cell small-9">
              <div className="user-info">
                <h2>
                  {user.firstName} {user.lastName}
                </h2>
                {user.location ? (
                  <h3>
                    <FontAwesomeIcon icon="map-marker" />{" "}
                    <strong>{user.location.name}</strong>
                  </h3>
                ) : (
                    ""
                  )}
                <h5>{user.role ? user.role.name : ""} </h5>
                <h6>{user.userInterests ? (
                  user.userInterests.map((interest, idx) => {
                    if (idx === 0) return interest.name
                    else return ', ' + interest.name
                  })
                )
                  : "Professional Development, Social Activiites, Arts & Culture"} </h6>
              </div>
            </div>
            <div className="profile-pic cell small-3">
              <div className="profile-frame">
                {Object.keys(user).length > 0 && <img src={baseUrl + user.imageUrl} alt="profile" />}
              </div>
              <a href={`/#/settings/${user.id}`}>Edit</a>
            </div>
          </div>
          <div className="courses">
            <hr />
            <div className="upcoming">
              <header className="grid-container worskshop-header">
                <h4>
                  <b>My Workshops</b>
                </h4>
              </header>
            </div>
            <section className="workshops-list grid-container">
              <div className="grid-x">
                <header className="cell medium-2">
                  <b className="schedule-header">Attending</b>
                </header>
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
                                  <WorkshopPreviewComponent workshop={workshop} key={`workshop-preview-${index}`} />
                                )
                              })}
                            </article>
                          </Fragment>
                        )
                      })
                    )
                  })}
                </article>
              </div>
            </section>
            <section className="workshops-list grid-container">
              <div className="grid-x">
                <header className="cell medium-2">
                  <b className="schedule-header">Teaching</b>
                </header>
                <article className="cell medium-10">
                  {this.state.teaching.map((date, index) => {
                    return (

                      Object.keys(date).map((key, index) => {

                        return (
                          <Fragment key={`workshop-list-${index}`}>
                            <b className="time-header">{key}</b>
                            <article className="workshopsforday">
                              {date[key].map((workshop, index) => {
                                return (
                                  <WorkshopPreviewComponent workshop={workshop} key={`workshop-preview-${index}`} />
                                )
                              })}
                            </article>
                          </Fragment>
                        )
                      })


                    )
                  })}
                </article>
              </div>
            </section>
          </div>
        </section>
      </Fragment>
    );
  }
}

UserProfileComponent.contextType = UserContext;
