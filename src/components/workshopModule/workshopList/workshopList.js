import React, { Component, Fragment } from "react";
import { WorkshopPreviewComponent } from "../workshopPreview";
import { NavbarComponent } from "../../navbarModule";
import { getWorkshopList, getWorkshopListPast } from "../../../api";
import { groupBy, forEach } from 'lodash';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import moment from 'moment';
import "./workshoplist.scss";
import { LoadingComponent } from "../../messageModule";

class WorkshopList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      dates: [],
      workshops: [],
      error: null,
      isWorkshopListLoading: false,
      isWorkshopListPastLoading: false
    };
    this.getWorkshopListCallback = this.getWorkshopListCallback.bind(this)
    this.getWorkshopListPastCallback = this.getWorkshopListPastCallback.bind(this)
  }

  componentDidMount() {
    this.setState({ isWorkshopListLoading: true, isWorkshopListPastLoading: true })
    getWorkshopList(this.props.computedMatch.params.id, this.getWorkshopListCallback)
    getWorkshopListPast(this.props.computedMatch.params.id, this.getWorkshopListPastCallback)
  }
  componentDidUpdate(prevProps) {
    if (this.props.computedMatch.params.id !== prevProps.computedMatch.params.id) {
      this.setState({ isWorkshopListLoading: true })
      getWorkshopList(this.props.computedMatch.params.id, this.getWorkshopListCallback)
      getWorkshopListPast(this.props.computedMatch.params.id, this.getWorkshopListPastCallback)
    }
  }

  getWorkshopListCallback(response) {
    this.setState({ isWorkshopListLoading: false })
    if (response.status === 200) {
      this.setState({
        dates: this.filterByDay(response.data),
        title: this.props.computedMatch.params.title
      });
    }
    else {
      this.setState({ error: 'Could not retrieve workshop list at this time. Please try again later.' })
    }
  }

  getWorkshopListPastCallback(response) {
    this.setState({ isWorkshopListPastLoading: false })
    if (response.status === 200) {
      this.setState({
        workshops: response.data
      })
    } else {
      this.setState({ error: 'Could not retrieve previous workshops at this time. Please try again later' })
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
    const { dates, workshops, isWorkshopListLoading, isWorkshopListPastLoading } = this.state
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

          <Tabs defaultIndex={0}>
            <TabList className="workshop-selector">
              <Tab>Upcoming</Tab>
              <Tab>Video</Tab>
            </TabList>
            <TabPanel>
              {dates.map((date, index) => {
                return (

                  Object.keys(date).map((key, index) => {

                    return (
                      <section className="course" key={`date-section-${index}`}>
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
              {
                isWorkshopListLoading && (<LoadingComponent />)
              }
            </TabPanel>
            <TabPanel>
              {workshops.map((workshop, index) => {
                return (
                  <article className="workshopsforday" key={`workshop-video-${index}`}>
                    <WorkshopPreviewComponent workshop={workshop} />
                  </article>
                )
              })}
              {
                isWorkshopListPastLoading && (<LoadingComponent />)
              }
            </TabPanel>
          </Tabs>
        </section>
      </Fragment>
    );
  }
}

export default WorkshopList;
