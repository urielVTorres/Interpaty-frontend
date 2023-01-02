import React, {useState} from 'react'
import { Navigate } from 'react-router-dom'

import Footer from '../components/Footer'
import Pagina from '../components/Pagina'

const RutaProtegida : React.FunctionComponent = () : JSX.Element => {
  const id : string | null = localStorage.getItem('key');
  const [mostrar, setMostrar] = useState<boolean>(false);
  const [nombre]= useState<string>(localStorage.getItem('name') || '');
  const [page, setPage] = useState<string>("home");
  return (
    <>
      {id? 
        <>
        <header className='container grid grid-cols-1 md:grid-cols-3 justify-center'>
            <div>
                <h1 className="font-black text-3xl my-5 flex justify-center md:justify-start md:px-5">
                    INTER<span className=" text-rose-600">PATY</span>
                </h1>
                <h1 className="font-bold text-gray-800 text-xl flex justify-center md:justify-start md:px-3">
                Bienvenido {nombre}.
                </h1>
            </div>
                <div className='md:col-span-2 md:flex justify-end items-center text-center'>
                <button
                    className='absolute left-1 top-1 text-xl md:hidden bg-rose-600 w-8 h-8 rounded-sm text-white font-black border-2 border-white '
                    children={mostrar? '─':'🞡'}
                    onClick={()=>{setMostrar(!mostrar)}}
                />
                
                <nav className={`font-black text-sm uppercase flex flex-col md:grid md: grid-cols-4 justify-center items-center md:justify-end cursor-auto ${mostrar? 'block': 'hidden'} md:block `}>
                    <button  onClick={()=>setPage("home")} className='px-5 py-2 text-center  w-auto'>Nuevo Cliente</button>
                    <button  onClick={()=>setPage("reporte")} className='px-5 py-2 text-center w-auto'>Reportes</button>
                    <button onClick={()=>setPage("agregar-producto")} className='px-5 py-2 text-center w-auto' >Nuevo Producto</button>
                    <button  onClick={()=>setPage("login")} className='px-5 py-2 text-center  w-auto' >Cerrar Sesión</button>
                </nav>
                </div>
        </header>
          <Pagina page={page}/>
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