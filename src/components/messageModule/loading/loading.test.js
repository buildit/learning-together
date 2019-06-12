import React from 'react'
import { shallow } from 'enzyme'
import { default as Component } from './loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

describe('>>> LoadingComponent', () => {
  it('should render loading component', () => {
    const wrapper = shallow(<Component />)
    expect(wrapper.find(FontAwesomeIcon).length).toEqual(1)
  })
})