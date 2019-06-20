import React from 'react'
import { default as Component } from './browse'
import { shallow } from 'enzyme';
import { CategoryListComponent, } from "../../categoryModule";
import { NavbarComponent } from "../navbar";

describe('>>> BrowseComponent', () => {
  describe('rendering caetgorylist component', () => {
    it('should render categoryList component', () => {
      const wrapper = shallow(<Component />)
      expect(wrapper.find(NavbarComponent).length).toEqual(1)
      expect(wrapper.find(CategoryListComponent).length).toEqual(1)
    })
  })
})