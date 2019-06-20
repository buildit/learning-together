import React from 'react'
import { shallow } from 'enzyme'
import { default as Component } from './messageConfirm'

describe('>>> MessageConfirmComponent', () => {
  it('should fire onClickYesCallback on success button click', () => {
    const props = {
      yesCancel: jest.fn()
    }
    const wrapper = shallow(<Component {...props} />)
    wrapper.find('.success.button').simulate('click')
    expect(props.yesCancel).toBeCalled()
  })
  it('should fire onClickNoCallback on cancel button click', () => {
    const props = {
      noCancel: jest.fn()
    }
    const wrapper = shallow(<Component {...props} />)
    wrapper.find('.hollow.secondary').simulate('click')
    expect(props.noCancel).toBeCalled()
  })
})