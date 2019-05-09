import React from "react";
import { Route } from "react-router-dom";
import { getToken } from '../utils'

const UserRoute = ({ component: Component, ...props }) => {
  return (
    <Route {...props} isUser={true} render={() => <Component {...props} />} />
  );
};

export default UserRoute;
