import React, { Component } from "react";
import { RoutesComponent } from "./components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMapMarker, faUserCircle, faPencilAlt, faSearch, faVideo, faBuilding, faClock, faSpinner, faCheck, faMinus } from "@fortawesome/free-solid-svg-icons";
import { signIn } from './api'
import { MessageComponent } from './components'
import AuthService from './services/auth.service2'
// import GraphService from './services/graph.service'
import './App.scss'

library.add(faMapMarker, faUserCircle, faPencilAlt, faSearch, faVideo, faBuilding, faClock, faSpinner, faCheck, faMinus);
class App extends Component {
  constructor() {
    super()
    this.authService = new AuthService()
    // this.graphService = new GraphService()
    this.state = {
      userInfo: null,
      apiCallFailed: false,
      loginFailed: false,
      isError: false
    }
    window.addEventListener('logout', this.logout)
  }

  logout = () => {
    this.authService.logout()
  }

  login = () => {
    const acct = this.authService.getAccount()
    this.setState({
      userInfo: null
    })
    if (!acct) {
      // start redirect login flow
      this.authService.login()
    }
    else {
      signIn(acct.userName, this.signInCallback)
      this.setState({
        userInfo: acct
      })
      //   this.authService.getAccessToken()
    }
  }

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
  render() {
    if (this.state.isError) {
      return <MessageComponent message='There is an error with getting your credentials. Please try again later.' callback={this.messageCallback.bind(this)} />
    }

    if (this.state.userInfo) {
      return (
        <RoutesComponent />
      )
    } else {
      (this.login())
    }
    return (
      <div>logging in</div>
    )
  }
}

export default App;
