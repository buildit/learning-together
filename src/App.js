import React, { Component, Fragment } from "react";
import { RoutesComponent } from "./components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker, faUserCircle, faPencilAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { NavbarComponent } from "./components/navbar";
import './App.scss'

library.add(faMapMarker, faUserCircle, faPencilAlt, faSearch);
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
