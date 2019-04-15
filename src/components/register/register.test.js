import React from 'react'
import RegisterComponent from './register'
import { shallow } from 'enzyme'

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
    it('should return false to see if string is not an email', () => {
      const wrapper = shallow(<RegisterComponent />)
      expect(wrapper.instance().validateEmail('asdasd')).toEqual(false)
    })
    it('should return true to see if string is an email', () => {
      const wrapper = shallow(<RegisterComponent />)
      expect(wrapper.instance().validateEmail('asdasd@email.com')).toEqual(true)
    })
  })
})