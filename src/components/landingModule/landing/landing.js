import React, { Component } from "react";
import { NavbarComponent } from "../../navbarModule"
import { OnboardingComponent, HeroComponent } from "../../landingModule";
import { ScheduleComponent } from "../../userModule";
import { MessageComponent, LoadingComponent } from '../../messageModule'
import { getUser, getWorkshopListDate } from '../../../api'
import './landing.scss';
import moment from 'moment';
export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workshops: [],
      dates: [],
      noslides: 0,
      user: null,
      error: null,
      isUserLoading: false,
      isWorkshopListDateLoading: false
    };
    this.getUserCallback = this.getUserCallback.bind(this)
    this.getWorkshopListDateCallback = this.getWorkshopListDateCallback.bind(this)
  }

  componentDidMount() {
    this.setState({ isUserLoading: true, isCategoriesLoading: true, isWorkshopListDateLoading: true })
    getWorkshopListDate(moment().format(), this.getWorkshopListDateCallback)
    const userid = localStorage.getItem('userId');
    getUser(userid, this.getUserCallback)
  }

  getUserCallback(response) {
    this.setState({ isUserLoading: false })
    if (response.status === 200) {
      this.setState({
        user: response.data
      })
    } else {
      this.setState({ error: 'Could not retrieve user information. Please try again later.' })
    }
  }

  getWorkshopListDateCallback(response) {
    this.setState({ isWorkshopListDateLoading: false })
    if (response.status === 200) {
      let sorted = this.sortByDate(response.data)
      let workshops = sorted
      this.setState({ workshops })
    }
    else {
      this.setState({ error: 'Could not retrieve workshops. Please try again later.' })
    }
  }

  messageCallback() {
    this.setState({ error: null })
  }

  sortByDate = (workshops) => {
    return workshops.sort(function (a, b) {
      return new Date(a.start) - new Date(b.start);
    });
  }

  getNumberofSlides() {
    if (window.matchMedia('(min-width: 40em) and (max-width: 63.9375em)').matches) {
      return 2
    } else if (window.matchMedia('(min-width: 64em)').matches) {
      return 3
    } else
      return 1
  }

  render() {

    const { location } = this.props
    const { isUserLoading, isWorkshopListDateLoading, error } = this.state
    return (
      <div >
        <NavbarComponent location={location} />
        <HeroComponent title="Better Together" />
        <div className="grid-container landing-preview">
          <OnboardingComponent user={this.state.user} />
        </div>
        <div className="grid-container">
          <ScheduleComponent workshops={this.state.workshops} user={this.state.user} />
          {(isWorkshopListDateLoading || isUserLoading) && (<LoadingComponent />)}
        </div>
        {error && (<MessageComponent message={error} callback={this.messageCallback.call(this)} />)}
      </div>
    );
  }
}


