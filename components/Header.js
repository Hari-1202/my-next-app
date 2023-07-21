import React, { useEffect } from 'react'
import { useState } from 'react'
import Enquire from './Enquire'
import { useRouter } from 'next/router'
const Header = ({headerVal}) => {
    const [enquired, setEnquired] = useState(false)
    const [enquiredStatus, setEnquiredStatus] = useState(false)
    const headerValues = ["home", "about us", "residential", "commercial", "joint venture", "media center"]
    const [clicked, setClicked] = useState(headerVal ? headerVal : 0)
    const router = useRouter()
    const onEnquire = (value) => {
        setEnquired(value)
        setEnquiredStatus(true)
        setTimeout(() => {
            setEnquiredStatus(false)
        }, 1000)
    }

    const handleClick = (header, index) => {
        setClicked(index)
        router.push(`/routes/${header.split(" ")[0]}`)
    }
    
    console.log(clicked)
    return (
        <div className='fixed w-screen'>
            <div className=' bg-yellow-300 relative'>
                <h1 className='header text-m text-black-600 uppercase font-bold text-center text-xl p-1' >Real Estate Builders</h1>
                {enquiredStatus && <div className='bg-white w-80 alert' ><h1 className='text-center font-bold p-4 '>Thanks for reaching out . We will get in touch shortly !</h1></div>}
                <div className='group wrapper'>
                    <h1 className='header text-m text-blue-600 text-center p-4 font-bold' >Enquire now</h1>
                    <div className='hidden group-hover:flex  justify-center'>
                        {!enquired ? <Enquire enquired={enquired} onEnquire={onEnquire} /> : <div className='bg-white'><h1 className='text-green-700 p-4'>Already enquired . Please wait until our team reaches out to you</h1></div>}
                    </div>
                </div>
                <div className='flex border-2 bg-yellow-600 headerContainer'>
                    {headerValues.map((header , index) => {
                        return (
                            <p className='flex-1 capitalize p-2 text-center font-bold' style={clicked === index ? {color : 'green'} : {color:'red'}} onClick={() => handleClick(header,index)}>{header}</p>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Header