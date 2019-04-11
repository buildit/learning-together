import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './navbar.scss';
import logo from './logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Navbar extends Component {
  render() {
    const { user } = this.props
    return (
      <div className="navbar grid-container">
      <div className="grid-x grid-margin-x">
        <div className="cell small-2">
          <nav className='logo'>
            <Link to="/"><img src={logo}></img></Link>
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
                user
                  ? <Link to="/logout">Logout</Link>
                  : <Link to="/login">Login</Link>
              }
        </div>
        </div>
      </div>
    );
  }
}
