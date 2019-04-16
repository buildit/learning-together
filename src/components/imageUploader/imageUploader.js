import React from 'react'
import { uploadImage } from '../../api'

export default class ImageUploaderComponent extends React.Component {

  constructor() {
    super()
    this.state = { selectedFile: '', previewImg: '' }
  }

  fileUploadHandler(e) {
    e.preventDefault()
    console.log(e.target.files[0])
    this.setState({ previewImg: URL.createObjectURL(e.target.files[0]), selectedFile: e.target.files[0] })
  }
  fileUploadSubmitHandler(e) {
    e.preventDefault()
    uploadImage(this.state.selectedFile, this.fileUploadCallback)
  }

  fileUploadCallback(response) {
    console.log(response)
    //this.setState({fileUpload: response.})
  }
  render() {
    return (
      <div className='grid-container'>
        <div className="grid-y medium-grid-frame">
          <div className="grid-x grid-padding-x align-middle">
            <img src={this.state.previewImg} className='cell medium-12' alt='preview' height='200' width='100' />
            <div className='row'>
              <label for="fileUpload" className="button">Choose File</label>
              <input type='file' id='fileUpload' className='show-for-sr' onChange={this.fileUploadHandler.bind(this)} />
              <button onClick={this.fileUploadSubmitHandler.bind(this)} className='button success'>Upload</button>
            </div>
          </div>
        </div>
      </div >

    )
  }
}