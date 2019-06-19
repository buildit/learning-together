import React, { Component, Fragment } from "react";
import { loadCategories } from "../../../api";
import { NavbarComponent } from "../navbar";
import { CategoryListComponent } from "../../categoryModule";
import "./browse.scss";

class Browse extends Component {
  constructor() {
    super()
    this.state = {
      categories: [],
      sortBy: "date"
    }
    this.loadCategoriesCallback = this.loadCategoriesCallback.bind(this)
  }

  componentDidMount() {
    loadCategories(this.loadCategoriesCallback)
  }

  loadCategoriesCallback(response) {
    this.setState({
      categories: response
    })
  }

  handleSort(sort) {
    this.setState({ sortBy: sort });
  }

  render() {
    return (
      <Fragment>
        <NavbarComponent />
        <section
          id="browser-container"
          className="current-category first-container"
        >
        </section>
        <header className="grid-container">
          <h3>Course Categories</h3>
          <hr />
        </header>
        <div className="grid-container">

          <CategoryListComponent workshop={this.state.workshops} categories={this.state.categories} />
        </div>

      </Fragment>
    );
  }
}

export default Browse;
