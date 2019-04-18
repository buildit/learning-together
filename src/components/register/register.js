import React, { Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated'
import { signUp, getLocationList, getRolesList } from '../../api'
import { MessageComponent } from '../message'
import { ImageUploaderComponent } from '../imageUploader'
import { NavbarComponent } from '../navbar'
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
      profilePicture: '',
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      passwordError: false,
      passwordConfirmationError: false,
      locationError: false,
      roleError: false,
      isLoading: false,
      signUpSuccess: false,
      redirect: false,
      locations: [],
      roles: [],
      rolesFetchError: false,
      locationFetchError: false
    }
    this.locations = [{ value: '1', label: 'New York' }, { value: '2', label: 'Denver' }, { value: '3', label: 'Bangalore' },
    { value: '4', label: 'Dublin' }, { value: '5', label: 'Edinburgh' }, { value: '6', label: 'Gdansk' }, { value: '7', label: 'London' },
    { value: '8', label: 'Plano' }, { value: '9', label: 'Warsaw' }]
    this.interests = [{ value: 'fee', label: 'Front End Engineer' }, { value: 'pe', label: 'Platform Engineer' }, { value: 'ct', label: 'Creative Tech' }]
    this.emails = [{ value: '@wipro.com', label: '@wipro.com' }, { value: '@designit.com', label: '@designit.com' }]
    this.messageCallback = this.messageCallback.bind(this)
    this.redirectCallback = this.redirectCallback.bind(this)
    this.setProfilePicture = this.setProfilePicture.bind(this)
    this.getLocationCallback = this.getLocationCallback.bind(this)
    this.getRolesCallback = this.getRolesCallback.bind(this)
  }

  componentDidMount() {
    getLocationList(this.getLocationCallback)
    getRolesList(this.getRolesCallback)
  }

  getLocationCallback(response) {
    if (response.status === 200) {
      let locationsArray = []
      response.data.forEach(instance => {
        locationsArray.push({ value: instance.id, label: instance.name })
      })
      this.setState({ locations: locationsArray })
    } else {
      const locationArray = [{ label: "London", value: 2 },
      { label: "Brooklyn", value: 1 },
      { label: "Edinburgh", value: 3 },
      { label: "Dublin", value: 4 },
      { label: "Denver", value: 5 },
      { label: "Dallas", value: 6 }
      ]
      this.setState({ locationFetchError: true, locations: locationArray })
    }
  }
  getRolesCallback(response) {
    if (response.status === 200) {
      let rolesArray = []
      response.data.forEach(instance => {
        rolesArray.push({ value: instance.id, label: instance.name })
      })
      this.setState({ roles: rolesArray })
    } else {
      const rolesArray = [{ label: "Creative Technologist", value: 1 },
      { label: "Frontend", value: 2 },
      { label: "Backend", value: 3 },
      { label: "Fullstack", value: 4 },
      { label: "Design", value: 5 },
      { label: "Product", value: 6 },
      { label: "Delivery", value: 7 },
      { label: "Leadership", value: 8 }
      ]
      this.setState({ rolesFetchError: true, roles: rolesArray })
    }
  }
  toggleLocationError() {
    this.setState({ locationFetchError: !this.state.locationFetchError })
  }
  toggleRolesError() {
    this.setState({ rolesFetchError: !this.state.rolesFetchError })
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
  toggleError() {
    this.setState({ signUpError: !this.state.signUpError })
  }
  messageCallback(data) {
    if (data.status === 200) {
      this.setState({ signUpSuccess: true, signUpError: false })
    } else {
      this.setState({ signUpError: true, signUpSuccess: false })
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
  setProfilePicture(picturePath) {
    this.setState({ profilePicture: picturePath })
  }

  submitHandler(e) {
    e.preventDefault()
    const { firstName, lastName, emailUsername, isWipro, password, passwordConfirmation, selectedLocation, selectedRole, profilePicture } = this.state
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
    signUp({ FirstName: firstName, lastName: lastName, Username: email, Password: password, LocationId: selectedLocation.value, RoleId: selectedRole.value, ImageUrl: profilePicture }, this.messageCallback)
  }

  render() {
    const { name, emailUsername, password, passwordConfirmation, emailError, passwordError, passwordConfirmationError, firstNameError, lastNameError, locationError, roleError, signUpSuccess, signUpError, redirect, locationFetchError, rolesFetchError } = this.state

    return (
      <Fragment>
        <NavbarComponent isUser={this.props.isUser} />
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
                      options={this.state.locations}
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
                      options={this.state.roles}
                      isSearchable={false}
                      name='roles'
                    />
                    {roleError && (
                      <span className='register-error'>Please select a role.</span>
                    )}
                  </div>
                </div>
                {/* <div className='row'>
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
                </div> */}
                <div className='row'>
                  <div className="small-12 columns">
                    <label>Profile picture:</label>
                    <ImageUploaderComponent setPicture={this.setProfilePicture} />
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
        {signUpSuccess && (<MessageComponent message='Your account was successfully created.' callback={this.redirectCallback} />)}
        {signUpError && (<MessageComponent message='Your account was unsuccesfully created. Try again later.' callback={this.toggleError.bind(this)} />)}
        {locationFetchError && (<MessageComponent message='Locations service is down. Please try again later' callback={this.toggleLocationError.bind(this)} />)}
        {rolesFetchError && (<MessageComponent message='Roles service is down. Please try again later' callback={this.toggleRolesError.bind(this)} />)}
        {redirect && (<Redirect to='/login' />)}
      </Fragment>
    )
  }
}