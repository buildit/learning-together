import React, { Component } from "react";
import { RoutesComponent } from "./components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMapMarker, faUserCircle, faPencilAlt, faSearch, faVideo, faBuilding, faClock, faSpinner, faCheck, faMinus } from "@fortawesome/free-solid-svg-icons";
import { signIn } from './api'
import { MessageComponent } from './components'
import { UserAgentApplication } from 'msal'
import config from './services/config'
import Welcome from './welcome'
// import AuthService from './services/auth.service2'
import { getUserDetails, getEvents } from './services/graph.service'
import './App.scss'

library.add(faMapMarker, faUserCircle, faPencilAlt, faSearch, faVideo, faBuilding, faClock, faSpinner, faCheck, faMinus);
class App extends Component {
  constructor() {
    super()
    // this.authService = new AuthService()
    // this.userAgentApplication = new UserAgentApplication(config.appId, config.authority, null, { redirectUri: process.env.REACT_APP_URL })
    this.userAgentApplication = new UserAgentApplication(config.appId, null, null, { redirectUri: process.env.REACT_APP_URL })

    var user = this.userAgentApplication.getUser()
    this.state = {
      isAuthenticated: (user !== null),
      user: {},
      error: null,
      loggingOut: false,
      events: null
    }
    if (user) {
      // this.getUserProfile()
      // console.log('user', user)
      this.getCalEvents()
      signIn(user.displayableId, this.signInCallback)
    }
    window.addEventListener('logout', this.logout)
  }

  async login() {
    try {
      await this.userAgentApplication.loginPopup(config.scopes)
      // await this.getUserProfile()
      await this.getCalEvents
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
    console.log('Cal Events ', this.state.events)
    let error = null;
    if (this.state.error) {
      error = <MessageComponent message={this.state.error.message} callback={this.messageCallback.bind(this)} />
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

  async getCalEvents() {
    try {
      const accessToken = await window.msal.acquireTokenSilent(config.scopes)
      const events = await getEvents(accessToken)
      this.setState({ events: events.value })
    }
    catch (err) {
      console.log('error in getting Cal events ', err)
      this.setState({
        isAuthenticated: true
      })
    }
  }


  async getUserProfile() {
    console.log('user details???')
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
      console.log('err', err)
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
  // render() {
  //   if (this.state.isError) {
  //     return <MessageComponent message='There is an error with getting your credentials. Please try again later.' callback={this.messageCallback.bind(this)} />
  //   }

  //   if (this.state.userInfo) {
  //     return (
  //       <RoutesComponent />
  //     )
  //   }
  //   return (
  //     <div>logging in</div>
  //   )
  // }
}

export default App;
