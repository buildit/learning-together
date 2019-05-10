import React from "react";
import { Route } from "react-router-dom";

const UserRoute = ({ component: Component, ...props }) => {
  return (
    <Route {...props} isUser={true} render={() => <Component {...props} />} />
  );
};

export default UserRoute;
