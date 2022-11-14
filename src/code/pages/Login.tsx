import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Alerta from '../components/Alerta'

interface IUsuario {
    email: string;
    password: string;
}

interface IAlerta {
    msg: string | null;
    error: boolean | null;
}

const Login = () => {
    
    const [usuario, setUsuario] = useState<IUsuario>({
        email: '',
        password: ''
    });

    const [alerta, setAlerta] = useState<IAlerta>({msg:null,error:null});
    const navigate = useNavigate();
    useEffect(()=>{
        localStorage.removeItem('key');
        localStorage.removeItem('name');
    },[]);
    
    const handleSubmit = (e : React.FormEvent<HTMLFormElement> )=> {
        e.preventDefault();
        const login : VoidFunction = async () =>{
            try {
                const {data} = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/login`, {
                    headers: {
                      'Content-Type': 'application/json;charset=UTF-8',
                      'Access-Control-Allow-Origin': '*'
                    },
                    data: usuario
                });

                if(!data?.nombres){
                    setAlerta(data);
                    return;
                }
                localStorage.setItem('key', data._id);
                localStorage.setItem('name',data.nombres);
                navigate('/');
            } catch (error) {
                console.log(error);
            }
        }
        login();
    }

    const {msg} = alerta;

    return (
    <div className='flex justify-center content-center '>
        <div className="grid gird-cols-1 md:grid-cols-2 w-5/6 content-center justify-center shadow-lg shadow-gray-400 drop-shadow-xl" >
            <div className='flex text-lg p-3 text-center bg-gradient-to-br from-rose-400 to-rose-500 text-white justify-center items-center'>
                <div className='font-light'>
                    <h2 className="text-5xl font-normal mb-9 mt-3 font-mono">[Interpaty]</h2>
                    <p className='text-lg m-4'>¿No tienes una cuenta?</p>
                    <Link to='/login/signup'>
                        <button className='m-2 border-white p-3 rounded-3xl text-lg border-2'>
                            Registrate
                        </button>
                    </Link>
                </div>
            </div>
            <div className='flex  text-lg justify-center content-center bg-white'>
                <div className='w-5/6 p-2 my-6'>
                    <h3 className='text-5xl font-light p-4'>Bienvenido</h3>
                    <form className='font-normal uppercase text-md p-2' onSubmit={( e : React.FormEvent<HTMLFormElement> )=>handleSubmit(e)} >
                        <label htmlFor='email' className='block mt-3 p-2'>Correo electrónico</label>
                        <input 
                            type="text" 
                            id="email" 
                            name="email" 
                            placeholder="correo@correo.com" 
                            className='block font-light p-3 rounded-xl bg-slate-200 text-lg w-full'
                            onChange={(e : React.ChangeEvent<HTMLInputElement> ) =>{setUsuario({...usuario, [e.target.name]: e.target.value})}}
                        />

                        <label htmlFor='password' className='block mt-3 p-2'>Contraseña</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Tu contraseña" 
                            className='block font-light p-3 rounded-xl bg-slate-200 text-lg w-full'
                            onChange={(e : React.ChangeEvent<HTMLInputElement> ) =>{setUsuario({...usuario, [e.target.name]: e.target.value})}}
                        />
                        
                        <button type="submit" className='bg-rose-500 p-2 mt-4 rounded-3xl block text-white w-full' >Iniciar Sesión</button>
                    </form>
                    {msg && <Alerta alerta={alerta}/>}
                </div>
            </div>

        </div>
    </div>
  )
}

export default Login