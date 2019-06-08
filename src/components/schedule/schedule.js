import React, { Fragment } from "react";
import "./schedule.scss";
import { groupBy, forEach } from 'lodash';
import moment from 'moment';
import { WorkshopPreviewComponent } from "../workshopPreview";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';


export default class Schedule extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dates: [],
      workshops: [],
      user: [],
      current: "all"
    }

    this.filterByTeaching = this.filterByTeaching.bind(this);
    this.filterByAttending = this.filterByAttending.bind(this);
    this.filterByAll = this.filterByAll.bind(this);
    this.filterByInterests = this.filterByInterests.bind(this);
  }

  componentDidMount() {

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

  filterByAll = () => {
    this.setState({
      dates: this.filterByDay(this.state.workshops),
      current: "all"
    })
  }

  filterByInterests = () => {
    const workshops = this.props.user.userInterests.map(interest => {
      return (
        this.state.workshops.filter(interested => {

            return (
              interested.categoryId === interest.id
            )
          }
        )
      )
    })

    const merged = this.filterByDay([].concat(...workshops))
    this.setState({
      dates: merged,
      current: "recommended"
    })
  }

  filterByTeaching = () => {
    const workshops = this.props.user.workshopsTeaching.map(workshop => {
      return (
        this.state.workshops.filter(teaching => {

            return (
              teaching.id === workshop.workshopId
            )
          }
        )
      )
    })

    const merged = this.filterByDay([].concat(...workshops))
    this.setState({
      dates: merged,
      current: "teaching"
    })
  }

  filterByAttending = () => {
    const workshops = this.props.user.workshopsAttending.map(workshop => {
      return (
        this.state.workshops.filter(attending => {

            return (
              attending.id === workshop.workshopId
            )
          }
        )
      )
    })

    const merged = this.filterByDay([].concat(...workshops))
    this.setState({
      dates: merged,
      current: "attending"
    })
  }


  componentDidUpdate(nextProps, nextState) {
    if (nextProps.workshops !== this.props.workshops) {
      this.setState({
        dates: this.filterByDay(this.props.workshops),
        workshops: this.props.workshops
      })
    }
  }

  render() {
    const dates = this.state.dates;
    return (
      <Fragment>


        <Container>
          <Row className="">
            <Col sm="12">
              <div className="schedule-header d-flex justify-content-between align-items-end">
              <h3>Upcoming Workshops</h3>
              <div className="schedule-actions">
                <Link
                  className="schedule-button"
                  to={`/workshops`}
                >
                  <button type="button" className="-secondary">
                    <b>Browse All</b>
                  </button>
                </Link>

                <Link
                  className="schedule-button"
                  to={`/create`}
                >
                  <button type="button" className="-primary">
                    <b>Create A Workshop</b>
                  </button>
                </Link>


              </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col sm="12" md="9">
              {(dates.length > 0)
                ?
                  dates.map((date, index) => {
                    return (

                      Object.keys(date).map((key, index) => {

                        return (
                          <section key={`date-section-${index}`}>
                            <p className="schedule-sectionHeader">{key}</p>
                            <article className="schedule-itemCard">
                              {date[key].map((workshop, index) => {
                                return (
                                  <WorkshopPreviewComponent workshop={workshop} key={`workshop-preview-${index}`}/>
                                )
                              })}
                            </article>
                          </section>
                        )
                      })
                    )
                  })

                :
                <div>No matching results</div>
              }

            </Col>
            <Col sm="12" md="3">
              <nav className="workshop-filter">
                <ul>
                  <li>
                    <button className={`filter-schedule ${(this.state.current === "all") ? "current arrow_box" : ""}`}
                            onClick={this.filterByAll}>
                      All
                    </button>
                  </li>
                  <li>
                    <button
                      className={`filter-schedule ${(this.state.current === "teaching") ? "current arrow_box" : ""}`}
                      onClick={this.filterByTeaching}>
                      Teaching
                    </button>
                  </li>
                  <li>
                    <button
                      className={`filter-schedule ${(this.state.current === "attending") ? "current  arrow_box" : ""}`}
                      onClick={this.filterByAttending}>
                      Attending
                    </button>
                  </li>
                  <li>
                    <button
                      className={`filter-schedule ${(this.state.current === "recommended") ? "current arrow_box" : ""}`}
                      onClick={this.filterByInterests}>
                      Recommended
                    </button>
                  </li>
                </ul>
              </nav>
            </Col>
          </Row>


        </Container>
      </Fragment>
    )
  }
}

