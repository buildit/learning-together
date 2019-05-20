import React, { Component } from 'react'
import { Redirect } from 'react-router'
import './confirmation.scss'

class Confirmation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      title: "Enterprise Architecture",
      date: "May 19, 2019"
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ redirect: true })
    }, 1500)
  }

  render() {
    const { title, date, redirect } = this.state

    if (redirect) {
      return <Redirect to="/user" />
    }

    return (
      <h4 className="confirmation">You have successfully enrolled in {title} for {date}!</h4>
    )
  }
}

export default Confirmation