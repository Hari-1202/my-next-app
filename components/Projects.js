import { OngoingProjects } from '@/public/images/buildings'
import React, { useRef, useState } from 'react'


console.log(OngoingProjects)

const OGProjects = () => {

    const sliderRef = useRef(null);
    const imageRef = useRef(null)
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleClick = ((direction) => {
        if (direction === 'right') {
            const newScrollPosition = scrollPosition + (sliderRef.current.clientWidth / 3);
            const maxScrollPosition = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
            console.log("det", sliderRef.current.scrollWidth, sliderRef.current.clientWidth)
            setScrollPosition(newScrollPosition > maxScrollPosition ? maxScrollPosition : newScrollPosition);
            console.log("next", { newScrollPosition, maxScrollPosition, scrollPosition })
        } else {
            const newScrollPosition = scrollPosition - (sliderRef.current.clientWidth / 3);
            setScrollPosition(newScrollPosition < 0 ? 0 : newScrollPosition);
            console.log("prev", { newScrollPosition, scrollPosition })
        }
    })

    return (
        <div className='flex-col'>
            <div className='flex justify-center p-3'>
                <span className='flex p-3 border-r-4 border-black font-bold text-red-300'>Ongoing Projects</span>
                <span className='flex p-3  text-black '>Completed Projects</span>
            </div>
            <div className='flex-container'>
                <span onClick={() => handleClick("left")} className='flex items-center p-10 font-bold text-3xl'> {"\u003C"} </span>

                <div ref={sliderRef} className="horizontal-scroll" >
                    {OngoingProjects.map((items) => {
                        return (
                            <div className="item ease-linear duration-300" style={{ transform: `translateX(-${scrollPosition}px)` }}>
                                <img ref={imageRef} src={items.image.src} />
                                <h1 className='text-center'>{items.name}</h1>
                            </div>
                        )

                    })}
                </div>
                <span onClick={() => handleClick("right")} className='flex items-center p-10 font-bold text-3xl'> {"\u003E"} </span>

            </div>
        </div>
    )
}

export default OGProjects