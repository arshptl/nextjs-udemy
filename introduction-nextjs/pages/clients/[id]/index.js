import React from "react";
import { useRouter } from "next/router";

const AllProjectsOfaClient = () => {
    const router = useRouter();
    const loadProjectHandler = () => {
        // can do it both way
        // router.push('/clients/ravi/projectA')
        router.push({
            pathname: "/clients/[id]/[clientProject]",
            query: {
                id: router.asPath.split("/")[2],
                clientProject: "projectA",
            },
        });
    };

    console.log(router.asPath.split("/"));
    return (
        <div>
            <h1>List of projects of a client</h1>
            <button onClick={loadProjectHandler}>Load Project A</button>
        </div>
    );
};

export default AllProjectsOfaClient;
