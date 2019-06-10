import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import Select from 'react-select'
import { editUser, getUser, getLocationList, getRolesList, getDisciplineList } from '../../../api'
import { MessageComponent } from '../../messageModule'
import { ImageUploaderComponent } from '../../userModule'
import { NavbarComponent } from '../../navbarModule'
import './editUserProfile.scss'
import { Container, Row, Col } from 'reactstrap';

export default class EditUserProfileComponent extends React.Component {

  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      selectedLocation: {},
      selectedRole: {},
      selectedDisciplines: {},
      disciplines: [],
      profilePicture: 'images/cover/profile-placeholder.png',
      locationError: false,
      roleError: false,
      editProfileSuccess: false,
      editProfileError: false,
      redirect: false,
      locations: [],
      roles: [],
      rolesFetchError: false,
      locationFetchError: false,
      disciplineFetchError: false,
      user: ''
    }
    this.messageCallback = this.messageCallback.bind(this)
    this.redirectCallback = this.redirectCallback.bind(this)
    this.setProfilePicture = this.setProfilePicture.bind(this)
    this.getLocationCallback = this.getLocationCallback.bind(this)
    this.getRolesCallback = this.getRolesCallback.bind(this)
    this.getUserCallback = this.getUserCallback.bind(this)
    this.getDisciplineCallback = this.getDisciplineCallback.bind(this)
  }

  componentDidMount() {
    getLocationList(this.getLocationCallback)
    getRolesList(this.getRolesCallback)
    getDisciplineList(this.getDisciplineCallback)
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
      this.setState({
        user: response.data, profilePicture: response.data.imageUrl
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
  getDisciplineCallback(response) {
    if (response.status === 200) {
      let disciplineArray = []
      response.data.forEach(instance => {
        disciplineArray.push({ value: instance.id, label: instance.name })
      })
      this.setState({ disciplines: disciplineArray })
    } else {
      const disciplineArray = [{ label: "Professional Development", value: 104 },
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
      this.setState({ disciplineFetchError: true, disciplines: disciplineArray })
    }
  }
  toggleLocationError() {
    this.setState({ locationFetchError: !this.state.locationFetchError })
  }
  toggleRolesError() {
    this.setState({ rolesFetchError: !this.state.rolesFetchError })
  }
  toggleDisciplineError() {
    this.setState({ disciplineFetchError: !this.state.disciplineFetchError })
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
  onClickDisciplinesHandler(selectedDisciplines) {
    this.setState({ selectedDisciplines })
  }
  setProfilePicture(picturePath) {
    this.setState({ profilePicture: picturePath })
  }
  getDisciplinePayload(disciplines) {
    const result = []
    disciplines.forEach(discipline => {
      result.push({ id: discipline.value })
    })
    return result
  }
  submitHandler(e) {
    e.preventDefault()
    const { firstName, lastName, selectedLocation, selectedRole, profilePicture, user, selectedDisciplines } = this.state
    let isValidatedFirstName = this.validateName(firstName)
    let isValidatedLastName = this.validateName(lastName)
    let isValidatedLocation = this.validateArray(selectedLocation)
    let isValidatedRole = this.validateArray(selectedRole)
    let isValidatedDisciplines = this.validateArray(selectedDisciplines)
    if (!isValidatedFirstName || !isValidatedLastName || !isValidatedLocation || !isValidatedRole || !isValidatedDisciplines) {
      this.setState({ firstNameError: !isValidatedFirstName, lastNameError: !isValidatedLastName, locationError: !isValidatedLocation, roleError: !isValidatedRole, interestsError: !isValidatedDisciplines })
      return
    }
    const disciplinesPayload = this.getDisciplinePayload(selectedDisciplines)
    editUser({
      firstName,
      lastName,
      locationId: selectedLocation.value,
      roleId: selectedRole.value,
      password: null,
      imageUrl: profilePicture,
      userInterests: disciplinesPayload,
      username: user.username
    }, user.id, this.messageCallback)

  }

  render() {
    const { name, firstNameError, lastNameError, locationError, roleError, redirect, locationFetchError, disciplineFetchError, rolesFetchError, profilePicture, editProfileSuccess, editProfileError, user } = this.state
    const baseUrl = "https://bettertogether.buildit.systems/";
    const profile = profilePicture !== "" ? `${baseUrl}${profilePicture}` : "";
    return (
      <Fragment>
        <form className="" onSubmit={this.submitHandler.bind(this)}>
        <Container>
          <Row>
            <Col>
              <h1>Edit Profile Settings</h1>
            </Col>

          </Row>
          <Row>
            <Col sm="12" md="3">

                <div className="">
                  <div className="">

                    <label>Profile picture:</label>
                    <ImageUploaderComponent setPicture={this.setProfilePicture} imgUrl={profile} />
                  </div>
                </div>

            </Col>
            <Col sm="12" md="9">
                <div className="">
                  <div className="">
                    <label>First Name:</label>
                    <input type="text" placeholder="Please Enter Your First Name" name='firstName' autoComplete='first name' value={name} onChange={this.onChangeHandler.bind(this)} />
                    {firstNameError && (
                      <span className="">Please type in a valid name.</span>
                    )}
                  </div>
                </div>
                <div className="">
                  <div className="">
                    <label>Last Name:</label>
                    <input type="text" placeholder="Please Enter Your Last Name" name='lastName' autoComplete='last name' value={name} onChange={this.onChangeHandler.bind(this)} />
                    {lastNameError && (
                      <span className="">Please type in a valid name.</span>
                    )}
                  </div>
                </div>
                <div className="">
                  <div className="">
                    <label>Location:</label>
                    <Select
                      placeholder='Please select a location'
                      onChange={this.onClickLocationHandler.bind(this)}
                      options={this.state.locations}
                      isSearchable={false}
                      name='locations'
                    />
                    {locationError && (
                      <span className="">Please select a location.</span>
                    )}
                  </div>
                </div>
                <div className="">
                  <div className="">
                    <label>Role:</label>
                    <Select
                      placeholder='Please select a role'
                      onChange={this.onClickRoleHandler.bind(this)}
                      options={this.state.roles}
                      isSearchable={false}
                      name='roles'
                    />
                    {roleError && (
                      <span className="">Please select a role.</span>
                    )}
                  </div>
                </div>
                <div className="">
                  <div className="">
                    <label>What are your interests?</label>
                    <Select
                      defaultValue={[]}
                      isMulti
                      name="interests"
                      options={this.state.disciplines}
                      className=""
                      classNamePrefix="select"
                      onChange={this.onClickDisciplinesHandler.bind(this)}
                      isSearchable={false}
                    />
                    {roleError && (
                      <span className="">Please select your interests.</span>
                    )}
                  </div>
                </div>
                <div className="">
                  <div className="">
                    <input type="submit" className="" value="Submit" />
                  </div>
                </div>

            </Col>
          </Row>
        </Container >
      </form>
        {editProfileSuccess && (<MessageComponent message='Your profile was successfully changed.' callback={this.redirectCallback} />)}
        {editProfileError && (<MessageComponent message='Your profile was unsuccesfully changed. Please Try again later.' callback={this.toggleEditError.bind(this)} />)}
        {locationFetchError && (<MessageComponent message='Locations service is down. Please try again later' callback={this.toggleLocationError.bind(this)} />)}
        {rolesFetchError && (<MessageComponent message='Roles service is down. Please try again later' callback={this.toggleRolesError.bind(this)} />)}
        {disciplineFetchError && (<MessageComponent message='Roles service is down. Please try again later' callback={this.toggleDisciplineError.bind(this)} />)}
        {redirect && (<Redirect to={`/user/${user.id}`} />)}
      </Fragment>
    )
  }
}
