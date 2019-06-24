import React, { Component } from "react";
import { MessageComponent, LoadingComponent } from "../../messageModule";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMapMarker, faUserCircle, faPencilAlt, faSearch, faVideo, faBuilding, faClock, faSpinner, faCheck, faMinus } from "@fortawesome/free-solid-svg-icons";
import { login } from '../../../services/msalUtils'

library.add(faMapMarker, faUserCircle, faPencilAlt, faSearch, faVideo, faBuilding, faClock, faSpinner, faCheck, faMinus);
class LoginComponent extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      error: null,
      events: null,
      isLoading: false
    }
  }
  componentDidMount() {
    this.setState({ error: sessionStorage.getItem('errorMsg') })
  }
  onClickLoginHandler(e) {
    this.setState({ isLoading: true })
    sessionStorage.removeItem('errorMsg')
    login()
  }
  messageCallback(response) {
    sessionStorage.removeItem('errorMsg')
    this.setState({ error: null })
  }

  render() {
    const img = `${process.env.PUBLIC_URL}/images/cover/default.jpg`
    const style = {
      backgroundImage: `url(${img})`
    }
    const { error, isLoading } = this.state
    return (
      <div className="welcome">
        <section className="cover-frame" style={style}>
          <div className="copy">
            <h1>Better Together</h1>
            <div className="calls-to-action">
              <button type="button" className="button call-to-action large" onClick={this.onClickLoginHandler.bind(this)}>Login</button>
            </div>
          </div>
        </section>
        {
          isLoading && (<LoadingComponent />)
        }
        {
          error && (
            <MessageComponent message={error} callback={e => this.messageCallback.call(this)} />
          )
        }
      </div>
    )
  }
}

export default LoginComponent;
