import React, { Component } from "react";
import { NavbarComponent } from "../navbar";
import { JumbotronComponent } from "../jumbotron";
import { PreviewComponent } from "../preview";
import { CategoryListComponent } from "../categoryList";
import "./landing.scss";

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workshops: [
        {
          id: "1",
          name: "Redux Architecture",
          date: "March 1",
          description: "Learn redux techniques",
          instructor: "John Smith",
          location: "Brooklyn",
          time: "1400",
          image: "https://placeimg.com/300/300/arch",
          image_desc: "course image",
          category: "Tech"
        },
        {
          id: "2",
          name: "React Patterns",
          date: "March 16",
          description: "Learn react techniques",
          instructor: "Jasmin Smith",
          location: "Brooklyn",
          time: "1200",
          image: "https://placeimg.com/300/300/arch",
          image_desc: "course image",
          category: "Tech"
        },
        {
          id: "3",
          name: "Saga",
          date: "March 19",
          description: "Learn saga techniques",
          instructor: "Jane Smith",
          location: "Brooklyn",
          time: "1000",
          image: "https://placeimg.com/300/300/arch",
          image_desc: "course image",
          category: "Tech"
        },
        {
          id: "4",
          name: "Time Management",
          date: "March 20",
          description: "Learn how better manage your time",
          instructor: "Kate Smith",
          location: "Brooklyn",
          time: "1400",
          image: "https://placeimg.com/300/300/arch",
          image_desc: "course image",
          category: "Soft skills"
        },
        {
          id: "5",
          name: "Rapid prototyping",
          date: "March 1",
          description: "Learn design concepts",
          instructor: "John Smith",
          location: "Brooklyn",
          time: "1400",
          image: "https://placeimg.com/300/300/arch",
          image_desc: "course image",
          category: "Design"
        },
        {
          id: "6",
          name: "Wine Tasting",
          date: "March 16",
          description: "Learn all about wine",
          instructor: "Jasmin Smith",
          location: "Brooklyn",
          time: "1200",
          image: "https://placeimg.com/300/300/arch",
          image_desc: "course image",
          category: "Misc"
        },
        {
          id: "7",
          name: "Sketch App",
          date: "March 23",
          description: "Learn how to use Sketch for great UI",
          instructor: "Jane Smith",
          location: "Brooklyn",
          time: "1000",
          image: "https://placeimg.com/300/300/arch",
          image_desc: "course image",
          category: "Design"
        },
        {
          id: "8",
          name: "Yoga",
          date: "March 26",
          description: "Learn yoga techniques",
          instructor: "Jazmin Smith",
          location: "Brooklyn",
          time: "1400",
          image: "https://placeimg.com/300/300/arch",
          image_desc: "course image",
          category: "Misc"
        }
      ]
    };
  }

  render() {
    const wrkshopPreview = this.state.workshops.map(workshop => {
      return <PreviewComponent key={workshop.id} workshop={workshop} />;
    });

    return (
      <div>
        <NavbarComponent />
        <JumbotronComponent />
        <h3>Upcoming workshops:</h3>
        <div className="grid-container full landing-preview">
          <div className="grid-x grid-padding-x card-scroll">
            {wrkshopPreview}
          </div>
        </div>
        <CategoryListComponent workshop={this.state.workshops} />
      </div>
    );
  }
}
