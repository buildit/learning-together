import React from 'react';
import ReactDOM from 'react-dom';
import { default as Page404Component } from './page404'
import { shallow } from 'enzyme'
jest.mock('../../navbarModule')

describe('404 page component', () => {
  it('should render', () => {
    const wrapper = shallow(<Page404Component />)
    expect(wrapper.find('h1').length).toEqual(1)
  })
})
