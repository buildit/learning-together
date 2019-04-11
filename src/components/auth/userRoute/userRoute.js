import React from 'react'
import { Route} from 'react-router-dom'

const UserRoute = ({ component: Component, ...props }) => {
  const token = localStorage.getItem('BTToken')
  let hasToken = false
  if (token) {
    hasToken = true
  }
  return (
    <Route {...props} render={() =>
      <Component hasToken={hasToken} />} />
  )
}
export default UserRoute