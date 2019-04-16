import React, { Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated'
import { signUp } from '../../api'
import { MessageComponent } from '../message'
import './register.scss'

export default class RegisterComponent extends React.Component {

  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      emailUsername: '',
      isWipro: true,
      password: '',
      passwordConfirmation: '',
      selectedLocation: {},
      selectedRole: {},
      interests: [],
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      passwordError: false,
      passwordConfirmationError: false,
      locationError: false,
      roleError: false,
      isLoading: false,
      signUpSuccess: false,
      redirect: false
    }
    this.locations = [{ value: '1', label: 'New York' }, { value: '2', label: 'Denver' }, { value: '3', label: 'Dallas' }, { value: '4', label: 'London' }]
    this.roles = [{ value: '1', label: 'Front End Engineer' }, { value: '2', label: 'Platform Engineer' }, { value: '3', label: 'Creative Tech' }]
    this.interests = [{ value: 'fee', label: 'Front End Engineer' }, { value: 'pe', label: 'Platform Engineer' }, { value: 'ct', label: 'Creative Tech' }]
    this.emails = [{ value: '@wipro.com', label: '@wipro.com' }, { value: '@designit.com', label: '@designit.com' }]
    this.messageCallback = this.messageCallback.bind(this)
    this.redirectCallback = this.redirectCallback.bind(this)
  }
  validateName(name) {
    if (name === '') {
      return false
    }
    return true
  }
  validatePassword(password) {
    const regex = /(?=^.{6,255}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*/
    return regex.test(password)
  }
  comparePassword(password, password2) {
    return password === password2
  }
  validateEmail(email) {
    const trimmedEmail = email.trim()
    return trimmedEmail.indexOf('@') < 0
  }
  validateLocation(location) {
    if (location === '') {
      return false
    }
    return true
  }
  validateRole(role) {
    if (role === '') {
      return false
    }
    return true
  }

  redirectCallback() {
    this.setState({ redirect: true })
  }
  messageCallback(data) {
    debugger
    if (data) {
      this.setState({ signUpSuccess: true, signUpError: false })
    } else {
      this.setState({ signUpError: true, signUpSuccess: true })
    }
  }

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onClickLocationHandler(selectedLocation) {
    this.setState({ selectedLocation })
  }
  onClickRoleHandler(selectedRole) {
    this.setState({ selectedRole })
  }
  onClickInterestsHandler(selectedInterest) {
    this.setState({ interests: selectedInterest })
  }
  onChangeEmailHandler(isWipro) {
    this.setState({ isWipro })
  }

  submitHandler(e) {
    e.preventDefault()
    const { firstName, lastName, emailUsername, isWipro, password, passwordConfirmation, selectedLocation, selectedRole } = this.state
    const email = emailUsername + isWipro.value
    let isValidatedFirstName = this.validateName(firstName)
    let isValidatedLastName = this.validateName(lastName)
    let isValidatedEmail = this.validateEmail(emailUsername)
    let isValidatedPassword = this.validatePassword(password)
    let isValidatedPasswordConfirm = this.comparePassword(password, passwordConfirmation)
    let isValidatedLocation = this.validateLocation(selectedLocation)
    let isValidatedRole = this.validateRole(selectedRole)
    if (!isValidatedFirstName || !isValidatedLastName || !isValidatedEmail || !isValidatedPassword || !isValidatedPasswordConfirm || !isValidatedLocation || !isValidatedRole) {
      this.setState({ firstNameError: !isValidatedFirstName, lastNameError: !isValidatedLastName, emailError: !isValidatedEmail, passwordError: !isValidatedPassword, passwordConfirmationError: !isValidatedPasswordConfirm, locationError: !isValidatedLocation, roleError: !isValidatedRole })
      return
    }
    signUp({ FirstName: firstName, lastName: lastName, Username: email, Password: password, LocationId: selectedLocation.value, RoleId: selectedRole.value }, this.messageCallback)
  }

  render() {
    const { name, emailUsername, password, passwordConfirmation, emailError, passwordError, passwordConfirmationError, firstNameError, lastNameError, locationError, roleError, signUpSuccess, redirect } = this.state
    return (
      <Fragment>
        <div className="grid-container">
          <div className="grid-y medium-grid-frame">
            <div className="grid-x grid-padding-x align-middle">
              <form className='cell medium-12' onSubmit={this.submitHandler.bind(this)}>
                <div className='row'>
                  <div className="small-12 columns">
                    <label>First Name:</label>
                    <input type="text" placeholder="Please Enter Your First Name" name='firstName' autoComplete='first name' value={name} onChange={this.onChangeHandler.bind(this)} />
                    {firstNameError && (
                      <span className='register-error'>Please type in a valid name.</span>
                    )}
                  </div>
                </div>
                <div className='row'>
                  <div className="small-12 columns">
                    <label>Last Name:</label>
                    <input type="text" placeholder="Please Enter Your Last Name" name='lastName' autoComplete='last name' value={name} onChange={this.onChangeHandler.bind(this)} />
                    {lastNameError && (
                      <span className='register-error'>Please type in a valid name.</span>
                    )}
                  </div>
                </div>
                <div className='row'>
                  <div className="small-12 columns">
                    <label>Email:</label>
                    <div className='grid-x grid-padding-x align-center'>
                      <input type="text" className="small-6" placeholder="Enter Your Email." autoComplete='username' name='emailUsername' value={emailUsername} onChange={this.onChangeHandler.bind(this)} />
                      <Select className="small-5"
                        defaultValue={[]}
                        name="emails"
                        options={this.emails}
                        onChange={this.onChangeEmailHandler.bind(this)}
                        isSearchable={false}
                      />
                    </div>
                    {emailError && (
                      <span className='register-error'>Please enter remove the '@' character from your input.</span>
                    )}
                  </div>
                </div>
                <div className='row'>
                  <div className="small-12 columns">
                    <label>Password:</label>
                    <input type="password" autoComplete="new-password" placeholder="Please Enter Your Password." name='password' value={password} onChange={this.onChangeHandler.bind(this)} />
                    {passwordError && (
                      <span className='register-error'>Your password must have one lower case letter, one upper case letter, one digit, and one special character.</span>
                    )}
                  </div>
                </div>
                <div className='row'>
                  <div className="small-12 columns">
                    <label>Confirm Password:</label>
                    <input type="password" autoComplete="new-password" placeholder="Please Confirm Your Password." name='passwordConfirmation' value={passwordConfirmation} onChange={this.onChangeHandler.bind(this)} />
                    {passwordConfirmationError && (
                      <span className='register-error'>Your passwords must match.</span>
                    )}
                  </div>
                </div>
                <div className='row'>
                  <div className="small-12 columns">
                    <label>Location:</label>
                    <Select
                      placeholder='Please select a location'
                      onChange={this.onClickLocationHandler.bind(this)}
                      options={this.locations}
                      isSearchable={false}
                      name='locations'
                    />
                    {locationError && (
                      <span className='register-error'>Please select a location.</span>
                    )}
                  </div>
                </div>
                <div className='row'>
                  <div className="small-12 columns">
                    <label>Role:</label>
                    <Select
                      placeholder='Please select a role'
                      onChange={this.onClickRoleHandler.bind(this)}
                      options={this.roles}
                      isSearchable={false}
                      name='roles'
                    />
                    {roleError && (
                      <span className='register-error'>Please select a role.</span>
                    )}
                  </div>
                </div>
                <div className='row'>
                  <div className="small-12 columns">
                    <label>What are your interests?</label>
                    <Select
                      defaultValue={[]}
                      isMulti
                      name="interests"
                      options={this.interests}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      components={makeAnimated()}
                      onChange={this.onClickInterestsHandler.bind(this)}
                      isSearchable={false}
                    />
                  </div>
                </div>
                <div className='row'>
                  <div className='grid-x grid-padding-x align-center'>
                    <input type="submit" className="button success align-center cell medium-6 align-middle" value="Submit" />
                  </div>
                </div>
                <div className='row'>
                  <div className='grid-x grid-padding-x align-center'>
                    <Link to='/login' >Already have an account?</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div >
        {signUpSuccess && (<MessageComponent message='SUCCESSFUL' callback={this.redirectCallback} />)}
        {redirect && (<Redirect to='/login' />)}
      </Fragment>
    )
  }
}