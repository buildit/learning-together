import React from 'react'
import { uploadImage } from '../../api'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './imageUploader.scss'
export default class ImageUploaderComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = { previewImg: props.imgUrl, isUploaded: false, uploadError: false }
    this.fileUploadCallback = this.fileUploadCallback.bind(this)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.imgUrl !== this.props.imgUrl) {
      this.setState({ previewImg: this.props.imgUrl })
    }
  }
  fileUploadHandler(e) {
    e.preventDefault()
    this.setState({ previewImg: URL.createObjectURL(e.target.files[0]) })
    const fd = new FormData()
    fd.append('image', e.target.files[0], e.target.files[0].name)
    uploadImage(fd, this.fileUploadCallback)
  }

  fileUploadCallback(response) {
    if (response.status === 200) {
      this.setState({ isUploaded: true })
      this.props.setPicture(response.data)
    } else {
      this.setState({ isUploaded: false, uploadError: true })
      console.log(response)
    }
  }
  render() {
    const { previewImg, isUploaded, uploadError } = this.state
    return (
      <div className='grid-container'>
        <div className="grid-y medium-grid-frame">
          <div className='row'>
            <div className="grid-x grid-padding-x align-center align-middle image-margin-1">
              <div className='photo-frame-uploader'>
                <img src={previewImg} accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|images/*" alt='preview' />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='grid-x grid-padding-x align-center'>
              <label htmlFor="fileUpload" className="button">Choose File</label>
              <input type='file' id='fileUpload' className='show-for-sr' onChange={this.fileUploadHandler.bind(this)} />
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
            {uploadError && (
              <div className='upload-error'>
                Your image did not upload. Please try again later
                </div>
            )}
          </div>
        </div>
      </div >

    )
  }
}