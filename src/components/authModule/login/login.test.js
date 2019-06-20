import React from 'react'
import { shallow } from 'enzyme'
import { default as Component } from './login'

jest.mock('../../../services/msalUtils')

describe('>>> LoginComponent tests', () => {
  it('should call login function onclick', () => {
    const spy = jest.spyOn(Component.prototype, 'onClickLoginHandler')
    const wrapper = shallow(<Component />)
    wrapper.find('button').simulate('click')
    expect(spy).toBeCalled()
  })
})