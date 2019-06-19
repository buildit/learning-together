import React from 'react'
import { default as Component } from './workshopList'
import { shallow } from 'enzyme'

jest.mock('../../../api')

describe('>>> WorkshopList Component', () => {
  describe('Workshop List Callback', () => {
    it('should setState based on input and call getWorkshopListPast', () => {
      const props = { computedMatch: { params: { id: 1, title: 'hi' } } }
      const response = { status: 200, data: [] }
      const wrapper = shallow(<Component {...props} />)
      wrapper.instance().getWorkshopListCallback(response)
      expect(wrapper.state('title')).toEqual('hi')
    })
    it('should throw error if status is not 200', () => {
      const props = { computedMatch: { params: { id: 1, title: 'hi' } } }
      const response = { status: 400, data: [] }
      const wrapper = shallow(<Component {...props} />)
      wrapper.instance().getWorkshopListCallback(response)
      expect(wrapper.state('error')).toBeTruthy()
    })
  })
  describe('Workshop List Past Callback', () => {
    it('should setState if status is 200', () => {
      const props = { computedMatch: { params: { id: 1, title: 'hi' } } }
      const response = { status: 200, data: [{ workshop: 1 }] }
      const wrapper = shallow(<Component {...props} />)
      wrapper.instance().getWorkshopListPastCallback(response)
      expect(wrapper.state('workshops').length).toEqual(1)
    })
  })
})