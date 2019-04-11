import React from 'react'
import './message.scss'


export default class MessageComponent extends React.Component {

  componentDidMount() {
    setTimeout(() => { this.props.callback() }, 1500)
  }

  render() {
    return (
      <div className='message-container'>
        <div className='message-wrapper'>
          <div className='message-content'>
            {this.props.message}
          </div>
        </div>
      </div>
    )
  }
}