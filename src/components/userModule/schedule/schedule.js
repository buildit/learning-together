import React, { Fragment } from "react";
import "./schedule.scss";
import { groupBy, forEach } from 'lodash';
import moment from 'moment';
import { WorkshopPreviewComponent } from "../../workshopModule";

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
        const { isLoading } = this.props
        return (
            <Fragment>
                <header>
                    <h3>Upcoming Workshops</h3>
                    <hr />
                </header>

                <div className="grid-x">
                    <div className="cell medium-8">
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
                    </div>
                    <div className="medium-4">
                        <nav className="workshop-filter">
                            <ul>
                                <li>
                                    <button className={`filter-schedule ${(this.state.current === "all") ? "current arrow_box" : ""}`} onClick={this.filterByAll} disabled={isLoading}>
                                        All
                            </button>
                                </li>
                                <li>
                                    <button className={`filter-schedule ${(this.state.current === "teaching") ? "current arrow_box" : ""}`} onClick={this.filterByTeaching} disabled={isLoading}>
                                        Teaching
                            </button>
                                </li>
                                <li>
                                    <button className={`filter-schedule ${(this.state.current === "attending") ? "current  arrow_box" : ""}`} onClick={this.filterByAttending} disabled={isLoading}>
                                        Attending
                            </button>
                                </li>
                                <li>
                                    <button className={`filter-schedule ${(this.state.current === "recommended") ? "current arrow_box" : ""}`} onClick={this.filterByInterests} disabled={isLoading}>
                                        Recommended
                            </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </Fragment>
        )
    }
}

