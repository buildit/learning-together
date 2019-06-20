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
      isError: false,
      events: null,
      userAgentApplication: {},
      isLoading: false
    }
  }
  onClickLoginHandler(e) {
    this.setState({ isLoading: true })
    login(this.loginCallback)
  }


  render() {
    const img = `${process.env.PUBLIC_URL}/images/cover/default.jpg`
    const style = {
      backgroundImage: `url(${img})`
    }
    const { isError, error, isLoading } = this.state
    if (isError) {
      return <MessageComponent message={error} callback={this.messageCallback.bind(this)} />
    }
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
      </div>
    )
  }
}

export default LoginComponent;
