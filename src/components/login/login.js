import React, { Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { signIn } from '../../api'
import { NavbarComponent } from '../navbar';
import { UserConsumer } from '../../UserProvider'

export default class LoginComponent extends React.Component {
  constructor() {
    super()
    this.state = { email: '', password: '', loginSuccess: false, id: null }
    this.submitCallback = this.submitCallback.bind(this)
  }

  emailHandler(e) {
    this.setState({ email: e.target.value })
  }
  passwordHandler(e) {
    this.setState({ password: e.target.value })
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
    localStorage.setItem('BTToken', response.data.token)
    this.setState({ loginSuccess: true, id: response.data.id })
  }
  render() {
    const { email, password, loginSuccess } = this.state
    return (
      <UserConsumer>
        {(userId, updateUserId) => (
          <Fragment>
            <NavbarComponent isUser={this.props.isUser} />
            <div className="grid-container">
              <div className="grid-y medium-grid-frame">
                <div className="grid-x grid-padding-x align-middle">
                  <form className='cell medium-12' onSubmit={this.submitHandler.bind(this)}>
                    <div className='row'>
                      <div className="small-12 columns">
                        <label>Email:
                  <input type="text" placeholder="Please Enter Your Email Address" autoComplete="user email" value={email} onChange={this.emailHandler.bind(this)} />
                        </label>
                      </div>
                    </div>
                    <div className='row'>
                      <div className="small-12 columns">
                        <label>Password:
                  <input type="password" autoComplete="current-password" placeholder="Please Enter Your Password." value={password} onChange={this.passwordHandler.bind(this)} />
                        </label>
                      </div>
                    </div>
                    <div>
                      <div className='grid-x grid-padding-x align-center'>
                        <input type="submit" className="button success align-center cell medium-6" value="Submit" />
                      </div>
                      <div className='grid-x grid-padding-x align-center'>
                        <Link to='' >Forgot your password?</Link>
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
                <Redirect to={{ pathname: '/', state: { id: this.state.id } }} />
              )
            }
          </Fragment >

        )}

      </UserConsumer>

    )
  }
}