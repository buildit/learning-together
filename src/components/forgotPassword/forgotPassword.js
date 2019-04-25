import React, { Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { NavbarComponent } from '../navbar'
import { MessageComponent } from '../message'

export default class ForgotPasswordComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      resetSuccess: false,
      resetError: false,
      userId: ''
    }
    this.submitCallback = this.submitCallback.bind(this)
  }

  inputHandler(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  formatEmail(email) {
    return email.trim()
  }
  submitHandler(e) {
    e.preventDefault()
    const { email } = this.state
    const formattedEmail = this.formatEmail(email)
    //add logic for api call
    //passwordReset({ Username: formattedEmail }, this.submitCallback)
  }
  submitCallback(response) {
    if (response.status === 200) {

    }
    else {
      this.setState({ resetError: true })
    }
  }
  toggleResetError() {
    this.setState({ resetError: !this.state.resetError })
  }
  render() {
    const { email, resetSuccess, userId, resetError } = this.state
    return (
      <Fragment>
        <NavbarComponent isUser={this.props.isUser} userId={userId} />
        <div className="grid-container first-container">
          <div className="grid-y medium-grid-frame">
            <div className="grid-x grid-padding-x align-middle">
              <form className='cell medium-12' onSubmit={this.submitHandler.bind(this)}>
                <div className='row'>
                  <div className="small-12 columns">
                    <label>Email:
                <input type="text" placeholder="Please Enter Your Email Address" autoComplete="user email" name='email' value={email} onChange={this.inputHandler.bind(this)} />
                    </label>
                  </div>
                </div>
                <div>
                  <div className='grid-x grid-padding-x align-center'>
                    <input type="submit" className="button success align-center cell medium-6" value="Submit" />
                  </div>
                </div>
                <div className='row'>
                  <div className='grid-x grid-padding-x align-center'>
                    <Link to='/reset-password' >Reset your password</Link>
                  </div>
                </div>
                <div className='row'>
                  <div className='grid-x grid-padding-x align-center'>
                    <Link to='/register' >Don't have an account?</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div >
        {
          resetSuccess && (
            <Redirect to={{ pathname: '/', state: { userId } }} />
          )
        }
        {
          resetError && (
            <MessageComponent message='Password Reset is down right nopw. Please try again later' callback={this.toggleResetError.bind(this)} />
          )
        }
      </Fragment>

    )
  }
}