import React from 'react'
import Link from 'next/link'

const AllClients = () => {

    const clientList = [
        {
            id: 'ravi',
            name: 'theClientRavi',
        },
        {
            id: 'amit',
            name: 'theClientAmit',
        }
    ]

    return (
        <div>
            <h1>List of all clients</h1>
            <ul>
                {clientList.map((obj) => {
                    return (
                        <li id={obj.id}>
                            <Link href={{
                                pathname: 'clients/[id]',
                                query: {
                                    id: obj.id
                                }
                            }}>
                                {obj.name}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default AllClients