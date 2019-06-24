import React from 'react'
import Onboarding from './onboarding'
import { shallow } from 'enzyme'

describe('Onboarding component', () => {
  it('should render only if user has not filled out interests', () => {
    const props = {
      user: {
        userId: 1,
        userIntersts: []
      }
    }
    const wrapper = shallow(<Onboarding {...props} />)
    expect(wrapper.find('.button')).toHaveLength(0)
  })

  xit('should not render if user has already filled out interests', () => {
    const props = {
      user: {
        userId: 1,
        userIntersts: [
          "agile", "UX", "Kotlin"
        ]
      }
    }
    const wrapper = shallow(<Onboarding {...props} />)
    expect(wrapper.find('.button')).toHaveLength(1)
  })
})