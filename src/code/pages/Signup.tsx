import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Alerta from '../components/Alerta'

interface IRegistro {
    nombres: string;
    apellidos: string;
    email: string;
    password: string;
}

interface IAlerta {
    msg: string | null;
    error: boolean | null;
}

const Signup : React.FunctionComponent = () : JSX.Element => {
    
    const [usuario, setUsuario] = useState<IRegistro>({
        nombres:'',
        apellidos:'',
        email: '',
        password: ''
    });
    //Password confirmation input
    const [pass, setPass] = useState<string>('');

    const [alerta, setAlerta] = useState<IAlerta>({msg: null, error: null});

    const navigate = useNavigate();
    const handleSubmit = (e : React.FormEvent<HTMLFormElement> ) : void => {
        e.preventDefault();
        const {nombres, apellidos, email, password} = usuario;
        if([nombres, apellidos, email, password, pass].includes('')){
            setAlerta({msg: 'Todos los campos son obligatorios', error:true});
            return;
        }
        if(password !== pass){
            setAlerta({msg: 'Las contraseñas no coinsiden.', error:true});
            return;
        }

        const signup = async () =>{
            try {
                const {data} = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/signup`, {
                    headers: {
                      'Content-Type': 'application/json;charset=UTF-8',
                      'Access-Control-Allow-Origin': '*'
                    },
                    data: usuario
                });

                if(!data?.nombres){
                    localStorage.setItem('key', data._id);
                    navigate('/');
                    setAlerta(data);
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        }
        signup();
    }

    const {msg} = alerta;

    return (
    <div className='flex justify-center content-center '>
        <div className="grid gird-cols-1 md:grid-cols-2 w-5/6 content-center justify-center shadow-lg shadow-gray-400 drop-shadow-xl" >
            <div className='flex text-lg p-3 text-center bg-gradient-to-br from-rose-400 to-rose-500 text-white justify-center items-center'>
                <div className='font-light'>
                    <h2 className="text-5xl font-normal mb-9 mt-3 font-mono">[Interpaty]</h2>
                    <p className='text-lg m-4'>¿Ya estás registrado?</p>
                    <Link to='/login'>
                        <button className='m-2 border-white p-3 rounded-3xl text-lg border-2'>
                            Inicia Sesión
                        </button>
                    </Link>
                </div>
            </div>
            <div className='flex  text-lg justify-center content-center bg-white'>
                <div className='w-5/6 p-2 my-6'>
                    <h3 className='text-5xl font-light p-4'>Registrate</h3>
                    <form className='font-normal uppercase text-md p-2' onSubmit={handleSubmit} >
                        <label htmlFor='nombres' className='block mt-3 p-2'>Nombre(s)</label>
                        <input 
                            type="text" 
                            id="nombres" 
                            name="nombres" 
                            placeholder="Tu nombre" 
                            className='block font-light p-3 rounded-xl bg-slate-200 text-lg w-full'
                            onChange={e=>{setUsuario({...usuario, [e.target.name]: e.target.value})}}
                        />
                        <label htmlFor='apellidos' className='block mt-3 p-2'>Apellidos</label>
                        <input 
                            type="text" 
                            id="apellidos" 
                            name="apellidos" 
                            placeholder="Tus apellidos" 
                            className='block font-light p-3 rounded-xl bg-slate-200 text-lg w-full'
                            onChange={(e : React.ChangeEvent<HTMLInputElement>)=>{setUsuario({...usuario, [e.target.name]: e.target.value})}}
                        />
                        <label htmlFor='email' className='block mt-3 p-2'>Correo electrónico</label>
                        <input 
                            type="text" 
                            id="email" 
                            name="email" 
                            placeholder="correo@correo.com" 
                            className='block font-light p-3 rounded-xl bg-slate-200 text-lg w-full'
                            onChange={(e : React.ChangeEvent<HTMLInputElement>)=>{setUsuario({...usuario, [e.target.name]: e.target.value})}}
                        />

                        <label htmlFor='password' className='block mt-3 p-2'>Contraseña</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Tu contraseña" 
                            className='block font-light p-3 rounded-xl bg-slate-200 text-lg w-full'
                            onChange={(e : React.ChangeEvent<HTMLInputElement>)=>{setUsuario({...usuario, [e.target.name]: e.target.value})}}
                        />
                        <label htmlFor='password2' className='block mt-3 p-2'>Confirmar contraseña</label>
                        <input 
                            type="password" 
                            id="password2" 
                            name="password2" 
                            placeholder="Tu contraseña" 
                            className='block font-light p-3 rounded-xl bg-slate-200 text-lg w-full'
                            onChange={(e : React.ChangeEvent<HTMLInputElement>)=>{setPass( e.target.value)}}
                        />
                        <button type="submit" className='bg-rose-500 p-2 mt-4 rounded-3xl block text-white w-full' >Registrar</button>
                    </form>
                    {msg && <Alerta alerta={alerta}/>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup