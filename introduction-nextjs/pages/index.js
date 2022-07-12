import React from 'react'
import Link from 'next/link'

const HomePage = () => {
    return (
        <div>
            <h1>Welcome to the home page</h1>
            <ui>
                <li><Link href="/portfolio">Portfolio</Link></li>  
                <li><Link href="/clients">client</Link></li>
            </ui>
        </div>
    )
}

export default HomePage