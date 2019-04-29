import React, { Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { signIn } from '../../api'
import { NavbarComponent } from '../navbar';
import { UserContext } from '../../UserProvider'
import './login.scss'

export default class LoginComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      loginSuccess: false,
      loginError: false,
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
    const { email, password } = this.state
    const formattedEmail = this.formatEmail(email)
    //add logic for api call
    signIn({ Username: formattedEmail, Password: password }, this.submitCallback)
  }
  submitCallback(response) {
    if (response.status === 200) {
      localStorage.setItem('BTToken', response.data.token)
      localStorage.setItem('userId', response.data.id)
      this.setState({
        loginSuccess: true,
        userId: response.data.id
      })
    }
    else {
      this.setState({ loginError: true })
    }
  }

  render() {
    const { email, password, loginSuccess, userId, loginError } = this.state
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
                <div className='row'>
                  <div className="small-12 columns">
                    <label>Password:
                <input type="password" autoComplete="current-password" placeholder="Please Enter Your Password." name='password' value={password} onChange={this.inputHandler.bind(this)} />
                    </label>
                    {
                      loginError && (
                        <div className='login-error'>Username or password not found. Please try again.</div>
                      )
                    }
                  </div>
                </div>
                <div>
                  <div className='grid-x grid-padding-x align-center'>
                    <input type="submit" className="button success align-center cell medium-6" value="Submit" />
                  </div>
                  <div className='grid-x grid-padding-x align-center'>
                    <Link to='/forgot-password' >Forgot your password?</Link>
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
          loginSuccess && (
            <Redirect to={{ pathname: '/', state: { userId } }} />
          )
        }
      </Fragment>

    )
  }
}

LoginComponent.contextType = UserContext