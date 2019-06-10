import React, { Component } from "react";
import { CategoryListComponent } from "../../categoryModule";
import { FooterComponent, NavbarComponent } from "../../navbarModule"
import { OnboardingComponent, HeroComponent } from "../../landingModule";
import { ScheduleComponent } from "../../userModule";
import { getUser, getWorkshopListDate, loadCategories } from '../../../api'
import './landing.scss';
import moment from 'moment';
import { Container, Row, Col } from 'reactstrap';

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

        this.setState({ workshops })
      })
      .catch(error => this.setState({ error: 'Please try again later' }))

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
        <OnboardingComponent user={this.state.user}/>

        <Container className="landing-contentContainer">

          <Row>
            <ScheduleComponent workshops={this.state.workshops} user={this.state.user}/>
          </Row>

          <Row>
            <Col>
              <h3>Categories</h3>
            </Col>
            <CategoryListComponent workshop={this.state.workshops} categories={this.state.categories}/>
          </Row>


        </Container>
      </div>

    );
  }
}


