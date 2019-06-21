import React from 'react'
import { shallow } from 'enzyme'
import { default as Component } from './landing'

jest.mock('../../../api')

describe('>>> Landing Component', () => {
  describe('getUserCallback', () => {
    it('should set user state to response object', () => {
      const wrapper = shallow(<Component />)
      const response = { data: { user: 'hi' }, status: 200 }
      wrapper.instance().getUserCallback(response)
      expect(wrapper.state('user')).toEqual(response.data)
    })
  })

  describe('getWorkshopListDateCallback', () => {
    it('should set state to workshops based on response', () => {
      const wrapper = shallow(<Component />)
      const response = { data: [{ start: 2 }, { start: 3 }], status: 200 }
      wrapper.instance().getWorkshopListDateCallback(response)
      expect(wrapper.state('workshops')).toEqual(response.data)
    })
  })

  describe('messageCallback', () => {
    it('should message state to null', () => {
      const wrapper = shallow(<Component />)
      wrapper.instance().messageCallback()
      expect(wrapper.state('error')).toEqual(null)
    })
  })

  describe('sortByDate', () => {
    it('should return sorted array in ascending order', () => {
      const wrapper = shallow(<Component />)
      const sortedArray = [{ start: 1 }, { start: 2 }, { start: 3 }]
      const array = [{ start: 3 }, { start: 2 }, { start: 1 }]
      expect(wrapper.instance().sortByDate(array)).toEqual(sortedArray)
    })
  })

})