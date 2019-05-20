import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { UserProfileComponent, EditUserProfileComponent } from "../../userModule";
import { Page404Component } from "../page404";
import { LandingComponent } from "../../landingModule";
import { BrowseComponent } from "../../navbarModule";
import { WorkshopListComponent, WorkshopCreateComponent, WorkshopEditComponent, WorkshopComponent } from '../../workshopModule'
import { ConfirmationComponent } from "../../messageModule";
import UserProvider from '../../../UserProvider'
import { UserRoute } from '../../authModule'

export default class RoutesComponent extends React.Component {
  editUserProfile({ component: Component, props }) {

  }
  render() {
    return (
      <UserProvider>
        <Router>
          <div className="main">
            <Switch>
              <UserRoute exact path="/" component={LandingComponent} />
              <UserRoute exact path="/user/:id" component={UserProfileComponent} />
              <UserRoute exact path="/settings/:id" component={EditUserProfileComponent} />
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
