import React from 'react'
import './message.scss'


export default class MessageComponent extends React.Component {

  onClickCallback() {
    this.props.callback()
  }

  render() {
    return (
      <div className='message-container'>
        <div className='message-wrapper'>
          <div className='message-content'>
            {this.props.message}
          </div>
          <button type='button' className='success button' onClick={this.onClickCallback.bind(this)} >OK</button>
        </div>
      </div>
    )
  }
}