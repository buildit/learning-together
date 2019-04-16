import React, { Component } from 'react'

const UserContext = React.createContext()

export const UserConsumer = UserContext.Consumer

class UserProvider extends Component {
  state = {
    userId: null,
    updateUserId: id => this.updateUserId(id)
  }

  updateUserId = (id) => {
    this.setState({ userId: id })
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export default UserProvider
