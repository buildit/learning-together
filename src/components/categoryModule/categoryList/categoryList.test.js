import React from 'react'
import { shallow } from 'enzyme'
import { default as Component } from './categoryList'
import { Link } from "react-router-dom";


describe('>>> CategoryListComponent', () => {
  it('should render as many links as instances in category array', () => {
    const props = {
      categories: [{
        id: 1,
        name: 'number 1'
      },
      {
        id: 2,
        name: 'number 2'
      },
      ]
    }
    const wrapper = shallow(<Component {...props} />)
    expect(wrapper.find(Link).length).toEqual(2)
  })
})