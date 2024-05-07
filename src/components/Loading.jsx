import React from 'react'
import Spinner from './loading.gif'
const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center ">
      <img className='my-3' src={Spinner} alt="loading" />
    </div>

  )
}


export default Loading 
