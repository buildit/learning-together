import React from 'react'
import Workshop from './workshop'
import { shallow } from 'enzyme'

describe('WorkshopComponent', () => {
  const wrapper = shallow(<Workshop computedMatch={{ params: { id: 1 } }} />)
  wrapper.setState({ workshop: { id: 1 }, educatorId: 1, isUser: true, isAttending: false })

  it('should render workshop name', () => {
    expect(wrapper.find('.workshop-title').length).toBe(1)
  })

  // it('should call enrollWorkshop when user clicks Enroll', () => {
  //   wrapper.instance().onClickEnroll = jest.fn()
  //   wrapper.find('button').simulate('click')
  //   console.log('wrapper', wrapper.instance())

  //   // expect(mockFn).toHaveBeenCalled()
  // })
})