import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import './navbar.scss';
import logo from './logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Navbar extends Component {
  logoutHandler() {
    localStorage.removeItem('BTToken')
  }

  render() {
    const { isUser } = this.props
    return (
      <div className="navbar grid-container">
        <div className="grid-x grid-margin-x">
          <div className="cell small-2">
            <nav className='logo'>
              <Link to="/"><img src={logo} alt="logo"></img></Link>
            </nav>
          </div>
          <div className="cell small-7">
            <div className="search-container">
              <input type="search" placeholder="Search" />
              <button type="button" className="button">
                <FontAwesomeIcon icon="search" />
              </button>
            </div>
          </div>
          <div className="cell small-2">
            {
              isUser
                ? <Link to="/" onClick={this.logoutHandler.bind(this)}>Logout</Link>
                : <Link to="/login">Login</Link>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar)