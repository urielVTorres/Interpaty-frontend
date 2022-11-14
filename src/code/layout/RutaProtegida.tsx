import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const RutaProtegida = () => {
  const id = localStorage.getItem('key');
  
  return (
    <>
      {id? 
        <>
          <Header />
          <Outlet />
          <Footer />
        </> :
          <div>
            <Navigate to="/login" />
          </div>
      }
    </>
    
  )
}

export default RutaProtegida