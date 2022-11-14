import React from 'react'

interface IAlerta {
    msg: string | null,
    error: boolean | null
}
interface Props {
    alerta: IAlerta;
}

const Alerta : React.FunctionComponent<Props> = ({alerta}) : JSX.Element => {
    if(alerta.error)
    return (
        <div className='container bg-red-800 text-white text-lg font-black text-center w-full md:w-3/4 p-3 mt-3 rounded-md' >
            <p>{alerta.msg}</p>
        </div>
    )
    return (
        <div className='container bg-rose-700 text-white text-lg font-black text-center w-full md:w-3/4 p-3 mt-3 rounded-md' >
            <p>{alerta.msg}</p>
        </div>
    )
}

export default Alerta