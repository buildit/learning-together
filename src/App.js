import React, { Component } from "react";
import { RoutesComponent } from "./components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMapMarker, faUserCircle, faPencilAlt, faSearch, faVideo, faBuilding, faClock, faSpinner, faCheck, faMinus } from "@fortawesome/free-solid-svg-icons";
import { signIn } from './api'
import { getUserInfo } from './components/auth/utils'
import './App.scss'

library.add(faMapMarker, faUserCircle, faPencilAlt, faSearch, faVideo, faBuilding, faClock, faSpinner, faCheck, faMinus);
class App extends Component {
  constructor() {
    super()
    this.getUserInfoCallback = this.getUserInfoCallback.bind(this)
    this.signInCallback = this.signInCallback.bind(this)
  }
  componentDidMount() {
    // send token to chris so i can get userId
    getUserInfo(this.getUserInfoCallback)
  }
  getUserInfoCallback(error, user) {
    signIn(user.userName, this.signInCallback)
  }
  signInCallback(response) {
    if (response.status === 200) {
      localStorage.setItem('userId', response.data.id)
      localStorage.setItem('username', response.data.username)
    }
    else {
      console.log(response)
    }
  }
  render() {
    return (
      <RoutesComponent />
    )
  }
}

export default App;
