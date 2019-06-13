import React from 'react'
import { shallow } from 'enzyme'
import { default as Component } from './message'

describe('>>> MessageConfirmComponent', () => {
  it('should fire callback on button click', () => {
    const props = {
      callback: jest.fn()
    }
    const wrapper = shallow(<Component {...props} />)
    wrapper.find('.success.button').simulate('click')
    expect(props.callback).toBeCalled()
  })
})