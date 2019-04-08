import React from 'react'

export default class RegisterComponent extends React.Component {

  SubmitListener() {


  }


  render() {
    return (
      <div>
        <form >
          <input type='text' placeholder='Enter Your First Name' />
          <input type='text' placeholder='Enter Your Last Name' />
          <input type='text' placeholder='Enter Your Wipro Email' />
          <input type='text' placeholder='Enter Your First Name' />
          <input type='text' placeholder='Enter Your First Name' />

          <button type='submit'></button>
        </form>
      </div>
    )
  }
}