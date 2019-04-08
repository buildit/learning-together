import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import Jumbotron from "./components/jumbotron/jumbotron";
import Preview from "./components/preview/preview";
import CategoryList from "./components/categoryList/categoryList";

class App extends Component {
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
          category: "2"
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
      return <Preview key={workshop.id} workshop={workshop} />;
    });

    return (
      <div className="App">
        <Navbar />
        <Jumbotron />
        {wrkshopPreview}
        <CategoryList workshop={this.state.workshops} />
      </div>
    );
  }
}

export default App;
