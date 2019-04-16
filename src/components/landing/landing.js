import React, { Component } from "react";
import { NavLink } from 'react-router-dom'
import { Hero } from "../hero";
import { PreviewComponent } from "../preview";
import { CategoryListComponent } from "../categoryList";
import { FooterComponent } from "../footer"
import workShopData from "./mock-workshops.json";
import './landing.scss';
import { NavbarComponent } from "../navbar";
import { UserContext, UserConsumer } from '../../UserProvider'

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workshops: workShopData,
      userId: ''
    };
  }

  componentDidMount() {
    if (this.props.location.state) {
      this.setState({ userId: this.props.location.state.userId })
      this.context.updateUser(this.props.location.state.userId)
    }
  }

  render() {
    const wrkshopPreview = this.state.workshops.map((workshop, idx) => {
      return <NavLink to="/workshop" className="preview-card" key={idx}><PreviewComponent workshop={workshop} /></NavLink>
    });
    const { isUser, location } = this.props
    return (
      <UserConsumer>
        {({ userId }) => (
          <div>
            {console.log('userId from context:', userId)}
            <NavbarComponent isUser={isUser} location={location} />
            <Hero title="Better Together" />
            <div className="grid-container landing-preview">
              <h2 className="section-title">Upcoming Workshops</h2>
              <div className="grid-x grid-padding-x card-scroll">
                {wrkshopPreview}
              </div>
            </div>
            <div className="grid-container landing-preview">
              <h2 className="section-title">Categories</h2>
              <CategoryListComponent workshop={this.state.workshops} />
            </div>
            <FooterComponent isUser={isUser} />
          </div>
        )}
      </UserConsumer>
    );
  }
}

Landing.contextType = UserContext

