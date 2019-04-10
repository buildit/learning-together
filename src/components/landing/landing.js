import React, { Component } from "react";
import { NavLink } from 'react-router-dom'
import { JumbotronComponent } from "../jumbotron";
import { PreviewComponent } from "../preview";
import { CategoryListComponent } from "../categoryList";
import { FooterComponent } from "../footer"
import './landing.scss'


export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workshops: [
        {
          id: "1",
          name: "Redux",
          date: "March 1",
          description: "Learn redux techniques",
          instructor: "John Smith",
          location: "Brooklyn",
          time: "1400",
          image: "https://placeimg.com/300/300/arch",
          image_desc: "course image",
          category: "1"
        },
        {
          id: "2",
          name: "React",
          date: "March 16",
          description: "Learn react techniques",
          instructor: "Jasmin Smith",
          location: "Brooklyn",
          time: "1200",
          image: "https://placeimg.com/300/300/arch",
          image_desc: "course image",
          category: "1"
        },
        {
          id: "3",
          name: "Saga",
          description: "Learn saga techniques",
          instructor: "Jane Smith",
          location: "Brooklyn",
          time: "1000",
          image: "https://placeimg.com/300/300/arch",
          image_desc: "course image",
          category: "2"
        },
        {
          id: "4",
          name: "Yoga",
          description: "Learn yoga techniques",
          instructor: "Jazmin Smith",
          location: "Brooklyn",
          time: "1400",
          image: "https://placeimg.com/300/300/arch",
          image_desc: "course image",
          category: "3"
        },
        {
          id: "5",
          name: "Redux",
          date: "March 1",
          description: "Learn redux techniques",
          instructor: "John Smith",
          location: "Brooklyn",
          time: "1400",
          image: "https://placeimg.com/300/300/arch",
          image_desc: "course image",
          category: "1"
        },
        {
          id: "6",
          name: "React",
          date: "March 16",
          description: "Learn react techniques",
          instructor: "Jasmin Smith",
          location: "Brooklyn",
          time: "1200",
          image: "https://placeimg.com/300/300/arch",
          image_desc: "course image",
          category: "1"
        },
        {
          id: "7",
          name: "Saga",
          description: "Learn saga techniques",
          instructor: "Jane Smith",
          location: "Brooklyn",
          time: "1000",
          image: "https://placeimg.com/300/300/arch",
          image_desc: "course image",
          category: "2"
        },
        {
          id: "8",
          name: "Yoga",
          description: "Learn yoga techniques",
          instructor: "Jazmin Smith",
          location: "Brooklyn",
          time: "1400",
          image: "https://placeimg.com/300/300/arch",
          image_desc: "course image",
          category: "3"
        }
      ]
    };
  }

  render() {
    const wrkshopPreview = this.state.workshops.map(workshop => {
      return <NavLink to="/workshop" className="preview-card"><PreviewComponent key={workshop.id} workshop={workshop} /></NavLink>
    });

    return (
      <div>
        <div className="main">
          <JumbotronComponent />
          <h3>Upcoming workshops:</h3>
          <div className="grid-container full landing-preview">
            <div className="grid-x grid-padding-x card-scroll">
              {wrkshopPreview}
            </div>
          </div>
          <CategoryListComponent workshop={this.state.workshops} />
        </div>
        <FooterComponent />
      </div>
    );
  }
}
