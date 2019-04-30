import React, { Component, Fragment } from "react";

class Sort extends Component {
  state = {
    sortBy: 'name'
  };

  handleChange(e) {
    if (e.target.value === 'date') {
      console.log('sorting by date')
      this.setState({sortBy: 'date'})
    } else if (e.target.value === 'name'){
      console.log('sorting by name')
      this.setState({sortBy: 'name'})
    }
  }

  render() {
    return (
      <Fragment>
        <select value={this.state.sortBy} onChange={this.handleChange.bind(this)}>
          <option value="date">Date</option>
          <option value="name">Workshop Name</option>
        </select>    
      </Fragment>
    );
  }
}

export default Sort;