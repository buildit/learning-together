import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./categoryList.scss";

const WORKSHOP_CATEGORIES = ["UX", "Platform Engineering", "Leadership", "Enterprise", "Delivery", "Dev Ops", "Marketing", "Front End"];

class CategoryList extends Component {
  render() {
    const WrkshpCategories = WORKSHOP_CATEGORIES.map((category, index) => {
      return (
        <div key={index} className="cell small-6 ">
          <Link
            to={{
              pathname: "/workshops",
              category,
              state: this.props.workshop
            }}
            className="card custom-cards"
          >

              <h4>{category}</h4>
           
          </Link>
        </div>
      );
    });

    return (
      <div>
          <div className="grid-x category-container">{WrkshpCategories}</div>
      </div>
    );
  }
}

export default CategoryList;
