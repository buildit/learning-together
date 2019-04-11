import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated'
import { signUp } from '../../api'

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
    }
    this.locations = [{ value: '1', label: 'New York' }, { value: '2', label: 'Denver' }, { value: '3', label: 'Dallas' }, { value: '4', label: 'London' }]
    this.roles = [{ value: '1', label: 'Front End Engineer' }, { value: '2', label: 'Platform Engineer' }, { value: '3', label: 'Creative Tech' }]
    this.interests = [{ value: 'fee', label: 'Front End Engineer' }, { value: 'pe', label: 'Platform Engineer' }, { value: 'ct', label: 'Creative Tech' }]
    this.submitCallback = this.submitCallback.bind(this)
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
    const regex = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(email)
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

  submitHandler(e) {
    e.preventDefault()
    const { firstName, lastName, emailUsername, isWipro, password, passwordConfirmation, selectedLocation, selectedRole } = this.state
    let email = emailUsername + '@wipro.com'
    if (!isWipro) {
      email = emailUsername + '@designit.com'
    }
    else { }
    let isValidatedFirstName = this.validateName(firstName)
    let isValidatedLastName = this.validateName(lastName)
    let isValidatedEmail = this.validateEmail(email)
    let isValidatedPassword = this.validatePassword(password)
    let isValidatedPasswordConfirm = this.comparePassword(password, passwordConfirmation)
    let isValidatedLocation = this.validateLocation(selectedLocation)
    let isValidatedRole = this.validateRole(selectedRole)
    if (!isValidatedFirstName || !isValidatedLastName || !isValidatedEmail || !isValidatedPassword || !isValidatedPasswordConfirm || !isValidatedLocation || !isValidatedRole) {
      this.setState({ firstNameError: !isValidatedFirstName, lastNameError: !isValidatedLastName, emailError: !isValidatedEmail, passwordError: !isValidatedPassword, passwordConfirmationError: !isValidatedPasswordConfirm, locationError: !isValidatedLocation, roleError: !isValidatedRole })
      return
    }
    signUp({ FirstName: firstName, lastName: lastName, Username: email, Password: password, LocationId: selectedLocation.value, RoleId: selectedRole.value }, this.submitCallback)
  }
  submitCallback() {
    this.setState({ signUpSuccess: true })
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


  render() {
    const { name, emailUsername, isWipro, password, passwordConfirmation, emailError, passwordError, passwordConfirmationError, firstNameError, lastNameError, locationError, roleError, signUpSuccess } = this.state
    return (
      <div className="grid-container">
        <div className="grid-y medium-grid-frame">
          <div className="grid-x grid-padding-x align-middle">
            <form className='cell medium-6' onSubmit={this.submitHandler.bind(this)}>
              <div className='row'>
                <div className="small-12 columns">
                  <label>First Name:</label>
                  <input type="text" placeholder="Please Enter Your First Name" name='firstName' value={name} onChange={this.onChangeHandler.bind(this)} />
                  {firstNameError && (
                    <div>Please type in a valid name.</div>
                  )}
                </div>
              </div>
              <div className='row'>
                <div className="small-12 columns">
                  <label>Last Name:</label>
                  <input type="text" placeholder="Please Enter Your Last Name" name='lastName' value={name} onChange={this.onChangeHandler.bind(this)} />
                  {lastNameError && (
                    <div>Please type in a valid name.</div>
                  )}
                </div>
              </div>
              <div className='row'>
                <div className="small-12 columns">
                  <label>Email:</label>
                  <input type="text" placeholder="Please Enter Your Email." autoComplete="username" name='emailUsername' value={emailUsername} onChange={this.onChangeHandler.bind(this)} />
                  <input type="radio" value="wipro" checked={isWipro} onChange={this.onChangeEmailHandler.bind(this, true)} />
                  <label>@wipro.com</label>
                  <input type="radio" value="designit" checked={!isWipro} onChange={this.onChangeEmailHandler.bind(this, false)} />
                  <label>@designit.com</label>
                  {emailError && (
                    <div>Please enter a valid Wipro or Designit Email.</div>
                  )}
                </div>
              </div>
              <div className='row'>
                <div className="small-12 columns">
                  <label>Password:</label>
                  <input type="password" autoComplete="new-password" placeholder="Please Enter Your Password." name='password' value={password} onChange={this.onChangeHandler.bind(this)} />
                  {passwordError && (
                    <div>Your password must have one lower case letter, one upper case letter, one digit, and one special character.</div>
                  )}
                </div>
              </div>
              <div className='row'>
                <div className="small-12 columns">
                  <label>Confirm Password:</label>
                  <input type="password" autoComplete="new-password" placeholder="Please Confirm Your Password." name='passwordConfirmation' value={passwordConfirmation} onChange={this.onChangeHandler.bind(this)} />
                  {passwordConfirmationError && (
                    <div>Your passwords must match.</div>
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
                    <div>Please select a location.</div>
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
                    <div>Please select a role.</div>
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
            </form>
            <div className='cell medium-6'>
              <Link to='/login' ><img src='http://placekitten.com/400/500' alt='login' /></Link>
            </div>
          </div>
        </div>
        {signUpSuccess && (<Redirect to='/login' />)}
      </div >
    )
  }
}