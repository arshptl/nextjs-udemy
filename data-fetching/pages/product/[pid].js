import React from "react";
import fs from "fs/promises";
import path from "path";
import process from "process";

const SelectedProduct = ({ selectedProduct }) => {
    if (!selectedProduct) {
        return <p>Loading</p>;
    }

    return (
        <div>
            <h1>You're in a selected product page</h1>
            {selectedProduct.title}
        </div>
    );
};

// to get the data from the local file system
async function getData() {
    const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
    const jsonFile = await fs.readFile(filePath);
    const data = JSON.parse(jsonFile);

    return data;
}

// getting data part, runs on the server
export async function getStaticProps(context) {
    const { params } = context;
    const productId = params.pid;

    const data = await getData();

    const product = data.products.find((product) => product.id === productId);

    console.log("in the static props function");

    if (!product) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            selectedProduct: product,
        },
    };
}

// find the ids for the different paths, and kind enough to give to the getStaticProps, aww!
export async function getStaticPaths() {
    const data = await getData();

    const pids = data.products.map((product) => product.id);
    console.log(pids);

    const pathWithParams = pids.map(
        (id) => (console.log(id), { params: { pid: id } })
    );

    console.log(pathWithParams);

    return {
        // paths: [{ params: { pid: "p1" } }],
        paths: pathWithParams,
        fallback: false,
    };
}

export default SelectedProduct;
