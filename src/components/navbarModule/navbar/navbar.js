import React, { Component, Fragment } from "react";
import { Link, withRouter } from 'react-router-dom';
import './navbar.scss';
import logo from './logo.png';
import { logout } from '../../../services/msalUtils'
import { LoadingComponent } from '../../messageModule'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchComponent } from '../search'

class Navbar extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isLoading: false,
      showSearch: false,
      showAccount: false,
      response: {}
    }
    this.toggleShowSearch = this.toggleShowSearch.bind(this)
    this.toggleShowAccount = this.toggleShowAccount.bind(this)
    this.fireLogout = this.fireLogout.bind(this)
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.toggleShowSearch()
    }
  }
  toggleShowSearch() {
    this.setState({ showSearch: !this.state.showSearch })
  }
  toggleShowAccount() {
    this.setState({ showAccount: !this.state.showAccount })
  }
  logoutHandler() {
    localStorage.removeItem('BTToken')
    localStorage.removeItem('userId')
  }

  fireLogout() {
    // create and dispatch the event
    logout(window.msal)
  }

  render() {
    const userId = localStorage.getItem('userId')
    const accountDropDown = (
      <nav className="account-dropdown">
        <ul>
          <li>
            <Link to={{
              pathname: "/create",
              state: { userId }
            }} >
              Create a workshop
            </Link>
          </li>
          <li><Link to={`/user/${userId}`}>Profile</Link></li>
          <li><Link to={`/settings/${userId}`}>Settings</Link></li>
          <li><Link to="/" onClick={this.fireLogout}>Logout</Link></li>
        </ul>
      </nav>
    )
    return (
      <Fragment>
        <nav className="navbar">
          <div className="grid-container">
            <div className="grid-x grid-margin-x align-center-middle">
              <div className="cell small-8 flex-container align-middle">
                <nav className='logo'>
                  <Link to="/"><img src={logo} alt="logo"></img></Link>
                </nav>
              </div>
              <div className="cell small-2 medium-1 text-center search">
                <FontAwesomeIcon icon="search" onClick={this.toggleShowSearch} size="2x" />
              </div>
              <div className="desktop">
                <Link
                  to={{
                    pathname: "/workshops"
                  }}
                  className="flex flex-column justify-center align-items-center"
                >
                  Browse
              </Link>
              </div>
              <div className="cell small-2 medium-1 text-center dropdown">
                <FontAwesomeIcon icon="user-circle" size="2x" onClick={this.toggleShowAccount} />
                {
                  this.state.showAccount && (accountDropDown)
                }
              </div>
            </div>
            {
              this.state.showSearch && (<SearchComponent />)
            }
          </div>
        </nav>
        <div>
          {
            this.state.isLoading && (<LoadingComponent />)
          }
        </div>
        <section className="spacing"></section>
      </Fragment >
    );
  }
}

export default withRouter(Navbar)