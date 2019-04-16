
import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { UserRoute, UnauthenticatedUserRoute } from "../auth";
import { RegisterComponent } from "../register";
import { LoginComponent } from "../login";
import { UserProfileComponent } from "../user-profile";
import { Page404Component } from "../page404";
import { LandingComponent } from "../landing";
import { WorkshopListComponent } from "../workshopList";
import { WorkshopFormComponent } from "../workshopForm";
import { WorkshopComponent } from '../workshop'
import { ConfirmationComponent } from "../confirmation";
import UserProvider from '../../UserProvider'

export default class RoutesComponent extends React.Component {
  render() {
    return (
      <UserProvider>
        <Router>
          <div className="main">
            <Switch>
              <UserRoute exact path="/" component={LandingComponent} />
              <UnauthenticatedUserRoute exact path="/login" component={LoginComponent} />
              <UnauthenticatedUserRoute exact path="/register" component={RegisterComponent} />
              <UserRoute exact path="/user" component={UserProfileComponent} />
              <UserRoute path="/workshops" component={WorkshopListComponent} />
              <UserRoute exact path="/workshop" component={WorkshopComponent} />
              <UserRoute exact path="/confirmation/enroll" component={ConfirmationComponent} />
              <Route exact path="/create-workshop" component={WorkshopFormComponent} />
              <Route component={Page404Component} />
            </Switch>
          </div>

        </Router>
      </UserProvider>
    );
  }
}