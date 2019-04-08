import React from 'react'
import { Redirect } from 'react-router-dom'

export default class AuthenticatedUserComponent extends React.Component {
  render() {
    const { user, Component, ownProps } = this.props

    return (
      user ? <Component {...ownProps} /> : <Redirect to="/login" />
    )
  }
}
