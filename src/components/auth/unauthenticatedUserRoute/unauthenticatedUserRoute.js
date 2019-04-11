import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const UnauthenticatedUserRoute = ({ component: Component, ...props }) => {
  //authentication stuff
  const token = localStorage.getItem('BTToken')
  return (
    <Route {...props} render={() =>
      token ? <Redirect to='/' /> : <Component />} />
  )
}
export default UnauthenticatedUserRoute