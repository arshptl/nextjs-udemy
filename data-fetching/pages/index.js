import React from 'react'
import fs from 'fs';
import path from 'path';
import process from 'process';
import Link from 'next/link'

const index = ({ products }) => {
    return (
        <div>
            {products.map((obj) => (
                <li>
                    <Link href={`/${obj.id}`}>
                        {obj.title}
                    </Link>
                </li>
            ))}
        </div>
    )
}

export async function getStaticProps() {
    console.log("Building page.....");
    // builds an absolute path for that dummy-backend json file
    const constructPath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonFile = fs.readFileSync(constructPath);
    const jsonData = JSON.parse(jsonFile);

    return {
        props: {
            products: jsonData.products,
        },
        revalidate: 10,
    }
}



export default index

