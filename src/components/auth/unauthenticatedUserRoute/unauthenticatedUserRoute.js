import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getToken } from '../utils'

const UnauthenticatedUserRoute = ({ component: Component, ...props }) => {
  //authentication stuff
  console.log(getToken())
  const token = getToken()
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
