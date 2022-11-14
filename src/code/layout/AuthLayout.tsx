import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const AuthLayout : React.FunctionComponent = () : JSX.Element => {
  return (
    <div className='w-full h-full mt-10'>
        <div className=''>
            <Outlet />
        </div>
        <Footer />
    </div>
  )
}

export default AuthLayout