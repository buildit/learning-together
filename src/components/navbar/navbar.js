import React, { Component, Fragment } from "react";
import { Link, withRouter } from 'react-router-dom';
import './navbar.scss';
import logo from './logo.png';
import { LoadingComponent } from '../loading'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Navbar extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isLoading: false,
      search: '',
      response: {}
    }
  }

  searchHandler(e) {
    this.setState({ [e.target.name]: e.target.value })
    //api call

  }
  searchCallback(response) {
    this.setState({ response, isLoading: false })

  }
  logoutHandler() {
    localStorage.removeItem('BTToken')
    localStorage.removeItem('userId')
  }

  render() {
    const { isUser } = this.props
    const userId = localStorage.getItem('userId')
    return (
      <Fragment>
        <div className="navbar grid-container">
          <div className="grid-x grid-margin-x align-justify align-middle">
            <div className="cell small-2">
              <nav className='logo'>
                <Link to="/"><img src={logo} alt="logo"></img></Link>
              </nav>
            </div>
            {/* <div className="cell small-7">
              <div className="search-container">
                <input type="search" name='search' placeholder="Search" value={this.state.search} onChange={this.searchHandler.bind(this)} />
                <button type="button" className="button">
                  <FontAwesomeIcon icon="search" />
                </button>
              </div>
            </div> */}
            <div className='cell small-4'>
              <div className="grid-x align-spaced align-middle flex-dir-row">
                <div className="cell small-2">
                  {
                    isUser && (
                      <Link to={`/user/${userId}`}><FontAwesomeIcon icon="user-circle" size="2x" /></Link>
                    )
                  }
                </div>
                <div className="cell small-5">
                  {
                    isUser
                      ? <Link to="/login" onClick={this.logoutHandler.bind(this)}>Logout</Link>
                      : <Link to="/login">Login</Link>
                  }
                </div>
              </div>
            </div>
          </div>
        </div >
        <div>
          {
            this.state.isLoading && (<LoadingComponent />)
          }
        </div>
      </Fragment >
    );
  }
}

export default withRouter(Navbar)