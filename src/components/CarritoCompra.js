import React from 'react'

const CarritoCompra = ({finalizarCompra, total, setTotal, lista, setLista}) => {
  return (
    <div className='container resize-y  bg-rose-200 text-black font-normal w-80 h-40 p-2 rounded-md sticky bottom-8 opacity-90 -inset-3/4 overflow-auto hover:shadow-xl'>
                <button
                    className=" bg-gradient-to-br from-cyan-700 to-cyan-800 text-white font-bold p-2 w-full rounded-md "
                    children={`Finalizar Compra: $${total}`}
                    onClick={finalizarCompra}
                />
                <ul >
                    {lista.map( (elemento,index) => <li key={index} className='flex justify-between shadow-lg p-2 rounded '>
                        <span className=' text-xl ' >{elemento.cantidad} - {elemento.concepto}</span>
                        <button 
                            className='text-white font-black text-xs bg-red-600 px-2 rounded-full'
                            onClick={() => {
                                const newLista = lista.filter( ele => ele.id !== elemento.id);
                                setLista(newLista);
                                setTotal(total - elemento.precio*elemento.cantidad);
                            }}
                        >╳</button>
                    </li>)}
                </ul>
            </div>
  )
}

export default CarritoCompra