import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const AuthenticatedUserRoute = ({ component: Component, ...props }) => {
  const token = localStorage.getItem('token')
  console.log(token)
  return (
    <Route {...props} render={() =>
      <Component token={token} />} />
  )
}
export default AuthenticatedUserRoute