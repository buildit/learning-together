import React from 'react'
import '../message/message.scss'


export default class MessageConfirmComponent extends React.Component {

  onClickYesCallback() {
    this.props.yesCancel()
  }

  onClickNoCallback() {
    this.props.noCancel()
  }

  render() {
    return (
      <div className='message-container'>
        <div className='message-wrapper'>
          <div className='message-content'>
            {this.props.message}
          </div>
          <div className="button-wrapper">
            <button type='button' className='success button' onClick={this.onClickYesCallback.bind(this)} >Confirm</button>
            <button type='button' className='hollow secondary button' onClick={this.onClickNoCallback.bind(this)} >Cancel</button>
          </div>
        </div>
      </div>
    )
  }
}