import React, { Component } from "react";
import { RoutesComponent } from "./components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMapMarker, faUserCircle, faPencilAlt, faSearch, faVideo, faBuilding, faClock, faSpinner, faCheck, faMinus } from "@fortawesome/free-solid-svg-icons";
import { signIn } from './api'
import { getUserInfo } from './components/auth/utils'
import { MessageComponent } from './components'
import './App.scss'


library.add(faMapMarker, faUserCircle, faPencilAlt, faSearch, faVideo, faBuilding, faClock, faSpinner, faCheck, faMinus);
class App extends Component {
  constructor() {
    super()
    this.state = { isError: false }
    this.getUserInfoCallback = this.getUserInfoCallback.bind(this)
    this.signInCallback = this.signInCallback.bind(this)
  }
  componentDidMount() {
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
      this.setState({ isError: true })
    }
  }
  messageCallback() {
    this.setState({ isError: false })
  }
  render() {
    if (this.state.isError) {
      return <MessageComponent message='There is an error with getting your credentials. Please try again later.' callback={this.messageCallback.bind(this)} />
    }
    return (
      <RoutesComponent />
    )
  }
}

export default App;
