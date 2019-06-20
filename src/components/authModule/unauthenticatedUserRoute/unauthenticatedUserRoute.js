import React from "react";
import { Route, Redirect } from "react-router-dom";

const UserRoute = ({ component: Component, ...props }) => {
  if (localStorage.getItem('username')) {
    return (
      <Route {...props} render={() => <Redirect to='/' />} />
    );
  }
  return (<Route render={() => <Component {...props} />} />)
}

export default UserRoute