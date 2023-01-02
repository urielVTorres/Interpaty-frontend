import React from 'react'
import Home from '../pages/home';
import Reportes from '../pages/Reportes';
import AgregarProducto from '../pages/AgregarProducto';
import { Navigate } from 'react-router-dom'

interface Props {
    page: string
}

const Pagina : React.FunctionComponent<Props> = ({page}) :JSX.Element => {
    if(page == "home") return <Home />
    else if(page == "reporte") return <Reportes />
    else if(page == "agregar-producto") return <AgregarProducto />
    else if(page == "login") return <Navigate to="/login" />
    else return <Home />
}

export default Pagina