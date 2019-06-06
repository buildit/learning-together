import React, { Component } from "react";
import { RoutesComponent } from "./components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMapMarker, faUserCircle, faPencilAlt, faSearch, faVideo, faBuilding, faClock, faSpinner, faCheck, faMinus } from "@fortawesome/free-solid-svg-icons";
import { signIn } from './api'
import { MessageComponent } from './components'
import { UserAgentApplication } from 'msal'
import config from './services/config'
import Welcome from './welcome'
import { getUserDetails } from './services/graph.service'
// import AuthService from './services/auth.service2'
import './App.scss'

library.add(faMapMarker, faUserCircle, faPencilAlt, faSearch, faVideo, faBuilding, faClock, faSpinner, faCheck, faMinus);
class App extends Component {
  constructor() {
    super()
    // this.authService = new AuthService()
    // this.userAgentApplication = new UserAgentApplication(config.appId, config.authority, null, { redirectUri: process.env.REACT_APP_URL })
    this.userAgentApplication = new UserAgentApplication(config.appId, null, null, { redirectUri: process.env.REACT_APP_URL })
    const user = this.userAgentApplication.getUser()
    this.state = {
      isAuthenticated: (user !== null),
      user: {},
      error: null,
      loggingOut: false,
      events: null
    }
    if (user) {
      this.getUserProfile()
      console.log('user', user)
      signIn(user.displayableId, this.signInCallback)
    }
    window.addEventListener('logout', this.logout)
  }

  async login() {
    try {
      await this.userAgentApplication.loginPopup(config.scopes)
      await this.getUserProfile()
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
        user={this.state.user}
        authButtonMethod={this.login.bind(this)}
        loggingOut={this.state.loggingOut} />
    )

  }

  async getUserProfile() {
    try {
      const accessToken = await this.userAgentApplication.acquireTokenSilent(config.scopes)
      if (accessToken) {
        const user = await getUserDetails(accessToken)
        console.log('USER DETAILES', user)
        this.setState({
          isAuthenticated: true,
          user: {
            displayName: user.displayName,
            email: user.email || user.userPrincipalName
          },
          error: null,
          loggingOut: false
        })
      }
    }
    catch (err) {
      var error = {}
      if (typeof (err) === 'string') {
        const errParts = err.split('|')
        error = errParts.length > 1
          ? { message: errParts[1], debug: errParts[0] }
          : { message: err }
      } else {
        error = {
          message: err.message,
          debug: JSON.stringify(err)
        }
        this.setState({
          isAuthenticated: false,
          user: {},
          error
        })
      }
    }
  }
  // componentDidMount() {
  //   console.log('App.componentDidMount()')
  //   const acct = this.authService.getAccount()
  //   if (!acct) {
  //     this.login()
  //   }
  //   else {
  //     console.log('we have an account, doing BT signIn')
  //     signIn(acct.userName, this.signInCallback)
  //     this.setState({
  //       userInfo: acct
  //     })
  //     this.authService.getAccessToken()
  //   }
  // }

  // logout = () => {
  //   this.authService.logout()
  // }

  // login = () => {
  //   this.setState({
  //     userInfo: null
  //   })
  //   // start redirect login flow
  //   this.authService.login()
  // }

  signInCallback(response) {
    if (response.status === 200) {
      localStorage.setItem('userId', response.data.id)
      localStorage.setItem('username', response.data.username)
    }
    else {
      // setState({ isError: true })
      // currently failing here, check backend call to
      // https://bettertogether.buildit.systems/api/users/authenticate
    }
  }

  messageCallback() {
    this.setState({ isError: false })
  }
}

export default App;
