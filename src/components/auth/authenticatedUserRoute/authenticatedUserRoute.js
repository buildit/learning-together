import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const AuthenticatedUserRoute = ({ component: Component }) => {
  //authentication stuff
  console.log('hi')
  const user = false
  console.log(user)
  return (
    <Route user={user} render={() =>
      user ? <Component /> : <Redirect to='/login' />} />
  )
}
export default AuthenticatedUserRoute