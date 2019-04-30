import React, { Component, Fragment } from "react";

class Sort extends Component {
  state = {
    sortBy: 'date'
  };
  

  handleChange(e) {
    const value = e.target.value
    this.setState({[e.target.name]: value})
    this.props.handleSort(value)
  }

  render() {
    return (
      <Fragment>
        <select name="sortBy" value={this.state.sortBy} onChange={this.handleChange.bind(this)}>
          <option value="date">Date</option>
          <option value="name">Workshop Name</option>
        </select>    
      </Fragment>
    );
  }
}

export default Sort;