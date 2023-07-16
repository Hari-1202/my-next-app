import React from 'react'
import { useRouter } from 'next/router';
const Contact = () => {
    const router = useRouter();
    console.log(router)
    return (
      <div>
        <h1>Welcome to Next.js</h1>
        <button onClick={() => router.push('/api/hari')}>Go to About Page</button>
      </div>
    );
}

export default Contact