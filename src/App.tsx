import './App.css';
import Home from './code/pages/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Reportes from './code/pages/Reportes';
import AgregarProducto from './code/pages/AgregarProducto';
import EditarProducto from './code/pages/EditarProducto';
import RutaProtegida from './code/layout/RutaProtegida';
import Login from './code/pages/Login';
import AuthLayout from './code/layout/AuthLayout';
import Signup from './code/pages/Signup';


function App() : JSX.Element {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path='/' element={<RutaProtegida />}>
                        <Route index element={<Home />} />
                        <Route path="reporte" element={<Reportes />}/>
                        <Route path="nuevo-producto" element={<AgregarProducto />} />
                        <Route path="/editar/:id" element={<EditarProducto />} />
                    </Route>
                    <Route path='/login' element={<AuthLayout />} >
                        <Route index element={<Login />} />
                        <Route path="/login/signup" element={<Signup />} />
                    </Route>

                </Routes>
            </div> 
        </Router>
    );
}


export default App;
