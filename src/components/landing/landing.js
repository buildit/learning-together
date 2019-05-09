import React, { Component } from "react";
import { NavLink } from 'react-router-dom'
import { Hero } from "../hero";
import { PreviewComponent } from "../preview";
import { CategoryListComponent } from "../categoryList";
import { FooterComponent } from "../footer"
import { getWorkshopList, getUser,getWorkshopListDate } from '../../api'
import './landing.scss';
import { NavbarComponent } from "../navbar";
import { loadCategories} from '../../api';
import {groupBy,forEach} from 'lodash';
import moment from 'moment';

import {Onboarding} from "../onboarding";
import {Schedule} from "../schedule";
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
  }

  componentDidMount() {
    getWorkshopListDate(moment().format())
      .then(response => {
        let sorted = this.sortByDate(response.data)
        let workshops = sorted
       
        this.setState({ workshops })
      })
      .catch(error => this.setState({ error: 'Please try again later' }))

    loadCategories()
      .then((data) => {

        this.setState({
          categories: data
        })
      })
      if(this.props.isUser){
        const userid = localStorage.getItem('userId');
        getUser(userid)
        .then((data) => {
          this.setState({
            user: data.data
          })
        })
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

    const { isUser, location } = this.props
    return (
      <div >
        <NavbarComponent isUser={isUser} location={location} />
        <Hero title="Better Together" isUser={isUser} />
        <div className="grid-container landing-preview">
          <Onboarding user={this.state.user} />
        </div>
        <div className="grid-container">
          <Schedule workshops={this.state.workshops} user={this.state.user}/>
        </div>
        <div className="grid-container landing-preview">
          <h2 className="section-title">Categories</h2>
          <CategoryListComponent workshop={this.state.workshops} categories={this.state.categories} />
        </div>
        <FooterComponent className='footer' isUser={isUser} userId={this.state.userId} />
      </div>

    );
  }
}


