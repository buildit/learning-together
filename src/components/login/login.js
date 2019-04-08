import React from 'react'
import { Link } from 'react-router-dom'

export default class LoginComponent extends React.Component {
  constructor() {
    super()
    this.state = { email: '', password: '' }
  }

  emailHandler(e) {
    this.setState({ email: e.target.value })
  }
  passwordHandler(e) {
    this.setState({ password: e.target.value })
  }
  submitHandler(e) {
    e.preventDefault()
    const { email, password } = this.state
    console.log(email, password)
    //add logic for api call
  }
  render() {
    const { email, password } = this.state
    return (
      <div className="grid-container">
        <div className="grid-y medium-grid-frame">
          <div className="grid-x grid-padding-x">
            <form className='cell medium-6' onSubmit={this.submitHandler.bind(this)}>
              <div className='row'>
                <div className="small-12 columns">
                  <label>Email:
                <input type="text" placeholder="Please Enter Your Email Address" value={email} onChange={this.emailHandler.bind(this)} />
                  </label>
                </div>
              </div>
              <div className='row'>
                <div className="small-12 columns">
                  <label>Password:
                <input type="password" placeholder="Please Enter Your Password." value={password} onChange={this.passwordHandler.bind(this)} />
                  </label>
                </div>
              </div>
              <input type="submit" className="button success" value="Submit" />
              <div className='cell auto'>
                <Link to='' >Forgot your password?</Link>
              </div>
            </form>
            <div className='cell medium-6'>
              <Link to='/register' ><img src='http://placekitten.com/400/500' alt='register' /></Link>
            </div>
          </div>
          <div className='row'>
          </div>
        </div>
      </div >
    )
  }
}