import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import Select from 'react-select'
import { editUser, getUser, getLocationList, getRolesList, getInterestsList } from '../../../api'
import { MessageComponent } from '../../messageModule'
import { ImageUploaderComponent } from '../../userModule'
import { NavbarComponent } from '../../navbarModule'
import './editUserProfile.scss'

export default class EditUserProfileComponent extends React.Component {

  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      selectedLocation: {},
      selectedRole: {},
      selectedInterests: {},
      interests: [],
      profilePicture: 'images/cover/profile-placeholder.png',
      firstNameError: false,
      lastNameError: false,
      interestsError: false,
      locationError: false,
      roleError: false,
      editProfileSuccess: false,
      editProfileError: false,
      redirect: false,
      locations: [],
      roles: [],
      rolesFetchError: false,
      locationFetchError: false,
      interestsFetchError: false,
      user: ''
    }
    this.messageCallback = this.messageCallback.bind(this)
    this.redirectCallback = this.redirectCallback.bind(this)
    this.setProfilePicture = this.setProfilePicture.bind(this)
    this.getLocationCallback = this.getLocationCallback.bind(this)
    this.getRolesCallback = this.getRolesCallback.bind(this)
    this.getUserCallback = this.getUserCallback.bind(this)
    this.getInterestsCallback = this.getInterestsCallback.bind(this)
  }

  componentDidMount() {
    getLocationList(this.getLocationCallback)
    getRolesList(this.getRolesCallback)
    getInterestsList(this.getInterestsCallback)
    getUser(this.props.computedMatch.params.id, this.getUserCallback)
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.computedMatch.params.id !== prevProps.computedMatch.params.id
    ) {
      getUser(this.props.computedMatch.params.id, this.getUserCallback)
    }
  }
  getUserCallback(response) {
    if (response.status === 200) {
      const { firstName, lastName, location, role } = response.data
      this.setState({
        user: response.data,
        profilePicture: response.data.imageUrl,
        firstName,
        lastName,
        selectedLocation: location,
        selectedRole: role
      })
    }
    else {
      console.log(response)
    }
  }
  getLocationCallback(response) {
    if (response.status === 200) {
      let locationsArray = []
      response.data.forEach(instance => {
        locationsArray.push({ value: instance.id, label: instance.name })
      })
      this.setState({ locations: locationsArray })

    } else {
      const locationArray = [{ value: 2, label: "London" }, { value: 1, label: "Brooklyn" }, { value: 3, label: "Edinburgh" }, { value: 4, label: "Dublin" }, { value: 5, label: "Denver" }, { value: 6, label: "Dallas" }]
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
  getInterestsCallback(response) {
    if (response.status === 200) {
      let interestsArray = []
      response.data.forEach(instance => {
        interestsArray.push({ value: instance.id, label: instance.name })
      })
      this.setState({ interests: interestsArray })
    } else {
      const interestsArray = [{ label: "Professional Development", value: 104 },
      { label: "Emotional Intelligence", value: 105 },
      { label: "Teamwork", value: 106 },
      { label: "Leadership", value: 107 },
      { label: "Design", value: 108 },
      { label: "Analytics", value: 109 },
      { label: "Culture", value: 110 },
      { label: "Agile / Lean", value: 111 },
      { label: "Artificial Intelligence", value: 112 },
      { label: "Technology", value: 113 },
      ]
      this.setState({ interestsFetchError: true, interests: interestsArray })
    }
  }
  toggleLocationError() {
    this.setState({ locationFetchError: !this.state.locationFetchError })
  }
  toggleRolesError() {
    this.setState({ rolesFetchError: !this.state.rolesFetchError })
  }
  toggleInterestsError() {
    this.setState({ interestsFetchError: !this.state.interestsFetchError })
  }
  toggleEditError() {
    this.setState({ editProfileError: !this.state.editProfileError, })
  }
  validateName(name) {
    if (name === '') {
      return false
    }
    return true
  }
  validateArray(array) {
    if (Object.keys(array).length === 0) {
      return false
    }
    return true
  }

  redirectCallback() {
    this.setState({ redirect: true })
  }

  messageCallback(data) {
    if (data.status === 200) {
      this.setState({ editProfileSuccess: true, editProfileError: false })
    } else {
      this.setState({ editProfileError: true, editProfileSuccess: false })
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
  onClickInterestsHandler(selectedInterests) {
    this.setState({ selectedInterests })
  }
  setProfilePicture(picturePath) {
    this.setState({ profilePicture: picturePath })
  }
  getInterestsPayload(interests) {
    const result = []
    interests.forEach(interest => {
      result.push({ id: interest.value })
    })
    return result
  }
  submitHandler(e) {
    e.preventDefault()
    const { firstName, lastName, selectedLocation, selectedRole, profilePicture, user, selectedInterests } = this.state
    let isValidatedFirstName = this.validateName(firstName)
    let isValidatedLastName = this.validateName(lastName)
    let isValidatedLocation = this.validateArray(selectedLocation)
    let isValidatedRole = this.validateArray(selectedRole)
    let isValidatedInterests = this.validateArray(selectedInterests)
    if (!isValidatedFirstName || !isValidatedLastName || !isValidatedLocation || !isValidatedRole || !isValidatedInterests) {
      this.setState({ firstNameError: !isValidatedFirstName, lastNameError: !isValidatedLastName, locationError: !isValidatedLocation, roleError: !isValidatedRole, interestsError: !isValidatedInterests })
      return
    }
    const interestsPayload = this.getInterestsPayload(selectedInterests)
    editUser({
      firstName,
      lastName,
      locationId: selectedLocation.value,
      roleId: selectedRole.value,
      password: null,
      imageUrl: profilePicture,
      userInterests: interestsPayload,
      username: user.username
    }, user.id, this.messageCallback)

  }

  render() {
    const { firstName, lastName, firstNameError, selectedLocation, selectedRole, lastNameError, locationError, roleError, interestsError, redirect, locationFetchError, interestsFetchError, rolesFetchError, profilePicture, editProfileSuccess, editProfileError, user } = this.state
    const baseUrl = "https://bettertogether.buildit.systems/";
    const profile = profilePicture !== "" ? `${baseUrl}${profilePicture}` : "";
    return (
      <Fragment>
        <NavbarComponent />
        <div className="grid-container first-container">
          <div className="grid-y medium-grid-frame">
            <div className="grid-x grid-padding-x align-middle">
              <form className='cell medium-12' onSubmit={this.submitHandler.bind(this)}>
                <div className='row'>
                  <div className="small-12 columns">
                    <h2>Edit Profile Settings</h2>
                    <label>Profile picture:</label>
                    <ImageUploaderComponent setPicture={this.setProfilePicture} imgUrl={profile} />
                  </div>
                </div>
                <div className='row'>
                  <div className="small-12 columns">
                    <label>First Name:</label>
                    <input type="text" placeholder="Please Enter Your First Name" name='firstName' autoComplete='first name' value={firstName} onChange={this.onChangeHandler.bind(this)} />
                    {firstNameError && (
                      <span className='edit-error'>Please type in a valid name.</span>
                    )}
                  </div>
                </div>
                <div className='row'>
                  <div className="small-12 columns">
                    <label>Last Name:</label>
                    <input type="text" placeholder="Please Enter Your Last Name" name='lastName' autoComplete='last name' value={lastName} onChange={this.onChangeHandler.bind(this)} />
                    {lastNameError && (
                      <span className='edit-error'>Please type in a valid name.</span>
                    )}
                  </div>
                </div>
                <div className='row'>
                  <div className="small-12 columns">
                    <label>Location:</label>
                    <Select
                      placeholder={selectedLocation.name}
                      onChange={this.onClickLocationHandler.bind(this)}
                      options={this.state.locations}
                      isSearchable={false}
                      name='locations'
                    />
                    {locationError && (
                      <span className='edit-error'>Please select a location.</span>
                    )}
                  </div>
                </div>
                <div className='row'>
                  <div className="small-12 columns">
                    <label>Role:</label>
                    <Select
                      placeholder={selectedRole.name}
                      onChange={this.onClickRoleHandler.bind(this)}
                      options={this.state.roles}
                      isSearchable={false}
                      name='role'
                    />
                    {roleError && (
                      <span className='edit-error'>Please select a role.</span>
                    )}
                  </div>
                </div>
                <div className='row'>
                  <div className="small-12 columns">
                    <label>What are your interests?</label>
                    <Select
                      defaultValue='Please select your interests'
                      isMulti
                      name="interests"
                      options={this.state.interests}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={this.onClickInterestsHandler.bind(this)}
                      isSearchable={false}
                    />
                    {interestsError && (
                      <span className='edit-error'>Please select your interests.</span>
                    )}
                  </div>
                </div>
                <div className='row'>
                  <div className='grid-x grid-padding-x align-center'>
                    <input type="submit" className="button success align-center cell medium-6 align-middle" value="Submit" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div >
        {editProfileSuccess && (<MessageComponent message='Your profile was successfully changed.' callback={this.redirectCallback} />)}
        {editProfileError && (<MessageComponent message='Your profile was unsuccesfully changed. Please Try again later.' callback={this.toggleEditError.bind(this)} />)}
        {locationFetchError && (<MessageComponent message='Locations service is down. Please try again later' callback={this.toggleLocationError.bind(this)} />)}
        {rolesFetchError && (<MessageComponent message='Roles service is down. Please try again later' callback={this.toggleRolesError.bind(this)} />)}
        {interestsFetchError && (<MessageComponent message='Roles service is down. Please try again later' callback={this.toggleInterestsError.bind(this)} />)}
        {redirect && (<Redirect to={`/user/${user.id}`} />)}
      </Fragment>
    )
  }
}