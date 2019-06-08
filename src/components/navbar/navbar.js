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
    this.setState({showSearch: !this.state.showSearch})
  }

  toggleShowAccount() {
    this.setState({showAccount: !this.state.showAccount})
  }

  logoutHandler() {
    localStorage.removeItem('BTToken')
    localStorage.removeItem('userId')
  }

  render() {
    const userId = localStorage.getItem('userId')
    const accountDropDown = (
      <nav className="account-dropdown">
        <ul>
          <li><Link to={`/user/${userId}`}>Profile</Link></li>
          <li><Link to={`/settings/${userId}`}>Settings</Link></li>
          <li><Link to="/login" onClick={logout}>Logout</Link></li>
        </ul>
      </nav>
    )
    return (
      <Fragment>
        <nav className="navbar d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <nav className="logo">
              <Link to="/"><img src={logo} alt="logo"></img></Link>
            </nav>

            <div className="search">
              <SearchComponent/>
            </div>
          </div>

          <div className="">


            <div className="dropdown">
              <FontAwesomeIcon icon="user-circle" size="2x" onClick={this.toggleShowAccount} />
              {
                this.state.showAccount && (accountDropDown)
              }
            </div>
          </div>


      </nav>
      < div >
      {
        this.state.isLoading && (<LoadingComponent/>)
      }
  </div>
  </Fragment >
  );
  }
  }

  export default withRouter(Navbar)
