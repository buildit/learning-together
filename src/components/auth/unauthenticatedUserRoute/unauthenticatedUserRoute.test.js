import React from 'react';
import { default as Component } from './unauthenticatedUserRoute';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom'

describe('UnauthetnicatedUserRoute', () => {
  it('should render', () => {
    const wrapper = shallow(<Component />)
    expect(wrapper.find('Route').length).toEqual(1)
  })
})