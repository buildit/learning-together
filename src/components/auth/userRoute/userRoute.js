import React from "react";
import { Route } from "react-router-dom";

const UserRoute = ({ component: Component, ...props }) => {
  const token = localStorage.getItem("BTToken");
  let isUser = false;
  if (token) {
    isUser = true;
  }
  return (
    <Route {...props} render={() => <Component isUser={isUser} {...props} />} />
  );
};
export default UserRoute;
