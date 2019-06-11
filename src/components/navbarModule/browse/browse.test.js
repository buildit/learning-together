import React from 'react'
import { default as Component } from './browse'
import { shallow } from 'enzyme';
import { WorkshopPreviewComponent, SortComponent } from "../../workshopModule";
import { NavbarComponent } from "../navbar";

describe('>>> BrowseComponent', () => {
  describe('rendering navbar and sort component', () => {
    it('should render navbar component', () => {
      const wrapper = shallow(<Component />)
      expect(wrapper.find(NavbarComponent).length).toEqual(1)
    })
    it('should render navbar component', () => {
      const wrapper = shallow(<Component />)
      expect(wrapper.find(SortComponent).length).toEqual(1)
    })
  })
  describe('render WorkshopPreviewComponent based on how many instances in array', () => {
    it('should render 3 WorkshopPreviewComponents', () => {
      const wrapper = shallow(<Component />)
      wrapper.setState({ workshops: [{ id: 1 }, { id: 2 }, { id: 3 }] })
      expect(wrapper.find(WorkshopPreviewComponent).length).toEqual(3)
    })
  })
})