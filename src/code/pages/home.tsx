import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Producto from '../components/Producto';
import CategoriaBar from '../components/CategoriaBar';
import Alerta from '../components/Alerta';
import CarritoCompra from '../components/CarritoCompra';

interface ILista {
    id: string;
    concepto: string;
    precio: number;
    cantidad: number;
}

interface IAlerta {
    msg: string | null,
    error: boolean | null
}

interface IProduct {
    _id: string;
    concepto: string;
    precio: number;
    unidad: string;
    imagen: string;
    linked: string;
    categoria: string;
}


const Home = () => {

    const [total, setTotal] = useState<number>( Number(localStorage.getItem('TotalCliente') || 0));
    // @ts-ignore
    const [lista, setLista] = useState<ILista[]>( JSON.parse(localStorage.getItem('ClienteActual')) || []);
    const [productos, setProductos] = useState<IProduct[]>([]);
    const [busqueda, setBusqueda] = useState<string>("");
    const [alerta, setAlerta] = useState<IAlerta>({msg: null, error: null});
    const [cantidad, setCantidad] = useState<number>(1);
    const [categ, setCateg] = useState<string>('');
    const [vista, setVista] = useState<string>(localStorage.getItem('view') ||'cuadro');

    //Guardar la lista de compra del cliente en localStorage, para evitar que se pierda al recargar la página.
    useEffect(()=>{
        localStorage.setItem('ClienteActual', JSON.stringify(lista));
        localStorage.setItem('TotalCliente', JSON.stringify(total));
        localStorage.removeItem('productoID');
    },[lista, total]);

    //Obtener los productos desde el backend
    useEffect(()=>{
        const losProductos = async ()=>{
            try {
                const {data} = await axios(`https://interpaty-backend-production.up.railway.app/productos`,{
                    headers: {
                      'Content-Type': 'application/json;charset=UTF-8',
                      'Access-Control-Allow-Origin': '*'
                    }
                });
                // Organizar los datos en orden alfabetico
                data.sort((a:IProduct,b:IProduct) => (a.concepto > b.concepto) ? 1 : ((b.concepto > a.concepto) ? -1 : 0));
                setProductos(data);
                
            } catch (error) {
                console.log(error);
            }
    
        }
        losProductos();
    }, [])

    //Envía las compras realizadas a la base de datos y se agregarán a la página de reporte
    const finalizarCompra = async () => {
       const id = localStorage.getItem('key');
        const {data} = await axios.post(`https://interpaty-backend-production.up.railway.app/compra`, {
            lista, total, vendedor: id
        });
        //Resetea el contenido de la página y muestra un mensaje con el status de la compra que desaparece después de 5 segundos
        setAlerta(data);
        if(data.error) return;
        localStorage.removeItem('productoID');
        setTotal(0);
        setLista([]);

        setTimeout(()=>{
            setAlerta({msg:null, error:null});
        },5000);
    }

    const {msg} = alerta;

    return (
        <>
            <div className=' grid md:grid-cols-3 gap-5 bg-gradient-to-br from-rose-600 to-rose-700 p-5 rounded-2xl my-5 items-center hover:shadow-xl '>
                <h1 className=' md:col-span-2  font-light text-white text-3xl text-center '>
                    Total: ${total}
                </h1>
                <input 
                    type="text"
                    className='rounded-lg mx-3 p-3 font-medium bg-gray-100'
                    placeholder='Buscar producto'
                    onChange={e => setBusqueda(e.target.value)}
                />
            </div>

            {/* Barra de filtrado por categoría */}
            <div className='flex justify-between md:px-10'>
                <div className="px-3 mb-2" onClick={(e : any)=>{setCateg(e.target.value || "")}}>
                    <CategoriaBar />
                </div>
                <div className="invisible md:visible ">
                    <span>Vista: </span> 
                    <select
                        name="vista"
                        defaultValue={vista}
                        onChange={e => {
                            setVista(e.target.value);
                            localStorage.setItem("view", e.target.value);
                        }}
                    >
                        <option value="" disabled hidden>Elegir</option>
                        <option value="lista">Lista</option>
                        <option value="cuadro">Cuadricula</option>
                    </select>
                </div>
            </div>

            <div className='absolute'>
                {msg && <Alerta alerta={alerta}/>}
            </div>

            {/* crea un objeto por cada procuto en el archivo "productos.json" */}
            <div className={`grid ${vista == "cuadro" ? "md:grid-cols-2 lg:grid-cols-3 gap-4" : "md:grid-cols-1 gap-1"} grid-cols-1 `}  >
                {productos.filter((prod : IProduct) =>{
                    if(busqueda === "" && categ ===""){
                        return prod
                    } else if(busqueda === "" && categ !== ""){
                        return prod.categoria?.toLowerCase().includes(categ.toLowerCase());
                    }
                    return (prod.concepto.toLowerCase().includes(busqueda.toLowerCase()) && prod.categoria?.toLowerCase().includes(categ.toLowerCase()));
                }).map( objeto =>  
                <div key={objeto._id} className={`container mx-auto ${vista == "cuadro" ? "bg-gradient-to-br to-rose-200 from-cyan-200 rounded-md p-2 hover:from-cyan-300 hover:to-rose-300": "bg-slate-100 border-2 border-slate-200 hover:bg-slate-200"}`} onClick={e => {localStorage.setItem('productoID', objeto._id)}}>
                    <Producto 
                        concepto={objeto.concepto} 
                        precio={objeto.precio}
                        unidad={objeto.unidad}
                        linked={objeto.linked || '#'}
                        cantidad={cantidad}
                        setCantidad={setCantidad}
                        total={total}
                        setTotal={setTotal}
                        lista={lista}
                        setLista={setLista}
                        imagen={objeto.imagen || ''}
                        id={objeto._id}
                        vista={vista}
                    />
                </div>
                )}
            </div>
            {/* Crea una lista con los productos agregados. */}
            {!lista.length? <> </> : 
                <CarritoCompra
                    finalizarCompra={finalizarCompra}
                    total={total}
                    setTotal={setTotal} 
                    lista={lista}
                    setLista={setLista}
                />
            }
        </>
    );
}

export default Home
