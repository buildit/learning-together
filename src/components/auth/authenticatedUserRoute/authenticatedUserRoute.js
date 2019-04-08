import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const AuthenticatedUserRoute = ({ component: Component, ...props }) => {
  //authentication stuff
  const user = false //change when authentication is done
  return (
    <Route {...props} render={() =>
      user ? <Component /> : <Redirect to='/login' />} />
  )
}
export default AuthenticatedUserRoute