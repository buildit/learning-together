import React from "react";
import { Route } from "react-router-dom";
import { getToken, getUserInfo } from '../utils'

const UserRoute = ({ component: Component, ...props }) => {
  const token = getToken();
  // console.log(getUserInfo())
  let isUser = false;
  if (token) {
    isUser = true;
  }
  return (
    <Route {...props} render={() => <Component isUser={isUser} {...props} />} />
  );
};

export default UserRoute;
