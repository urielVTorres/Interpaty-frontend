import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom'
import React, { SetStateAction } from "react";

library.add(faPenToSquare);

interface ILista {
        id: string;
        concepto: string;
        precio: number;
        cantidad: number;
}

interface IProps {
    concepto: string;
    precio: number;
    unidad: string;
    imagen: string;
    linked: string;
    cantidad: number;
    setCantidad: React.Dispatch<SetStateAction<number>>;
    total: number;
    setTotal: React.Dispatch<SetStateAction<number>>;
    lista: ILista[];
    setLista: React.Dispatch<SetStateAction<ILista[]>>;
    id: string;
}


const Producto : React.FC<IProps> = ({concepto, precio, unidad, imagen, linked, cantidad, setCantidad, total, setTotal, lista, setLista, id}) : JSX.Element => {

    const changeCantidad = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const newCantidad : number = Number(e.target.value);
        setCantidad(newCantidad);
    }
    
    
    return (
        <>

            {/* <img src={imagen} alt="foto del producto" className='h-56 m-auto' onClick={()=>{
                    if(linked !== "#")
                        window.open(linked);
                    else return;
                }
                } /> */}

            <div className='container p-5' >
                <div className=" block  w-fit ">
                    <Link to={`/editar/${id}`} > 
                        <FontAwesomeIcon icon={faPenToSquare} color="gray" className="flex" size="lg"  />
                    </Link>
                </div>
                <h2 className='font-black text-2xl text-center text-gray-800'
                    onClick={()=>{
                        if(linked === "#")
                            return;
                        window.open(linked);
                        }
                    }
                    >{concepto}</h2>
                <p className='text-xl text-center font-black text-cyan-600'>
                    <span className='font-black'>Precio: </span>${precio} {unidad}  
                </p>
            </div>
            <form className='container grid grid-cols-2 mb-2'>
                <input 
                    type="number"
                    placeholder='Cantidad'
                    className="font-semibold text-lg px-3 rounded-md bg-gray-100 w-auto mx-3 border-2"
                    onChange={changeCantidad}
                    onBlurCapture={(e : React.FocusEvent<HTMLInputElement> ) => {
                        e.target.value = ''}
                    }
                />
                <input 
                    className=' m-auto bg-rose-600 rounded-md py-2 px-10 font-bold text-white '
                    type="submit"
                    onClick={e => {
                        e.preventDefault();
                        setTotal(total + precio*Math.abs(cantidad));
                        const item : ILista = {
                            id: Date.now().toString(),
                            concepto: concepto,
                            precio: precio,
                            cantidad: Math.abs(cantidad)
                        }

                        setLista([...lista, item]);
                        setCantidad(1);

                    }}
                    value="Agregar"
                />
            </form>

        </>
    )
}

export default Producto;