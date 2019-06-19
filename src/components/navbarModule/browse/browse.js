import React, { Component, Fragment } from "react";
import { loadCategories } from "../../../api";
import { NavbarComponent } from "../navbar";
import { CategoryListComponent } from "../../categoryModule";
import "./browse.scss";
import { LoadingComponent, MessageComponent } from "../../messageModule";

class Browse extends Component {
  constructor() {
    super()
    this.state = {
      categories: [],
      sortBy: "date",
      isLoading: false,
      error: null
    }
    this.loadCategoriesCallback = this.loadCategoriesCallback.bind(this)
    this.messageCallback = this.messageCallback.bind(this)
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    loadCategories(this.loadCategoriesCallback)
  }

  loadCategoriesCallback(response) {
    this.setState({ isLoading: false })
    if (response) {
      this.setState({
        categories: response,
        isLoading: false
      })
    } else {
      this.setState({ error: 'Categories could not be retrieved. Please try again later.' })
    }
  }

  handleSort(sort) {
    this.setState({ sortBy: sort });
  }
  messageCallback() {
    this.setState({ error: null })
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
          {this.state.isLoading && (<LoadingComponent />)}
        </div>
        {this.state.error && (<MessageComponent message={this.state.error} callback={this.messageCallback} />)}
      </Fragment>
    );
  }
}

export default Browse;
