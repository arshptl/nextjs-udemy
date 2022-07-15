import React from 'react'
import fs from 'fs';
import path from 'path';
import process from 'process';
import Link from 'next/link'

const index = ({ products }) => {
    return (
        <>
            <div>
                {products.map((obj) => (
                    <li>
                        <Link href={`/${obj.id}`}>
                            {obj.title}
                        </Link>
                    </li>
                ))}
            </div>
            <button onClick={() => scroll(0, 200)}>click to scroll to the 100th pixel</button>
            <a
                // href="#tothediv"
                onClick={(event) => {
                    const hashElement = document.querySelector(
                        // event.target?.hash
                        "#tothediv"
                    );

                    if (hashElement) {
                        hashElement.setAttribute("tabindex", 0);

                        window.requestAnimationFrame(() => {
                            hashElement.focus();

                            window.requestAnimationFrame(() => {
                                hashElement.removeAttribute("tabindex");
                            });
                        });
                    }
                }}
            >Go to that div</a>

            <div style={{ height: "1000px", backgroundColor: "blue" }}>
                ola
            </div>

            <div id='tothediv' tabIndex={-1} style={{ height: "500px", backgroundColor: "red" }}>
                ola
            </div>
        </>
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

