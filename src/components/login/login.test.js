import React from 'react'
import LoginComponent from './login'
import { shallow } from 'enzyme'
import { signIn } from '../../api'

jest.mock('../../api')
describe('Login Component', () => {
  describe('input handlers', () => {
    it('should change state of email', () => {
      const wrapper = shallow(<LoginComponent />)
      const input = { target: { name: 'email', value: 'email@email.com' } }
      wrapper.instance().inputHandler(input)
      expect(wrapper.state('email')).toEqual(input.target.value)
    })
    it('should change state of password', () => {
      const wrapper = shallow(<LoginComponent />)
      const input = { target: { name: 'password', value: 'Password#1' } }
      wrapper.instance().inputHandler(input)
      expect(wrapper.state('password')).toEqual(input.target.value)
    })
  })
  describe('submit handler', () => {
    it('should fire signIn api call', () => {
      const wrapper = shallow(<LoginComponent />)
      const e = { preventDefault: jest.fn() }
      wrapper.setState({ email: 'email@email.com', password: 'Password#1' })
      wrapper.instance().submitHandler(e)
      expect(signIn).toBeCalled()
    })
  })
})