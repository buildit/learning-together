import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const AuthenticatedUserRoute = ({ component: Component }) => {
  //authentication stuff
  const user = false //change when authentication is done
  return (
    <Route user={user} render={() =>
      user ? <Component /> : <Redirect to='/login' />} />
  )
}
export default AuthenticatedUserRoute