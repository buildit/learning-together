import React, { Component } from "react";
import { RoutesComponent } from "./components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker, faPencilAlt, faSearch } from "@fortawesome/free-solid-svg-icons";

library.add(faMapMarker, faPencilAlt, faSearch);
class App extends Component {
  render() {
    return <RoutesComponent />;
  }
}

export default App;
