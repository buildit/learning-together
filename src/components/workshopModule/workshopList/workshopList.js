import React, { Component, Fragment } from "react";
import { WorkshopPreviewComponent } from "../workshopPreview";
import { NavbarComponent } from "../../navbarModule";
import { getWorkshopList } from "../../../api";
import { MessageComponent } from '../../messageModule'
import { groupBy, forEach } from 'lodash';
import moment from 'moment';
import "./workshoplist.scss";

class WorkshopList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      dates: [],
      workshops: [],
      isError: false
    };
    this.getWorkshopListCallback = this.getWorkshopListCallback.bind(this)
  }

  componentDidMount() {
    getWorkshopList(this.props.computedMatch.params.id, this.getWorkshopListCallback)
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.computedMatch.params.id !== prevProps.computedMatch.params.id
    ) {
      getWorkshopList(this.props.computedMatch.params.id, this.getWorkshopListCallback)
    }
  }

  getWorkshopListCallback(response) {
    if (response.status === 200) {
      this.setState({
        dates: this.filterByDay(response.data),
        title: this.props.computedMatch.params.title
      });
    }
    else {
      this.setState({ isError: true })
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

  render() {
    const dates = this.state.dates;
    return (
      <Fragment>
        <NavbarComponent
          location={this.props.location}
        />
        <section className="current-category">
          <header className="grid-container">
            <h1 className="section-title">
              <b>{this.state.title}</b>
            </h1>
          </header>

        </section>
        <section className="workshop-list grid-container">

          {dates.map((date, index) => {
            return (

              Object.keys(date).map((key, index) => {

                return (
                  <section key={`date-section-${index}`}>
                    <b className="time-header">{key}</b>
                    <article className="workshopsforday">
                      {date[key].map((workshop, index) => {
                        return (
                          <WorkshopPreviewComponent workshop={workshop} key={`workshop-preview-${index}`} />
                        )
                      })}
                    </article>
                  </section>
                )
              })
            )
          })}
        </section>
        {
          this.state.isError && (<MessageComponent message={'Could not retrieve the workshops at this time. Please try again later.'} />)
        }
      </Fragment>
    );
  }
}

export default WorkshopList;
