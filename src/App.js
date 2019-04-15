import React, { Component } from "react";
import { RoutesComponent } from "./components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMapMarker, faUserCircle, faPencilAlt, faSearch, faVideo, faBuilding, faSpinner } from "@fortawesome/free-solid-svg-icons";
import './App.scss'

library.add(faMapMarker, faUserCircle, faPencilAlt, faSearch, faVideo, faBuilding, faSpinner);
class App extends Component {
  render() {
    return (
      <RoutesComponent />
    )
  }
}

export default App;
