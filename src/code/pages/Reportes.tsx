import {useState, useEffect} from 'react';
import axios from 'axios';


const Reportes = () => {
    const date = new Date();
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const hoy = `${date.getFullYear()}-${date.getMonth()+1}-${day}`;
    const [fecha, setFecha] = useState(hoy);
    const [reportes, setReportes] = useState([]);
    const [dinero, setDinero] = useState(0);
    const [detalle, setDetalle] = useState([]);

    useEffect(()=>{
        const id = localStorage.getItem('key');
        const buscarReportes = async () =>{
            try {
                const {data} = await axios.post(`${process.env.REACT_APP_URL_BACKEND}/reporte`, {
                    headers: {
                      'Content-Type': 'application/json;charset=UTF-8',
                      'Access-Control-Allow-Origin': '*'
                    },
                    data:{
                        id: id
                    }
                });
                setReportes(data);
            } catch (error) {
                console.log(error);
            }
        }
        buscarReportes();
    }, []);
    
    useEffect(()=>{
        let money = 0;
        setDinero(0);
        const reporte = reportes.filter( reporte => {
            return reporte.fecha.toString().includes(fecha);
        })
        reporte.forEach(repo =>{
            money = money + repo.total
        });
        setDinero(money);
    }, [fecha, reportes])
    

    return (
        <>
            <div className='text-lg mb-3 md:mx-10 text-gray-900 '>
                <form className='grid grid-cols-1 md:grid-cols-4 text-center items-center'>
                    <h1 className='font-bold text-4xl md:col-span-2'>Reportes</h1>
                    <input className='mx-auto my-3 p-3 bg-white border-2 border-rose-400 rounded-md w-full' 
                    type="date" 
                    value={fecha}
                    onChange={e => {
                        setFecha(e.target.value.toString());
                        }}/>
                    <span  className='bg-rose-600 text-white font-bold p-3 md:mx-5 w-full rounded-md'>Total: ${dinero}</span>
                </form>
            </div>
            <div className='grid grid-cols-1 mx-auto text-center w-auto md:w-3/4'>
                {reportes.filter( reporte => {
                    if(fecha === "") return []
                    return reporte.fecha.toString().includes(fecha);
                }).map( (venta, index) => {
                return(
                    <div key={venta._id} className="m-1  bg-white p-1 md:p-2 font-arial md:text-2xl shadow-md text-base ">
                        <p className="flex justify-between items-center">
                            <span className='px-5 font-black'>{index+1}</span > 
                            <span className='px-5 font-bold text-teal-700'>{venta.fecha.toLocaleString('es-MX').slice(11,-5)}, {venta.fecha.toLocaleString('es-MX').slice(0,10)}</span >
                            <span className='px-5 font-black text-teal-700'>${venta.total}</span >
                            <button 
                                className='bg-rose-600 p-2 mx-5 rounded-md text-white text-base md:text-lg font-bold'
                                onClick={()=>{setDetalle(venta._id)}}    
                            >Ver detalles</button>
                        </p>
                        {detalle === venta._id ? <div className={`container resize-y ${detalle === venta._id? '' : 'hidden'}  bg-rose-200 text-rose-900 font-bold w-full h-36 text-lg p-2 rounded-xl opacity-90 -inset-3/4 overflow-auto hover:shadow-xl`}>
                            <button 
                                className='bg-rose-700 text-white p-2 w-full rounded-md hover:bg-rose-900 '
                                onClick={()=>{setDetalle("")}} >Cerrar</button>
                                {venta.lista.map( objeto => (
                                    <p key={objeto._id}
                                    className='grid grid-cols-3 shadow-lg py-1 px-10  rounded'
                                    >
                                        <span>{objeto.cantidad} - {objeto.concepto}</span> <span>{`${objeto.precio} ${objeto.unidad}`}</span> <span> Total: ${objeto.cantidad*objeto.precio} </span> 
                                    </p>            
                                ))}
                        </div> : <></>}
                        
                    </div>
                )} )
                
                }
            </div>

        </>
    )
}

export default Reportes