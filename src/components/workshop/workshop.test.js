import React from 'react'
import { WorkshopComponent } from './workshop'
import { shallow } from 'enzyme'

describe('WorkshopComponent', () => {
  const wrapper = shallow(<WorkshopComponent />)
  it('should render workshop name', () => {
    expect(wrapper.find('.workshop-title').length).toBe(1)
  })
})