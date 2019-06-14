import React from 'react'
import { default as Component } from './sort'
import { shallow } from 'enzyme'

describe('>>> Sort Component', () => {
  describe('Test onChange handler', () => {
    it('should fire handleChange on change', () => {
      const props = {
        handleSort: jest.fn()
      }
      const e = { target: { value: 1, name: 'hi' } }
      const wrapper = shallow(<Component {...props} />)
      wrapper.find('select').first().simulate('change', e)
      expect(props.handleSort).toBeCalled()

    })
  })

})

