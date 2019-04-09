import React, { Component } from "react";
import { NavbarComponent } from "../navbar";
import { JumbotronComponent } from "../jumbotron";
import { PreviewComponent } from "../preview";
import { CategoryListComponent } from "../categoryList";

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
          image: "https://via.placeholder.com/40",
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
          image: "https://via.placeholder.com/40",
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
          image: "https://via.placeholder.com/40",
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
          image: "https://via.placeholder.com/40",
          image_desc: "course image",
          category: "3"
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
        {wrkshopPreview}
        <CategoryListComponent workshop={this.state.workshops} />
      </div>
    );
  }
}
