import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthenticatedUserRoute, UnauthenticatedUserRoute } from "../auth";
import { RegisterComponent } from "../register";
import { LoginComponent } from "../login";
import { UserProfileComponent } from "../user-profile";
import { Page404Component } from "../page404";
import { LandingComponent } from "../landing";
import { WorkshopListComponent } from "../workshopList";
import { WorkshopComponent } from "../workshop";
import { WorkshopFormComponent } from "../workshopForm";

export default class RoutesComponent extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LandingComponent} />
          <UnauthenticatedUserRoute
            exact
            path="/login"
            component={LoginComponent}
          />
          <UnauthenticatedUserRoute
            exact
            path="/register"
            component={RegisterComponent}
          />
          <Route exact path="/user" component={UserProfileComponent} />

          <Route exact path="/workshops" component={WorkshopListComponent} />

          <Route exact path="/workshop" component={WorkshopComponent} />

          <Route
            exact
            path="/create-workshop"
            component={WorkshopFormComponent}
          />

          <Route component={Page404Component} />
        </Switch>
      </Router>
    );
  }
}
