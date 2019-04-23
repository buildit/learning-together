import React from 'react'
import { shallow } from 'enzyme'
import { default as Component } from './imageUploader'
import { uploadImage } from '../../api'

jest.mock('../../api')

describe('imageUploader Component', () => {
  describe('imageUploader submit handler', () => {
    it('should call uploader callback', () => {
      const callback = jest.fn()
      const wrapper = shallow(<Component callback={callback} />)
      const e = { preventDefault: jest.fn() }
      wrapper.setState({ 'selectedFile': new Blob(["This is my blob content"]) })
      wrapper.instance().fileUploadSubmitHandler(e)
      expect(uploadImage).toBeCalled()

    })
  })
  describe('imageUploader callback', () => {
    it('should set isUploaded to true and fire callback if response  is 200', () => {
      const callback = jest.fn()
      const wrapper = shallow(<Component setPicture={callback} />)
      const response = { status: 200, data: {} }
      wrapper.instance().fileUploadCallback(response)
      expect(wrapper.state('isUploaded')).toEqual(true)
      expect(callback).toBeCalled()
    })
    it('should set isUploaded to true and fire callback if response  is not 200', () => {
      const callback = jest.fn()
      const wrapper = shallow(<Component setPicture={callback} />)
      const response = { status: 500, data: {} }
      wrapper.instance().fileUploadCallback(response)
      expect(wrapper.state('isUploaded')).toEqual(false)
      expect(wrapper.state('uploadError')).toEqual(true)
    })
  })
})