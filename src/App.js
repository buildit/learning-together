import React, { Component } from "react";
import { RoutesComponent } from "./components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMapMarker, faUserCircle, faPencilAlt, faSearch, faVideo, faBuilding, faClock, faSpinner, faCheck, faMinus } from "@fortawesome/free-solid-svg-icons";
import { signIn } from './api'
import { MessageComponent } from './components'
import { UserAgentApplication } from 'msal'
import { login } from './services/msalUtils'
import config from './services/config'
import Welcome from './welcome'
// import { getUserDetails } from './services/graph.service'
import './App.scss'

library.add(faMapMarker, faUserCircle, faPencilAlt, faSearch, faVideo, faBuilding, faClock, faSpinner, faCheck, faMinus);
class App extends Component {
  constructor() {
    super()
    this.state = {
      isAuthenticated: false,
      user: {},
      error: null,
      loggingOut: false,
      events: null,
      userAgentApplication: {}
    }
    this.signInCallback = this.signInCallback.bind(this)
    this.loginCallback = this.loginCallback.bind(this)

  }

  componentDidMount() {
    const userAgentApplication = new UserAgentApplication(config.appId, null, null, { redirectUri: process.env.REACT_APP_URL })
    this.setState({ userAgentApplication })
    if (sessionStorage.getItem('msal.idtoken')) {
      signIn(localStorage.getItem('username'), this.signInCallback)
    }
    else {
      sessionStorage.clear()
      login.call(this, userAgentApplication, this.loginCallback)
    }
    // if (this.userAgentApplication.getUser()) {
    //   this.setState({ user: this.userAgentApplication.getUser() })
    //   signIn(localStorage.getItem('username'), this.signInCallback)
    // }
    // else {
    //   login.call(this, this.userAgentApplication, this.loginCallback)
    // }
  }


  signInCallback(response) {
    console.log('sup')
    if (response.status === 200) {
      localStorage.setItem('userId', response.data.id)
      localStorage.setItem('username', response.data.username)
    }
    else {
      this.setState({ isError: true })
    }
  }

  loginCallback(response) {
    if (response.status === 200) {

    }
  }

  messageCallback() {
    this.setState({ isError: false })
  }

  render() {
    if (this.state.error) {
      return <MessageComponent message={this.state.error.message} callback={this.messageCallback.bind(this)} />
    }
    return <RoutesComponent />

  }
}

export default App;
