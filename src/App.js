import React, { Component } from "react";
import { RoutesComponent } from "./components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMapMarker, faUserCircle, faPencilAlt, faSearch, faVideo, faBuilding, faClock, faSpinner, faCheck, faMinus } from "@fortawesome/free-solid-svg-icons";
import { signIn } from './api'
import { getUserInfo } from './components/utils'
import { MessageComponent } from './components'
import AuthService from './services/auth.service'
import GraphService from './services/graph.service'
import './App.scss'

library.add(faMapMarker, faUserCircle, faPencilAlt, faSearch, faVideo, faBuilding, faClock, faSpinner, faCheck, faMinus);
class App extends Component {
  //   constructor() {
  //     super()
  //     this.state = { isError: false }
  //     this.getUserInfoCallback = this.getUserInfoCallback.bind(this)
  //     this.signInCallback = this.signInCallback.bind(this)
  //   }
  //   componentDidMount() {
  //     getUserInfo(this.getUserInfoCallback)
  //   }
  //   getUserInfoCallback(error, user) {
  //     signIn(user.userName, this.signInCallback)
  //   }

  constructor() {
    super()
    this.authService = new AuthService()
    this.graphService = new GraphService()
    this.state = {
      userInfo: null,
      apiCallFailed: false,
      loginFailed: false,
      isError: false
    }
    window.addEventListener('logout', this.logout)
  }


  callAPI = () => {
    this.setState({
      apiCallFailed: false
    })
    this.authService.getToken().then(
      token => {
        this.graphService.getUserInfo(token).then(
          data => {
            this.setState({
              userInfo: data
            })
          },
          error => {
            console.error(error)
            this.setState({
              apiCallFailed: true
            })
          }
        )
      },
      error => {
        console.error(error)
        this.setState({
          apiCallFailed: true
        })
      }
    )
  }

  componentDidMount() {
    this.login()
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
      console.log('user is logged in', acct)
      signIn(acct.userName, this.signInCallback)
      this.setState({
        userInfo: acct
      })
      // this.callAPI()
    }
  }

  signInCallback(response) {
    console.log('RESPONSE', response)
    if (response.status === 200) {
      localStorage.setItem('userId', response.data.id)
      localStorage.setItem('username', response.data.username)
    }
    else {
      console.log(response)
      // setState({ isError: true })
      // currently failing here, check backend call to
      // https://bettertogether.buildit.systems/api/users/authenticate
    }
  }

  messageCallback() {
    this.setState({ isError: false })
  }
  render() {
    console.log('state', this.state)
    if (this.state.isError) {
      return <MessageComponent message='There is an error with getting your credentials. Please try again later.' callback={this.messageCallback.bind(this)} />
    }

    if (this.state.userInfo) {
      return (
        <RoutesComponent />
      )
    }
    return (
      <div>logging in</div>
    )
  }
}

export default App;
