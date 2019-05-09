import React from 'react'
import RegisterComponent from './register'
import { shallow } from 'enzyme'
import { signUp } from '../../api'

jest.mock('../../api')

describe('register component', () => {
  describe('validation checks', () => {
    it('should validate return false if empty string', () => {
      const wrapper = shallow(<RegisterComponent />)
      expect(wrapper.instance().validateName('')).toEqual(false)
      expect(wrapper.instance().validateName('asdasd')).toEqual(true)
    })
    it('should validate return true if empty string is non-empty', () => {
      const wrapper = shallow(<RegisterComponent />)
      expect(wrapper.instance().validateName('asdasd')).toEqual(true)
    })
    it('should return false to see if string is has an @', () => {
      const wrapper = shallow(<RegisterComponent />)
      expect(wrapper.instance().validateEmail('asdasd@')).toEqual(false)
    })
    it('should return true to see if string contains no @', () => {
      const wrapper = shallow(<RegisterComponent />)
      expect(wrapper.instance().validateEmail('asdasd')).toEqual(true)
    })
  })
  describe('submit handler', () => {
    it('should trigger signUp api function if inputs are valid', () => {
      const wrapper = shallow(<RegisterComponent />)
      const e = { preventDefault: jest.fn() }
      wrapper.setState({ 'firstName': 'Jimmy', 'lastName': 'M', 'isWipro': 'wipro.com', 'emailUsername': 'super.man', 'password': 'Password#1', 'passwordConfirmation': 'Password#1', 'selectedLocation': { value: 1, label: 'blops' }, 'selectedRole': { value: 1, label: 'blooper' }, 'profilePicture': '' })
      wrapper.instance().submitHandler(e)
      expect(signUp).toBeCalled()
    })
  })
})