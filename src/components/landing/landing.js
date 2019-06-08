import React, { Component } from "react";
import { CategoryListComponent } from "../categoryList";
import { FooterComponent } from "../footer"
import { getUser, getWorkshopListDate } from '../../api'
import './landing.scss';
import { loadCategories } from '../../api';
import moment from 'moment';
import { Container, Row } from 'reactstrap';

import { Onboarding } from "../onboarding";
import { Schedule } from "../schedule";

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
  }

  componentDidMount() {
    getWorkshopListDate(moment().format())
      .then(response => {
        let sorted = this.sortByDate(response.data)
        let workshops = sorted

        this.setState({workshops})
      })
      .catch(error => this.setState({error: 'Please try again later'}))

    loadCategories()
      .then((data) => {

        this.setState({
          categories: data
        })
      })
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

    return (
      <div>
        <Onboarding user={this.state.user}/>

        <Container className="landing-contentContainer">

          <Row>
            <Schedule workshops={this.state.workshops} user={this.state.user}/>
          </Row>

          <Row>
            <CategoryListComponent workshop={this.state.workshops} categories={this.state.categories}/>
          </Row>

          <Row>
            <FooterComponent className='footer' userId={this.state.userId}/>
          </Row>
        </Container>
      </div>

    );
  }
}


