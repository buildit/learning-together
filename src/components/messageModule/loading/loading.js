import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './loading.scss'

const LoadingComponent = () => {
  return (
    <div className='spinner-container'>
      <FontAwesomeIcon className='spinner' icon='spinner' />
    </div>
  )
}
export default LoadingComponent