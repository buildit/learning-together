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
    getUser(this.props.computedMatch.params.id).then(data => {
      console.log(data);
      this.getUserCallback(data);
    });
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.computedMatch.params.id !== prevProps.computedMatch.params.id
    ) {
      getUser(this.props.computedMatch.params.id).then(data => {
        console.log("this.data", data);
        this.getUserCallback(data);
      });
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
    const { isUser } = this.props;
    const user = this.state.user;
    const baseUrl = "http://ec2-18-224-56-34.us-east-2.compute.amazonaws.com/";
    const profile = user.imageUrl !== "" ? `${baseUrl}${user.imageUrl}` : "";
    return (
      <Fragment>
        <NavbarComponent isUser={isUser} />
        <section className="user grid-container full first-container">
          <div className="grid-x user-profile">
            <div className="cell small-6">
              <div className="profile-pic">
                <div className="profile-frame">
                  <img src={profile} alt="User profile" />
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

                <h3>{user.role ? user.role.name : ""} </h3>
              </div>
              <a href="/">Edit</a>
            </div>
          </div>
          <div className="courses">
            <hr />
            <div className="upcoming">
              <div className="grid-container">
                <h2>
                  <b>Upcoming Courses</b>
                </h2>
                <select
                  name="schedule-dropdown"
                  onChange={this.updateWorkshopList.bind(this)}
                >
                  <option value="date">All</option>
                  <option value="teaching">Teaching</option>
                  <option value="attending">Attending</option>
                </select>
              </div>
              <section className="workshops-list">
                {this.state.classes.map((workshop, idx) => (
                  <WorkshopPreviewComponent key={idx} workshop={workshop} />
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
