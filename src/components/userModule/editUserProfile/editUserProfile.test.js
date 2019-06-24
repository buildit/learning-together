import React from 'react'
import { default as Component } from './editUserProfile'
import { shallow } from 'enzyme'
import { editUser } from '../../../api'

jest.mock('../../../api')

describe('>>> EditUserProfile Component', () => {
  let props
  beforeEach(() => {
    props = { computedMatch: { params: { id: 1 } } }
  })
  describe('validation checks', () => {
    it('should validate return false if empty string', () => {
      const wrapper = shallow(<Component {...props} />)
      expect(wrapper.instance().validateName('')).toEqual(false)
      expect(wrapper.instance().validateName('asdasd')).toEqual(true)
    })
    it('should validate return true if empty string is non-empty', () => {
      const wrapper = shallow(<Component {...props} />)
      expect(wrapper.instance().validateName('asdasd')).toEqual(true)
    })

  })
  describe('submit handler', () => {
    it('should trigger editUser api call if values are valid', () => {
      const wrapper = shallow(<Component {...props} />)
      const e = { preventDefault: jest.fn() }
      wrapper.setState({ 'firstName': 'Jimmy', 'lastName': 'M', 'selectedLocation': { id: 1 }, 'selectedRole': { id: 2 }, 'password': null, 'imageUrl': '/blops', 'selectedInterests': [{ value: 1, label: 'blops' }], 'username': 'fuzzy.bear@wipro.com' })
      wrapper.instance().submitHandler(e)
      expect(editUser).toBeCalled()
    })
  })

  describe('getUserCallback', () => {
    it('should set state profile picture and user', () => {
      const wrapper = shallow(<Component {...props} />)
      const response = {
        data: {
          imageUrl: '/blop',
          location: { id: 1, name: 'Brooklyn' },
          role: { id: 1, name: 'Frontend' }
        },
        status: 200
      }
      wrapper.instance().getUserCallback(response)
      expect(wrapper.state('user')).toEqual(response.data)
      expect(wrapper.state('profilePicture')).toEqual('/blop')
    })

  })
  describe('getLocationCallback', () => {
    const myProps = { computedMatch: { params: { id: 1 } } }
    const wrapper = shallow(<Component {...myProps} />)
    const response = { data: [{ id: 1, name: 'user1' }, { id: 2, name: 'user2' }], status: 200 }
    wrapper.instance().getLocationCallback(response)
    expect(wrapper.state('locations')).toEqual([{ value: 1, label: 'user1' }, { value: 2, label: 'user2' }])
  })
  describe('getRolesCallback', () => {
    it('should set Roles state based on response', () => {
      const wrapper = shallow(<Component {...props} />)
      const response = { data: [{ id: 1, name: 'bob' }, { id: 2, name: 'bobette' }], status: 200 }
      wrapper.instance().getRolesCallback(response)
      expect(wrapper.state('roles')).toEqual([{ value: 1, label: 'bob' }, { value: 2, label: 'bobette' }])
    })
  })
  describe('getInterestsCallback', () => {
    const myProps = { computedMatch: { params: { id: 1 } } }
    const wrapper = shallow(<Component {...myProps} />)
    const response = { data: [{ id: 1, name: 'bob' }, { id: 2, name: 'bobette' }], status: 200 }
    wrapper.instance().getInterestsCallback(response)
    expect(wrapper.state('interests')).toEqual([{ value: 1, label: 'bob' }, { value: 2, label: 'bobette' }])

  })
  describe('toggleLocationError', () => {
    it('should trigger toggleLocationError to opposite value', () => {
      const wrapper = shallow(<Component {...props} />)
      wrapper.instance().toggleLocationError()
      expect(wrapper.state('locationFetchError')).toEqual(true)
      wrapper.instance().toggleLocationError()
      expect(wrapper.state('locationFetchError')).toEqual(false)
    })
  })
  describe('toggleRolesError', () => {
    it('should change RolesFetchError to opposite value', () => {
      const wrapper = shallow(<Component {...props} />)
      wrapper.instance().toggleRolesError()
      expect(wrapper.state('rolesFetchError')).toEqual(true)
      wrapper.instance().toggleRolesError()
      expect(wrapper.state('rolesFetchError')).toEqual(false)
    })
  })

  describe('toggleInterestsError', () => {
    it('should change interestsFetchError to opposite value', () => {
      const wrapper = shallow(<Component {...props} />)
      wrapper.instance().toggleInterestsError()
      expect(wrapper.state('interestsFetchError')).toEqual(true)
      wrapper.instance().toggleInterestsError()
      expect(wrapper.state('interestsFetchError')).toEqual(false)
    })
  })
  describe('toggleEditError', () => {
    it('should change editProfileError to opposite vaue', () => {
      const wrapper = shallow(<Component {...props} />)
      wrapper.instance().toggleEditError()
      expect(wrapper.state('editProfileError')).toEqual(true)
      wrapper.instance().toggleEditError()
      expect(wrapper.state('editProfileError')).toEqual(false)
    })
  })
  describe('validateName', () => {
    it('should return false if input is blank', () => {
      const wrapper = shallow(<Component {...props} />)
      expect(wrapper.instance().validateName('')).toEqual(false)
      expect(wrapper.instance().validateName('hi')).toEqual(true)
    })
  })
  describe('validateArray', () => {
    it('should return false if array is empty, otherwise return true', () => {
      const wrapper = shallow(<Component {...props} />)
      expect(wrapper.instance().validateArray([])).toEqual(false)
      expect(wrapper.instance().validateArray([{ id: 1 }])).toEqual(true)
    })
  })

  describe('redirectCallback', () => {
    it('should change redirect state to true', () => {
      const wrapper = shallow(<Component {...props} />)
      wrapper.instance().redirectCallback()
      expect(wrapper.state('redirect')).toEqual(true)
    })
  })

  describe('messageCallback', () => {
    it('should set editProfileSucess to true and editProfileError to false if status is 200', () => {
      const wrapper = shallow(<Component {...props} />)
      const response = { status: 200 }
      wrapper.instance().messageCallback(response)
      expect(wrapper.state('editProfileSuccess')).toEqual(true)
      expect(wrapper.state('editProfileError')).toEqual(false)
    })
    it('should set editProfileSucess to false and editProfileError to true if status is not 200', () => {
      const wrapper = shallow(<Component {...props} />)
      const response = { status: 100 }
      wrapper.instance().messageCallback(response)
      expect(wrapper.state('editProfileSuccess')).toEqual(false)
      expect(wrapper.state('editProfileError')).toEqual(true)
    })
  })

  describe('onChangeHandler', () => {
    it('should change state based on target name and input', () => {
      const wrapper = shallow(<Component {...props} />)
      let e = { target: { name: 'firstName', value: 'hii' } }
      wrapper.instance().onChangeHandler(e)
      expect(wrapper.state('firstName')).toEqual('hii')
      e = { target: { name: 'lastName', value: 'blops' } }
      wrapper.instance().onChangeHandler(e)
      expect(wrapper.state('lastName')).toEqual('blops')
    })
  })
  describe('onClickLocationHandler', () => {
    it('should set selectedLocation state to input', () => {
      const wrapper = shallow(<Component {...props} />)
      wrapper.instance().onClickLocationHandler('turkey')
      expect(wrapper.state('selectedLocation')).toEqual('turkey')
    })
  })
  describe('onClickRoleHandler', () => {
    it('should set selectedRole state to input', () => {
      const wrapper = shallow(<Component {...props} />)
      wrapper.instance().onClickRoleHandler('turkey')
      expect(wrapper.state('selectedRole')).toEqual('turkey')
    })
  })
  describe('onClickInterestssHandler', () => {
    it('should set selectedInterests state to input', () => {
      const wrapper = shallow(<Component {...props} />)
      wrapper.instance().onClickInterestsHandler('turkey')
      expect(wrapper.state('selectedInterests')).toEqual('turkey')
    })
  })
  describe('setProfilePicture', () => {
    it('should set profilePicture state based on input', () => {
      const wrapper = shallow(<Component {...props} />)
      wrapper.instance().setProfilePicture('/blop')
      expect(wrapper.state('profilePicture')).toEqual('/blop')
    })
  })
  describe('getInterestsPayload', () => {
    it('should return array of mapped interests values to id', () => {
      const wrapper = shallow(<Component {...props} />)
      expect(wrapper.instance().getInterestsPayload([{ value: 1 }, { value: 2 }, { value: 3 }])).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }])
    })
  })
})