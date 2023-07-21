import Header from '@/components/Header'
import OGProjects from '@/components/Projects'
import SwiperPage from '@/components/Swiper'
import React from 'react'

const Home = () => {
    return (
        <div>
            <Header />
            <SwiperPage />
            <OGProjects />
        </div>
    )
}

export default Home