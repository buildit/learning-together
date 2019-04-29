import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./categoryList.scss";


class CategoryList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const WrkshpCategories = this.props.categories.map((category, index) => {
      return (
        <div key={index} className="cell small-6 medium-4 large-3">
          <Link
            to={{
              pathname: `/workshops/categories/${category.id}/${category.name}`,
              category,
              state: this.props.workshop
            }}

            className="card custom-cards"
          >

            <b>{category.name}</b>

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

CategoryList.defaultProps = {
  categories: []
}