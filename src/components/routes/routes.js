import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { UserRoute, UnauthenticatedUserRoute } from "../auth";
import { RegisterComponent } from "../register";
import { LoginComponent } from "../login";
import { UserProfileComponent } from "../user-profile";
import { Page404Component } from "../page404";
import { LandingComponent } from "../landing";
import { BrowseComponent } from "../browse";
import { WorkshopListComponent } from "../workshopList";
import { WorkshopCreateComponent } from "../workshopCreate";
import { WorkshopEditComponent } from "../workshopEdit";
import { WorkshopComponent } from "../workshop";
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
              <UserRoute exact path="/user/:id" component={UserProfileComponent} />
              <UserRoute exact path="/settings/:id" component={RegisterComponent} />
              <UserRoute path="/workshops/categories/:id/:title" component={WorkshopListComponent} />
              <UserRoute exact path="/workshop/:id" component={WorkshopComponent} />
              <UserRoute exact path="/workshops" component={BrowseComponent} />
              <UserRoute exact path="/confirmation/enroll" component={ConfirmationComponent} />
              <UserRoute exact path="/create" component={WorkshopCreateComponent} />
              <UserRoute exact path="/edit/:id" component={WorkshopEditComponent} />
              <Route component={Page404Component} />
            </Switch>
          </div>
        </Router>
      </UserProvider>
    );
  }
}
