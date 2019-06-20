import React from "react";
import { Route, Redirect } from "react-router-dom";

const UserRoute = ({ component: Component, ...props }) => {
  if (localStorage.getItem('username')) {
    return (
      <Route {...props} render={() => <Component {...props} />} />
    );
  }
  return (<Route render={() => <Redirect to="/login" />} />)
}

export default UserRoute