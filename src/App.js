import React, { Component } from "react";
import { RoutesComponent } from "./components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMapMarker, faUserCircle, faPencilAlt, faSearch, faVideo, faBuilding, faClock, faSpinner, faCheck, faMinus } from "@fortawesome/free-solid-svg-icons";
import './App.scss'
import { UserAgentApplication } from 'msal'

library.add(faMapMarker, faUserCircle, faPencilAlt, faSearch, faVideo, faBuilding, faClock, faSpinner, faCheck, faMinus);
class App extends Component {
  constructor() {
    super()
    this.userAgentApplication = new UserAgentApplication({ auth: { clientId: 'fd8a25a4-d4ae-4ec9-96e7-bec62ae45ca8' } })
  }
  render() {
    return (
      <RoutesComponent />
    )
  }
}

export default App;
