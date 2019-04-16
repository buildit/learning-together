import React from 'react'
import { uploadImage } from '../../api'

export default class ImageUploaderComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = { selectedFile: '', previewImg: 'https://dummyimage.com/640x360/fff/aaa' }
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
    console.log(response)
    this.props.setPicture(response.data)
  }
  render() {
    return (
      <div className='grid-container'>
        <div className="grid-y medium-grid-frame">
          <div className="grid-x grid-padding-x align-center">
            <div className='image-container'>
              <img src={this.state.previewImg} className='cell medium-12' accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|images/*" alt='preview' height='100%' width='100%' />
            </div>
            <label htmlFor="fileUpload" className="button">Choose File</label>
            <input type='file' id='fileUpload' className='show-for-sr' onChange={this.fileUploadHandler.bind(this)} />
            <button onClick={this.fileUploadSubmitHandler.bind(this)} className='button success'>Upload</button>
          </div>

        </div>
      </div >

    )
  }
}