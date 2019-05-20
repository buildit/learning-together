import React, { Fragment } from 'react'
import { NavbarComponent } from '../../navbarModule'

export default class Page404Component extends React.Component {

  render() {
    return (
      <Fragment>
        <NavbarComponent />
        <h1>404 Page not found. </h1>
      </Fragment>
    )
  }
} 