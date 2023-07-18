import React, { useEffect } from 'react'
import { useState } from 'react'
import Enquire from './Enquire'
const Header = ({ title }) => {
    const [enquired, setEnquired] = useState(false)
    // const [enquiredStatus, setEnquiredStatus] = useState(false)
    const headerValues = ["home", "about us", "residential", "commercial", "joint venture", "media center"]

    const onEnquire = (value) => {
        setEnquired(value)
        // setEnquiredStatus(true)
        // setTimeout(() => {
        //     setEnquiredStatus(false)
        // }, 2000)
    }


    console.log({ enquiredStatus })
    return (
        <>
            <div className=' bg-yellow-600'>
                <h1 className='header text-m text-green-600 uppercase font-bold text-center text-xl p-1' >Real Estate Builders</h1>
                <div className='group wrapper'>
                    <h1 className='header text-m text-blue-600 text-center p-4 font-bold' >Enquire now</h1>
                    <div className='hidden group-hover:flex  justify-center'>
                        {!enquired ? <Enquire enquired={enquired} onEnquire={onEnquire} /> : <div className='bg-white'><h1 className='text-green-700 p-4'>Already enquired . Please wait until our team reaches out to you</h1></div>}
                        {/* {enquiredStatus && <h1>Thanks for reaching out . We will get in touch shortly !</h1>} */}
                    </div>
                </div>
                <div className='flex'>
                    {headerValues.map((header) => {
                        return (

                            <p className='flex-1 capitalize p-2 text-center font-bold'>{header}</p>

                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Header