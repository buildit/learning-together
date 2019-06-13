import config from './config'

export function login(userAgent, callback) {
  userAgent.loginPopup(config.scopes)
    .then(response => {
      callback(response)
    })
    .catch(err => {
      callback(err)
    })
}

export function logout(userAgent, callback) {
  // this.setState({ isAuthenticated: false, loggingOut: true })
  userAgent.logout()
}