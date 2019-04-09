import React from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated'

export default class RegisterComponent extends React.Component {

  constructor() {
    super()
    this.state = {
      name: '',
      emailUsername: '',
      isWipro: true,
      password: '',
      passwordConfirmation: '',
      selectedLocation: '',
      selectedRole: '',
      interests: [],
      nameError: false,
      emailError: false,
      passwordError: false,
      passwordConfirmationError: false,
      locationError: false,
      roleError: false
    }
    this.locations = [{ value: 'new york', label: 'New York' }, { value: 'denver', label: 'Denver' }, { value: 'dallas', label: 'Dallas' }, { value: 'london', label: 'London' }]
    this.roles = [{ value: 'fee', label: 'Front End Engineer' }, { value: 'pe', label: 'Platform Engineer' }, { value: 'ct', label: 'Creative Tech' }]
    this.interests = [{ value: 'fee', label: 'Front End Engineer' }, { value: 'pe', label: 'Platform Engineer' }, { value: 'ct', label: 'Creative Tech' }]
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
    const { name, emailUsername, isWipro, password, passwordConfirmation, selectedLocation, selectedRole, interests } = this.state
    let email = emailUsername + '@wipro.com'
    if (!isWipro) {
      email = emailUsername + '@designit.com'
    }
    else { }
    let isValidatedName = this.validateName(name)
    let isValidatedEmail = this.validateEmail(email)
    let isValidatedPassword = this.validatePassword(password)
    console.log(isValidatedPassword)
    let isValidatedPasswordConfirm = this.comparePassword(password, passwordConfirmation)
    let isValidatedLocation = this.validateLocation(selectedLocation)
    let isValidatedRole = this.validateRole(selectedRole)
    if (!isValidatedName || !isValidatedEmail || !isValidatedPassword || !isValidatedPasswordConfirm || !isValidatedLocation || !isValidatedRole) {
      this.setState({ nameError: !isValidatedName, emailError: !isValidatedEmail, passwordError: !isValidatedPassword, passwordConfirmationError: !isValidatedPasswordConfirm, locationError: !isValidatedLocation, roleError: !isValidatedRole })
    }
    console.log(isValidatedName, isValidatedEmail, isValidatedPassword, isValidatedPasswordConfirm)

    // api handler
    console.log(name, email, password, passwordConfirmation, selectedLocation.value, selectedRole.value, interests)
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
    const { name, emailUsername, isWipro, password, passwordConfirmation, selectedLocation, selectedRole, emailError, passwordError, passwordConfirmationError, nameError, locationError, roleError } = this.state
    return (
      <div className="grid-container">
        <div className="grid-y medium-grid-frame">
          <div className="grid-x grid-padding-x align-middle">
            <form className='cell medium-6' onSubmit={this.submitHandler.bind(this)}>
              <div className='row'>
                <div className="small-12 columns">
                  <label>Full Name:</label>
                  <input type="text" placeholder="Please Enter Your Name" name='name' value={name} onChange={this.onChangeHandler.bind(this)} />
                  {nameError && (
                    <div>Please type in a valid name.</div>
                  )}
                </div>
              </div>
              <div className='row'>
                <div className="small-12 columns">
                  <label>Email:</label>
                  <input type="text" placeholder="Please Enter Your Email." name='emailUsername' value={emailUsername} onChange={this.onChangeHandler.bind(this)} />
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
                  <input type="password" placeholder="Please Enter Your Password." name='password' value={password} onChange={this.onChangeHandler.bind(this)} />
                  {passwordError && (
                    <div>Your password must have one lower case letter, one upper case letter, one digit, and one special character.</div>
                  )}
                </div>
              </div>
              <div className='row'>
                <div className="small-12 columns">
                  <label>Confirm Password:</label>
                  <input type="password" placeholder="Please Confirm Your Password." name='passwordConfirmation' value={passwordConfirmation} onChange={this.onChangeHandler.bind(this)} />
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
                    value={selectedLocation}
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
                    value={selectedRole}
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
      </div >
    )
  }
}