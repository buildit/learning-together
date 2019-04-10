import React, { Component } from "react";
import './navbar.scss'

export default class Navbar extends Component {
  render() {
    return (
      <div className="top-bar sticky">
        <div className="top-bar-left">
          <ul className="dropdown menu" data-dropdown-menu>
            <li className="menu-text">BetterTogether</li>
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
