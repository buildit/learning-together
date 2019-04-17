import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const UnauthenticatedUserRoute = ({ component: Component, ...props }) => {
  //authentication stuff
  const token = localStorage.getItem('BTToken')
  let isUser = false;
  if (token) {
    isUser = true;
  }
  return (
    < Route {...props} render={() =>
      token ? <Redirect to='/' /> : <Component isUser={isUser} />} />
  )
}
export default UnauthenticatedUserRoute
