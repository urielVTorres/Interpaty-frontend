import React from 'react'

const CategoriaBar = () => {
  return (
    <>
        <button
        type='button'
        value=''
        children='Todo'
        className="px-2 py-1 mr-2 hover:bg-cyan-800 hover:text-white font-bold text-md text-gray-800 rounded-xl"
        
        />
        <button
            type='button'
            value='tramites'
            children='Tramites'
            className="px-2 py-1 mr-2 hover:bg-cyan-800 hover:text-white font-bold text-md text-gray-800 rounded-xl"
        />
        <button
            type='button'
            value='dulces'
            children='Dulces'
            className="px-2 py-1 mr-2 hover:bg-cyan-800 hover:text-white font-bold text-md text-gray-800 rounded-xl"
        />
        <button
            type='button'
            value='papeleria'
            children='Papelería'
            className="px-2 py-1 mr-2 hover:bg-cyan-800 hover:text-white font-bold text-md text-gray-800 rounded-xl"
        />
        <button
            type='button'
            value='otros'
            children='Otros'
            className="px-2 py-1 mr-2 hover:bg-cyan-800 hover:text-white font-bold text-md text-gray-800 rounded-xl"
        />
    </>
    )
}

export default CategoriaBar