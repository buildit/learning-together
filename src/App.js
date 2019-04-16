import React, { Component } from "react";
import { RoutesComponent } from "./components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMapMarker, faUserCircle, faPencilAlt, faSearch, faVideo, faBuilding, faClock, faSpinner, faCheck, faMinus } from "@fortawesome/free-solid-svg-icons";
import './App.scss'

library.add(faMapMarker, faUserCircle, faPencilAlt, faSearch, faVideo, faBuilding, faClock, faSpinner, faCheck, faMinus);
class App extends Component {
  render() {
    return (
      <RoutesComponent />
    )
  }
}

export default App;
