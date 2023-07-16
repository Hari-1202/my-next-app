import React from 'react'
import { useRouter } from 'next/router';
const Hello = () => {
    const router = useRouter();

    return (
      <div>
        <h1>Welcome to Next.js</h1>
        <button onClick={() => router.push('/about')}>Go to About Page</button>
      </div>
    );
}

export default Hello