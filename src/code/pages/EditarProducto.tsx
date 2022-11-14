import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Alerta from '../components/Alerta';

interface IProduct {
    concepto: string;
    precio: string;
    imagen: string;
    linked: string;
    categoria: string;
}

interface IAlerta {
    msg: string | null,
    error: boolean | null
}

const EditarProducto : React.FC =  () : JSX.Element => {
  const [producto, setProducto]= useState<IProduct>({
        concepto:'',
        precio:'',
        imagen:'',
        linked:'',
        categoria:'',
  });

  const [alerta, setAlerta] = useState<IAlerta>({msg: null, error: null});
  const [id, setID] = useState<string | null>(localStorage.getItem("productoID") || '');
  //const ide = document.location.pathname.substr(8)
  useEffect(()=>{
    const losProductos = async ()=>{
        const idProducto : string | null =  localStorage.getItem("productoID");
        setID(idProducto);
        try {
            const {data} = await axios(`${import.meta.env.VITE_URL_BACKEND}/producto/${id}`,{
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8',
                  'Access-Control-Allow-Origin': '*'
                }
            });

            setProducto(data);
            
        } catch (error) {
            console.log(error);
        }

    }
        losProductos();
}, [id]);

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    //Modificar el acceso de las políticas de CORS
    console.log(producto);
    try {
      const {data} = await axios.put(`${import.meta.env.VITE_URL_BACKEND}/producto/${id}`, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        },
        data: producto
      });
      console.log(data);
      setAlerta(data);
      if(data.error){
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const eliminarProducto = async () => {
    
    //Eliminar producto
    try {
      const {data} = await axios.delete(`${import.meta.env.VITE_URL_BACKEND}/producto/${id}`, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        }
      });
      setAlerta(data);
      if(data.error){
        return;
      }
      setProducto({
        concepto:'',
        precio:'',
        imagen:'',
        linked:'',
        categoria:''
      });
    } catch (error) {
      console.log(error);
    }
  }

  const {msg} = alerta;
  return (
    <div className='text-gray-800 grid md:grid-cols-2 grid-cols-1 items-center'>
      <h1 className='text-4xl font-bold text-center' >Edita el <span className="text-cyan-600">Producto</span></h1>
        <div className='container  justify-center mx-10 w-full'>
            <form className='md:col-span-2 w-4/5 justify-center' onSubmit={handleSubmit}>
                <label className='font-black text-2xl ' children="Nombre:*"/>
                <input 
                  type="text" 
                  name="concepto"
                  placeholder='Nombre del Producto'
                  className='bg-stone-200 rounded-md border-rose-300 block border-2 my-2 text-xl p-2 md:w-3/4 w-full focus:bg-white'
                  value={producto.concepto || ''}
                  onChange={e =>{
                    setProducto({
                      ...producto,
                      [e.target.name]: e.target.value
                    })
                  }}
                />

                <label className='font-black text-2xl ' children="Precio:*"/>
                <input 
                  type="number" 
                  name="precio"
                  placeholder='Precio del Producto'
                  className='bg-stone-200 rounded-md border-rose-300 block border-2 my-2 text-xl p-2 md:w-3/4 w-full focus:bg-white'
                  value={producto.precio || ''}
                  onChange={e =>{
                    setProducto({
                      ...producto,
                      [e.target.name]: e.target.value
                    })
                  }}
                />
                <label className='font-black text-2xl ' children="Categoría:*"/>
                <select  
                  name="categoria"
                  className='bg-stone-200 rounded-md border-rose-300 block border-2 my-2 text-xl p-2 md:w-3/4 w-full focus:bg-white'
                  value={producto.categoria || ''}
                  onChange={e =>{
                    setProducto({
                      ...producto,
                      [e.target.name]: e.target.value
                    })
                  }}
                >
                  <option value="">Seleccione una categoría</option>
                  <option value="tramites">Tramites</option>
                  <option value="dulces">Dulces</option>
                  <option value="papeleria">Papelería</option>
                  <option value="otros">Otros</option>
                </select>
                
                <label className='font-black text-2xl ' children="Link de la página:"/>
                <input 
                  type="text" 
                  name="linked"
                  placeholder='www.unapagina.com/hola'
                  className='bg-stone-200 rounded-md border-rose-300 block border-2 my-2 text-xl p-2 md:w-3/4 w-full focus:bg-white'  
                  value={producto.linked}
                  onChange={e =>{
                    setProducto({
                      ...producto,
                      [e.target.name]: e.target.value
                    })
                  }}
                />
                <div className='grid grid-cols-2 w-3/4'>
                    <button 
                        children="Guardar"
                        type="submit"
                        className='bg-cyan-700 p-3 text-white font-bold uppercase rounded-md mt-2 block mr-1 '
                    />
                    <button 
                        children="Eliminar"
                        className='bg-red-700 p-3 text-white font-bold uppercase rounded-md mt-2 block ml-1 '
                        onClick={eliminarProducto}
                    />
                </div>
            {msg && <Alerta alerta={alerta} />}
            </form>
        </div>
    </div>
  )
}

export default EditarProducto;