import React from 'react'
import '../styles/error.css'

const Error = () => {
  return (
    <div className="not-found-page">
      <h1 className='error_header'>404 | Page Not Found</h1>
      <p className='error_footer'>Oops! The page you are looking for does not exist.</p>    
    </div>
  )
}

export default Error