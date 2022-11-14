import React, { Dispatch, SetStateAction } from 'react'

interface ILista {
    id: string;
    concepto: string;
    precio: number;
    cantidad: number;
}

interface ICarrito {
    finalizarCompra: React.MouseEventHandler;
    total: number;
    setTotal: Dispatch<SetStateAction<number>>;
    lista: ILista[];
    setLista: Dispatch<SetStateAction<ILista[]>>;

}

const CarritoCompra : React.FunctionComponent<ICarrito>= ({finalizarCompra, total, setTotal, lista, setLista}) : JSX.Element => {
  return (
    <div className='container resize-y  bg-rose-200 text-black font-normal w-80 h-40 p-2 rounded-md sticky bottom-8 opacity-90 -inset-3/4 overflow-auto hover:shadow-xl'>
                <button
                    className=" bg-gradient-to-br from-cyan-700 to-cyan-800 text-white font-bold p-2 w-full rounded-md "
                    children={`Finalizar Compra: $${total}`}
                    onClick={finalizarCompra}
                />
                <ul >
                    {lista.map( (elemento : ILista) => <li key={elemento.id} className='flex justify-between shadow-lg p-2 rounded '>
                        <span className=' text-xl '> {elemento.cantidad} - {elemento.concepto}</span>
                        <button 
                            className='text-white font-black text-xs px-2'
                            onClick={() => {
                                const newLista = lista.filter( ele => ele.id !== elemento.id);
                                setLista(newLista);
                                setTotal(total - elemento.precio*elemento.cantidad);
                            }}
                        >❌</button>
                    </li>)}
                </ul>
            </div>
  )
}

export default CarritoCompra