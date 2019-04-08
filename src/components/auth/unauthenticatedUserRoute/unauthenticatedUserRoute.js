import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const UnauthenticatedUserRoute = ({ component: Component, ...props }) => {
  //authentication stuff
  const user = false // change when authentication is done
  return (
    <Route {...props} render={() =>
      user ? <Redirect to='/' /> : <Component />} />
  )
}
export default UnauthenticatedUserRoute