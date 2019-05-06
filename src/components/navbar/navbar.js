import React, { Component, Fragment } from "react";
import { Link, withRouter } from 'react-router-dom';
import './navbar.scss';
import logo from './logo.png';
import { LoadingComponent } from '../loading'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchComponent } from '../search'
import { logout } from '../auth/utils'

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

  render() {
    const { isUser } = this.props
    const userId = localStorage.getItem('userId')
    const accountDropDown = (
      <nav className="account-dropdown">
        <ul>
          <li><Link to={`/user/${userId}`}>View Profile</Link></li>
          <li><Link to="/login" onClick={logout}>Logout</Link></li>
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
                <Link to="/"><h5>Better Together</h5></Link>
              </div>
              <div className="cell small-2 medium-1 text-center">
                <FontAwesomeIcon icon="search" onClick={this.toggleShowSearch} size="2x" />
              </div>
              <div className="cell small-2 medium-1 text-center dropdown">
                {
                  isUser ? (
                    <Fragment>
                      <FontAwesomeIcon icon="user-circle" size="2x" onClick={this.toggleShowAccount} />
                      {
                        this.state.showAccount && (accountDropDown)
                      }
                    </Fragment>
                  )
                    :
                    <Link to="/login">Login</Link>
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