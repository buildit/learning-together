import React, { Component } from "react"
import { getUserDetails, getEvents } from '../../services/graph.service'
import config from '../../services/config'

export default class AddToCal extends Component {
  constructor() {
    super()
    this.state = {
      events: '',
      isError: false
    }
  }
  // move to add to cal section
  async getCalEvents() {
    console.log('config', config)
    try {
      const accessToken = await window.msal.acquireTokenSilent(config.scopes)
      const events = await getEvents(accessToken)
      this.setState({ events: events.value })
    }
    catch (err) {
      console.log('err', err)
      this.setState({
        isError: true
      })
    }
  }


  render() {
    console.log('events', this.state.events)
    return (
      <button onClick={this.getCalEvents.bind(this)}>Add To Calendar</button>
    )
  }
}

