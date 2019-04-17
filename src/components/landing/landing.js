import React, { Component, Fragment } from "react";
import { NavLink } from 'react-router-dom'
import { Hero } from "../hero";
import { PreviewComponent } from "../preview";
import { CategoryListComponent } from "../categoryList";
import { FooterComponent } from "../footer"
import { getWorkshopList } from '../../api'
import './landing.scss';
import { NavbarComponent } from "../navbar";
import { loadCategories } from '../../api';

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workshops: [],
      error: null
    };
  }

  componentDidMount() {
    getWorkshopList()
      .then(response => this.setState({ workshops: [response.data] }))
      .catch(error => this.setState({ error: 'Please try again later' }))

    loadCategories()
      .then((data) => {

        this.setState({
          categories: data
        })
      })
  }

  render() {
    const wrkshopPreview = this.state.workshops.map((workshop, idx) => {
      return (
        <NavLink to="/workshop" className="preview-card" key={idx}>
          <PreviewComponent key={idx} workshop={workshop} />
        </NavLink>
      )
    });
    const { isUser, location } = this.props
    return (
      <Fragment>
        <NavbarComponent isUser={isUser} location={location} />
        <Hero title="Better Together" />
        <div className="grid-container landing-preview">
          <h2 className="section-title">Upcoming Workshops</h2>
          <div className="grid-x grid-padding-x card-scroll">
            {this.state.error ? <p>{this.state.error}</p> : wrkshopPreview}
          </div>
        </div>
        <div className="grid-container landing-preview">
          <h2 className="section-title">Categories</h2>
          <CategoryListComponent workshop={this.state.workshops} />
        </div>
        <FooterComponent isUser={isUser} />
      </Fragment >
    );
  }
}


