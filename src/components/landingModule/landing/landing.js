import React, { Component } from "react";
import { NavbarComponent } from "../../navbarModule"
import { OnboardingComponent, HeroComponent } from "../../landingModule";
import { ScheduleComponent } from "../../userModule";
import { getUser, getWorkshopListDate, loadCategories } from '../../../api'
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
      error: null
    };
    this.getUserCallback = this.getUserCallback.bind(this)
    this.getWorkshopListDateCallback = this.getWorkshopListDateCallback.bind(this)
    this.loadCategoriesCallback = this.loadCategoriesCallback.bind(this)
  }

  componentDidMount() {
    getWorkshopListDate(moment().format(), this.getWorkshopListDateCallback)
    const userid = localStorage.getItem('userId');
    getUser(userid, this.getUserCallback)
  }
  getUserCallback(response) {
    if (response.status === 200) {
      this.setState({
        user: response.data
      })
    } else {
      console.log(response)
    }
  }
  getWorkshopListDateCallback(response) {
    if (response.status === 200) {
      let sorted = this.sortByDate(response.data)
      let workshops = sorted

      this.setState({ workshops })
      loadCategories(this.loadCategoriesCallback)
    }
    else {
      this.setState({ error: 'Please try again later' })
    }
  }

  loadCategoriesCallback(response) {
    if (response.status === 200) {
      this.setState({
        categories: response
      })
    } else {
      //error
    }
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
    return (
      <div >
        <NavbarComponent location={location} />
        <HeroComponent title="Better Together" />
        <div className="grid-container landing-preview">
          <OnboardingComponent user={this.state.user} />
        </div>
        <div className="grid-container">
          <ScheduleComponent workshops={this.state.workshops} user={this.state.user} />
        </div>
      </div>

    );
  }
}


