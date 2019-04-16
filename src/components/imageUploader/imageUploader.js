import React from 'react'
import { uploadImage } from '../../api'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './imageUploader.scss'
export default class ImageUploaderComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = { selectedFile: '', previewImg: 'https://dummyimage.com/300x300/fff/aaa', isUploaded: false }
    this.fileUploadCallback = this.fileUploadCallback.bind(this)
  }

  fileUploadHandler(e) {
    e.preventDefault()
    console.log(e.target.files[0])
    this.setState({ previewImg: URL.createObjectURL(e.target.files[0]), selectedFile: e.target.files[0] })
  }
  fileUploadSubmitHandler(e) {
    e.preventDefault()
    const fd = new FormData()
    fd.append('image', this.state.selectedFile, this.state.selectedFile.name)
    uploadImage(fd, this.fileUploadCallback)
  }

  fileUploadCallback(response) {
    if (response.data) {
      this.setState({ isUploaded: true })
      this.props.setPicture(response.data)
    } else {
      this.setState({ isUploaded: false })
      console.log(response)
    }
  }
  render() {
    const { previewImg, isUploaded } = this.state
    return (
      <div className='grid-container'>
        <div className="grid-y medium-grid-frame">
          <div className='row'>
            <div className="grid-x grid-padding-x align-center align-middle">
              <div className='image-container'>
                <img src={previewImg} className='cell medium-12' accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|images/*" alt='preview' height='100%' width='100%' />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='grid-x grid-padding-x align-center'>
              <label htmlFor="fileUpload" className="button">Choose File</label>
              <input type='file' id='fileUpload' className='show-for-sr' onChange={this.fileUploadHandler.bind(this)} />
              <button onClick={this.fileUploadSubmitHandler.bind(this)} className='button success'>Upload</button>
              {isUploaded && (
                <div className='image-icon-confirm'>
                  <FontAwesomeIcon icon='check'></FontAwesomeIcon>
                </div>
              )}
              {!isUploaded && (
                <div className='image-icon-confirm'>
                  <FontAwesomeIcon icon='minus'></FontAwesomeIcon>
                </div>
              )}
            </div>
          </div>
        </div>
      </div >

    )
  }
}