import React, { Component } from 'react'

export const UserContext = React.createContext()

export const UserConsumer = UserContext.Consumer

class UserProvider extends Component {
  constructor() {
    super()
    this.state = {
      userId: 'Hi, I am a userId!',
      updateUser: id => {
        this.setState({ userId: id })
      }
    }
  }

  render() {
    return (
      <UserContext.Provider value={this.state}
      >
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export default UserProvider
