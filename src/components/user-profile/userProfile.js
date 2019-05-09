import React, { Fragment } from "react";
import "./user-profile.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavbarComponent } from "../navbar";
import { WorkshopPreviewComponent } from "../workshopPreview";
import { getUser } from "../../api";
import { UserContext } from "../../UserProvider";

export default class UserProfileComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      classes: [],
      all: []
    };
    this.getUserCallback = this.getUserCallback.bind(this);
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

  getUserCallback(data) {
    let attending = data.data.workshopsAttending.map(workshop => {
      workshop.status = "attending";
      return workshop;
    });

    let teaching = data.data.workshopsTeaching.map(workshop => {
      workshop.status = "teaching";
      return workshop;
    });

    const all = attending.concat(teaching);

    this.setState({
      user: data.data,
      classes: all,
      all: all
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
    const profile = user.imageUrl !== "" ? `${baseUrl}${user.imageUrl}` : "";
    return (
      <Fragment>
        <NavbarComponent />
        <section className="user grid-container full first-container">
          <div className="grid-x user-profile grid-margin-x">
            <div className="cell small-6 medium-align-left">
              <div className="profile-pic">
                <div className="profile-frame">
                  <img src={profile} alt="profile" />
                </div>
                <a href="/">Edit</a>
              </div>
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
          </div>
          <div className="courses">
            <hr />
            <div className="upcoming">
              <div className="grid-container workshops-dropdown">
                <h2>
                  <b>My Workshops</b>
                </h2>
                <select
                  name="schedule-dropdown"
                  className="schedule-dropdown"
                  onChange={this.updateWorkshopList.bind(this)}
                >
                  <option value="date">All</option>
                  <option value="teaching">Teaching</option>
                  <option value="attending">Attending</option>
                </select>
              </div>
              <section className="workshops-list grid-container">
                {this.state.classes.map((workshop, idx) => (
                  <div className="cell medium-6" key={idx}>
                    <WorkshopPreviewComponent workshop={workshop} />
                  </div>
                ))}
              </section>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

UserProfileComponent.contextType = UserContext;
