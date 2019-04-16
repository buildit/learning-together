import React, { Component } from "react";
import { RoutesComponent } from "./components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMapMarker, faUserCircle, faPencilAlt, faSearch, faVideo, faBuilding, faClock, faSpinner } from "@fortawesome/free-solid-svg-icons";
import './App.scss'
import { ImageUploaderComponent } from './components'

library.add(faMapMarker, faUserCircle, faPencilAlt, faSearch, faVideo, faBuilding, faClock, faSpinner);
class App extends Component {
  render() {
    return (
      <ImageUploaderComponent />
      // <RoutesComponent />
    )
  }
}

export default App;
