import React, { Component } from "react";
import ShortPreview from "../shortPreview/shortPreview";

const WORKSHOP_CATEGORIES = ["1", "2", "3"];

export default class categoryList extends Component {
  renderWorkshops() {
    return WORKSHOP_CATEGORIES.map((category, index) => {
      const wkshop = this.props.workshop.filter(
        workshop => workshop.category === category
      );
      return <ShortPreview key={index} category={category} workshop={wkshop} />;
    });
  }
  render() {
    return <div>{this.renderWorkshops()}</div>;
  }
}
