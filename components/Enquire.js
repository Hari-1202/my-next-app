import React from 'react'

const Enquire = ({enquired,onEnquire}) => {
    return (
        <>
            <div className='enquire-container flex flex-col items-center absolute bg-white-600  bg-white z-50  transition-opacity duration-300'>
                <div className='p-2 '>
                    <label className='p-2 block'>Enter your name</label>
                    <input className='p-2 block border-2' type='text' />
                </div>
                <div className='p-2'>
                    <label className='p-2 block'>Enter your phone number</label>
                    <input className='p-2 border-2' type='text' />
                </div>
                <button className='border-2 rounded p-2 my-2' onClick={() => onEnquire(!enquired)}>Enquire now </button>

            </div>
        </>
    )
}

export default Enquire