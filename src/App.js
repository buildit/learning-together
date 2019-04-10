import React, { Component } from "react";
import { RoutesComponent } from "./components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker, faUserCircle, faPencilAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import './App.scss'

library.add(faMapMarker, faUserCircle, faPencilAlt, faSearch);
class App extends Component {
  render() {
    return (
      <RoutesComponent />
    )
  }
}

export default App;
