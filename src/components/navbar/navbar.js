import React, { Component } from "react";
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    return (
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="dropdown menu" data-dropdown-menu>
            <Link to="/"><li className="menu-text">BetterTogether</li></Link>
          </ul>
        </div>
        <div className="top-bar-right">
          <ul className="menu">
            <li>
              <input type="search" placeholder="Search" />
            </li>
            <li>
              <button type="button" className="button">
                Search
              </button>
            </li>
            <li>
              <a href>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
