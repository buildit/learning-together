import React, { Component, Fragment } from "react";
import { RoutesComponent } from "./components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker, faMale } from "@fortawesome/free-solid-svg-icons";
import { NavbarComponent } from "./components/navbar";
import './App.scss'

library.add(faMapMarker, faMale);
class App extends Component {
  render() {
    return (
      <Fragment>
        <NavbarComponent />
        <div className="main">
          <RoutesComponent />
        </div>
      </Fragment>
    )
  }
}

export default App;
