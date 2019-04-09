import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./categoryList.scss";

const WORKSHOP_CATEGORIES = ["Tech", "Design", "Soft skills", "Misc"];

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
            <div className="card-section">
              <h4>{category}</h4>
            </div>
          </Link>
        </div>
      );
    });

    return (
      <div>
        <h2>Categories:</h2>
        <div className="grid-container">
          <div className="grid-x grid-padding-x ">{WrkshpCategories}</div>
        </div>
      </div>
    );
  }
}

export default CategoryList;
