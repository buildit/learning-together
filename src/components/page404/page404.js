import React, { Fragment } from 'react'
import { NavbarComponent } from '../navbar'

export default class Page404Component extends React.Component {

  render() {
    return (
      <Fragment>
        <NavbarComponent isUser={this.props.isUser} />
        <h1>404 Page not found. </h1>
      </Fragment>
    )
  }
} 