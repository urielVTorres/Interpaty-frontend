import { useState, useEffect } from 'react';
import axios from 'axios';

interface ILista {
    _id: string;
    concepto: string;
    unidad: string;
    precio: number;
    cantidad: number;
}

interface IReporte {
    _id: string;
    fecha: string;
    lista: ILista[];
    total: number;
    vendedor: string;
}


const Reportes = () : JSX.Element => {
    const date : Date = new Date();
    const day : string | number  = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const hoy : string = `${date.getFullYear()}-${date.getMonth() + 1}-${day}`;
    const [fecha1, setFecha1] = useState<string>(hoy);
    const [fecha2, setFecha2] = useState<string>(hoy);
    const [fechas, setFechas] = useState<string[]>([]);
    const [reportes, setReportes] = useState<IReporte[]>([]);
    const [dinero, setDinero] = useState<number>(0);
    const [detalle, setDetalle] = useState<string>('');

    useEffect(() => {
        const id : string | null = localStorage.getItem('key');
        const buscarReportes = async () => {
            try {
                const { data } = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/reporte`, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Access-Control-Allow-Origin': '*'
                    },
                    data: {
                        id: id
                    }
                });
                //Ordena 
                data.sort((a:IReporte,b:IReporte) => (a.fecha < b.fecha) ? 1 : ((b.fecha < a.fecha) ? -1 : 0));
                setReportes(data);
            } catch (error) {
                console.log(error);
            }
        }
        buscarReportes();
    }, []);

    useEffect(() => {
        let money = 0;
        let dates : string[] = [];
        setDinero(0);
        for(let i = Date.parse(fecha1)+86400000; i <= Date.parse(fecha2)+86400000; i+=86400000){
            const date1 = new Date(i);
            const day : string | number  = date1.getDate() < 10 ? `0${date1.getDate()}` : date1.getDate();
            const hoy : string = `${date.getFullYear()}-${date.getMonth() + 1}-${day}`;
            dates.push(hoy);
        }
        setFechas(dates);

        const reporte = reportes.filter(reporte => {
            const fe = reporte.fecha.toString().slice(0,10);
            return fechas.indexOf(fe) != -1 ;
        });
        reporte.forEach(repo => {
            money = money + repo.total
        });
        
        setDinero(money);
    }, [fecha1, fecha2, reportes])


    return <>
        <div className='text-lg mb-3 md:mx-10 text-gray-900 '>
            <form className='grid grid-cols-1 md:grid-cols-4 text-center items-center'>
                <h1 className='font-bold text-4xl'>Reportes</h1>
                <input className='mx-auto my-3 p-3 bg-white border-2 border-rose-400 rounded-md w-full'
                    type="date"
                    value={fecha1}
                    onChange={e => {
                        setFecha1(e.target.value.toString());
                    }} />
                <input className='mx-auto my-3 ml-1 p-3 bg-white border-2 border-rose-400 rounded-md w-full'
                    type="date"
                    value={fecha2}
                    onChange={e => {
                        setFecha2(e.target.value.toString());
                    }} />
                <span className='bg-rose-600 text-white font-bold p-3 md:mx-5 w-full rounded-md'>Total: ${dinero}</span>
            </form>
        </div>
        <div className='grid grid-cols-1 mx-auto text-center w-auto md:w-3/4'>
            {reportes.filter(
                reporte => {
                    if (fecha1 === "") return []
                    //Filtra el arreglo de reportes, solo muestra los que están dentro de las fechas.
                    const fe = reporte.fecha.toString().slice(0,10);
                    return fechas.indexOf(fe) != -1 ;
                }
            )
                .map( (venta: IReporte, index: number) => 
                    <div key={venta._id} className="m-1  bg-white p-1 md:p-2 font-arial md:text-2xl shadow-md text-base ">
                        <p className="flex justify-between items-center">
                            <span className='px-5 font-black'>{index + 1}</span >
                            <span className='px-5 font-bold text-teal-700'>{venta.fecha.toLocaleString().slice(11, -5)}, {venta.fecha.toLocaleString().slice(0, 10)}</span >
                            <span className='px-5 font-black text-teal-700'>${venta.total}</span >
                            <button
                                className='bg-rose-600 p-2 mx-5 rounded-md text-white text-base md:text-lg font-bold'
                                onClick={() => { setDetalle(venta._id) }}
                            >Ver detalles</button>
                        </p>
                        {detalle === venta._id ? <div className={`container resize-y ${detalle === venta._id ? '' : 'hidden'}  bg-rose-200 text-rose-900 font-bold w-full h-36 text-lg p-2 rounded-xl opacity-90 -inset-3/4 overflow-auto hover:shadow-xl`}>
                            <button
                                className='bg-rose-700 text-white p-2 w-full rounded-md hover:bg-rose-900 '
                                onClick={() => { setDetalle("") }}
                            >Cerrar</button>
                            {venta.lista.map(objeto => (
                                <p key={objeto._id}
                                    className='grid grid-cols-3 shadow-lg py-1 px-10  rounded'
                                >
                                    <span>{objeto.cantidad} - {objeto.concepto}</span> <span>{`${objeto.precio} ${objeto.unidad}`}</span> <span> Total: ${objeto.cantidad * objeto.precio} </span>
                                </p>
                            ))}
                        </div> : <></>}
                    </div>
                )
            }
        </div>
    </>
}

export default Reportes