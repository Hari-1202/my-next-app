import React, { useEffect, useState } from 'react'
import Swiper from 'swiper';
import Construction1 from '../public/construction-1.jpg'
import Construction2 from '../public/images/construction-2.jpg'
import Construction3 from '../public/images/construction-3.jpg'
import { compress } from '@/next.config';
const SwiperPage = () => {
  const [images, setImages] = useState(0)
  const imageArray = [Construction1, Construction2, Construction3]

  const cities = ["Coimbatore", "Chennai", "Bangalore"]
  const categories = ["Villas","RealEstaste", "Construction", "Plots"]
  const configurations = ["All Configuration"]
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setImages((prevIndex) => (prevIndex + 1) % imageArray.length);
    }, 3000)

    return () => clearInterval(imageInterval)

  }, [])



  return (
    <div>
      <img className='h-screen w-screen z-20' alt={images} src={imageArray[images].src} />
      <div className='absolute finder bg-yellow-400 font-bold'><h1 className='p-2'>Project finder</h1></div>
      <div className='flex flex-col bg-yellow-300 absolute bottom-10 right-10 p-5 z-50'>
        <div className='flex'>
          <select className='m-1 p-3'>
            {cities.map((city) => <option className='capitalize'>{city}</option>)}
          </select>
          <select className='m-1 p-3'>
            {categories.map((category) => <option className='capitalize'>{category}</option>)}
          </select>
        </div>
        <div className='flex'>
          <select className='m-1 p-3'>
            {configurations.map((configuration) => <option className='capitalize'>{configuration}</option>)}
          </select>
          <button className='m-1 border-2 font-bold rounded border-green-600 capitalize p-3 hover:text-black-600 hover:bg-white '>
            Search
          </button>
        </div>
      </div>
    </div>
  )
}

export default SwiperPage