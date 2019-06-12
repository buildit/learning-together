import React, { Component } from "react";
import { RoutesComponent } from "./components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMapMarker, faUserCircle, faPencilAlt, faSearch, faVideo, faBuilding, faClock, faSpinner, faCheck, faMinus } from "@fortawesome/free-solid-svg-icons";
import { signIn } from './api'
import { MessageComponent } from './components'
import { UserAgentApplication } from 'msal'
import config from './services/config'
import Welcome from './welcome'
import './App.scss'

library.add(faMapMarker, faUserCircle, faPencilAlt, faSearch, faVideo, faBuilding, faClock, faSpinner, faCheck, faMinus);
class App extends Component {
  constructor() {
    super()
    this.userAgentApplication = new UserAgentApplication(config.appId, null, null, { redirectUri: process.env.REACT_APP_URL })
    this.state = {
      isAuthenticated: false,
      user: {},
      error: null,
      loggingOut: false,
      events: null
    }
    window.addEventListener('logout', this.logout)
  }

  componentDidMount() {
    console.log('mounted')
  }

  async login() {
    try {
      await this.userAgentApplication.loginPopup(config.scopes)
      this.setState({
        isAuthenticated: true
      })
      // await this.getUserProfile()
      await this.btSignIn()
    }
    catch (err) {
      const errParts = err.split('|')
      this.setState({
        isAuthenticated: false,
        user: {},
        error: { message: errParts[1], debug: errParts[0] }
      })
    }
  }

  logout = () => {
    this.setState({ isAuthenticated: false, loggingOut: true })
    this.userAgentApplication.logout()
  }

  btSignIn() {
    const user = this.userAgentApplication.getUser()
    if (user) {
      signIn(user.displayableId, this.signInCallback)
    }
  }

  setHeader() {
    const user = this.userAgentApplication.getUser()
    let token;
    if (user) {
      token = sessionStorage.getItem('msal.idtoken');
      return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    } else {
      token = window.msal.acquireTokenSilent(config.appId)
      console.log('token', token)
    }
  }

  render() {
    if (this.state.error) {
      return <MessageComponent message={this.state.error.message} callback={this.messageCallback.bind(this)} />
    }
    if (this.state.isAuthenticated) {
      return <RoutesComponent />
    }

    return (
      <Welcome
        isAuthenticated={this.state.isAuthenticated}
        authButtonMethod={this.login.bind(this)}
        loggingOut={this.state.loggingOut} />
    )

  }

  signInCallback(response) {
    if (response.status === 200) {
      localStorage.setItem('userId', response.data.id)
      localStorage.setItem('username', response.data.username)
    }
    else {
      this.setState({ isError: true })
    }
  }

  messageCallback() {
    this.setState({ isError: false })
  }
}

export default App;
