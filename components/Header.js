import React from 'react'
const Header = ({ title }) => {
    const headerValues = ["home", "about us", "residential", "commercial", "joint venture", "media center"]
    return (
        <>
            <div className='flex-col bg-amber-400'>
                <div className='group'>
                    <h1 className='flex-1 text-center capitalize text-3xl text-blue-600  p-2'>Builders</h1>
                    <div className='absolute invisible left-120 top-30 h-80   bg-white opacity-100 z-50  transition-opacity duration-300 pointer-events-none group-hover:visible'>
                        <div className='flex-col'>
                            <h1 className='block bg-green-300'>Enquire now</h1>
                            <h1>Call  : <span className='text-l text-blue-600'>0434-5789809</span></h1>
                        </div>
                    </div>
                </div>
                <div className='flex'>
                    {headerValues.map((item) => {
                        return (
                            <span className='flex-1 p-2 capitalize text-l'>{item}</span>
                        )
                    })}
                </div>
            </div>



        </>
    )
}

export default Header