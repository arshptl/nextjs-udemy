import React from 'react'
import fs from 'fs/promises';
import path from 'path';
import process from 'process';

const SelectedProduct = ({ selectedProduct }) => {
    return (
        <div>
            <h1>You're in a selected product page</h1>
            {selectedProduct.title}
        </div>
    )
}


async function getData() {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonFile = await fs.readFile(filePath);
    const data = JSON.parse(jsonFile);

    return data;
}

export async function getStaticProps(context) {

    const { params } = context;
    const productId = params.pid;

    const data = await getData();

    const product = data.products.find(product => product.id === productId);

    return {
        props: {
            selectedProduct: product,
        }
    }
}

export async function getStaticPaths() {

    const data = await getData();

    const pids = data.products.map(product => product.id);

    const pathWithParams = pids.map((id) => ({ params: { pid: id } }));

    return {
        paths: pathWithParams,
        fallback: false,
    }
}

export default SelectedProduct