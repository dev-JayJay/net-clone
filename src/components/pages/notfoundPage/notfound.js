import { Link } from '@tanstack/react-router'
import React from 'react'

export const NotFound = () => {
  return (
    <>
    <div className='text-center'>
      <div className='text-5xl text-white text-center'>404 - Page Not Found</div>
      <span className='text-white text-center my-3'>back to home page <Link to={`/`} className='underline text-center'>back to home page</Link></span>
    </div>
    </>
  )
}
