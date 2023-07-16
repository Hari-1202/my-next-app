import { useRouter } from 'next/router'
import React from 'react'

const Slug = () => {
    const router = useRouter()
    console.log(router.query)
  return (
    <div>{router.query.slug}</div>
  )
}

export default Slug