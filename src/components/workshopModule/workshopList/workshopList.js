import React, { Component, Fragment } from "react";
import { WorkshopPreviewComponent } from "../workshopPreview";
import { NavbarComponent } from "../../navbarModule";
import { getWorkshopList,getWorkshopListPast } from "../../../api";
import { groupBy, forEach } from 'lodash';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import moment from 'moment';
import "./workshoplist.scss";

class WorkshopList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      dates: [],
      workshops: []
    };
  }

  componentDidMount() {
    getWorkshopList(this.props.computedMatch.params.id).then(data => {
      this.setState({
        dates: this.filterByDay(data.data),
        title: this.props.computedMatch.params.title
      });
    });
    getWorkshopListPast(this.props.computedMatch.params.id).then(data => {
      this.setState({
        workshops: data.data
      })
    })
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.computedMatch.params.id !== prevProps.computedMatch.params.id
    ) {
      getWorkshopList(this.props.computedMatch.params.id).then(data => {
        this.setState({
          dates: this.filterByDay(data.data),
          title: this.props.computedMatch.params.title
        });
      });
      getWorkshopListPast(this.props.computedMatch.params.id).then(data => {
        this.setState({
          workshops: data.data
        })
      })
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
    const workshops = this.state.workshops;
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
        </TabPanel>
        <TabPanel>
          {workshops.map((workshop, index) => {
              return (
                <article className="workshopsforday" key={`workshop-video-${index}`}>
                <WorkshopPreviewComponent workshop={workshop} />
                </article>
            )
          })}
        </TabPanel>
        </Tabs>
        </section>
      </Fragment>
    );
  }
}

export default WorkshopList;
