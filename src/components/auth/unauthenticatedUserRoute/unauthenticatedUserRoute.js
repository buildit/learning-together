import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const UnauthenticatedUserRoute = ({ component: Component }) => {
  //authentication stuff
  console.log('hi')
  const user = false
  console.log(user)
  return (
    <Route user={user} render={() =>
      user ? <Redirect to='/' /> : <Component />} />
  )
}
export default UnauthenticatedUserRoute