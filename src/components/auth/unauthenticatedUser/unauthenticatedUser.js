import React from 'react'
import { Redirect } from 'react-router-dom'

export default (user, Component) => {
  return (
    user ? <Redirect to="/" /> : <Component />
  )
}