import React from 'react'

export const Button = ({ text, onClick, loader }) => {

    return (
        <button disabled={loader} onClick={onClick} className="bg-black w-full hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            {loader ? 'loading..' : text}
        </button>
    )
}