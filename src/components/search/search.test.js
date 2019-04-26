import React from 'react'
import { default as Component } from './search'
import { shallow } from 'enzyme'
import { getSearchResults } from '../../api'

jest.mock('../../api')
describe('Search Component', () => {
  describe('search handler', () => {
    it('should call getSearchResults if input is not blank', () => {
      const wrapper = shallow(<Component />)
      const e = { preventDefault: jest.fn(), target: { value: 'hi' } }
      wrapper.instance().searchHandler(e)
      expect(getSearchResults).toBeCalled()
    })
  })

  describe('sortResults function', () => {
    it('should set state based on categories', () => {
      const wrapper = shallow(<Component />)
      const response = { categoryResults: [{ value: 'blops1' }], locationResults: [{ value: 'blops2' }], userResults: [{ value: 'blops3' }], workshopResults: [{ value: 'blops4' }] }
      wrapper.instance().sortResultsData(response)
      expect(wrapper.state.categoryResults).toEqual(response.categoryResults.value)
      expect(wrapper.state.categoryResults).toEqual(response.locationResults.value)
      expect(wrapper.state.categoryResults).toEqual(response.userResults.value)
      expect(wrapper.state.categoryResults).toEqual(response.workshopResults.value)
    })
  })

  describe('searchCallback function', () => {
    it('should set state based on response status', () => {
      const wrapper = shallow(<Component />)
      const response = { status: 200, data: { categoryResults: [{ value: 'blops1' }], locationResults: [{ value: 'blops2' }], userResults: [{ value: 'blops3' }], workshopResults: [{ value: 'blops4' }] } }
      wrapper.instance().searchCallback(response)
      expect(wrapper.state.categoryResults).toEqual(response.data.categoryResults.value)
      expect(wrapper.state.categoryResults).toEqual(response.data.locationResults.value)
      expect(wrapper.state.categoryResults).toEqual(response.data.userResults.value)
      expect(wrapper.state.categoryResults).toEqual(response.data.workshopResults.value)
    })
  })
})