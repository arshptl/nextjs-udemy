import React from 'react'


const index = ({ products }) => {
    return (
        <div>
            {products.map((obj) => (
                <li>
                    {obj.title}
                </li>
            ))}
        </div>
    )
}

export async function getStaticProps() {
    return {
        props: {
            products: [{ id: 1, title: 'just a random product' }]
        }
    }
}

export default index

