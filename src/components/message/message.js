import React from 'react'
import './message.scss'


export default class MessageComponent extends React.Component {

  onClickCallback() {
    this.props.callback()
  }

  onClickCancelCallback() {
    this.props.cancel()
  }

  render() {
    console.log('this.props.message', this.props)
    return (
      <div className='message-container'>
        <div className='message-wrapper'>
          <div className='message-content'>
            {this.props.message}
          </div>
          <button type='button' className='success button' onClick={this.onClickCallback.bind(this)} >Confirm</button>
          {this.props.cancel && <button type='button' className='hollow alert button' onClick={this.onClickCancelCallback.bind(this)}>Cancel</button>}
        </div>
      </div>
    )
  }
}