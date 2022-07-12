import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const ClientProject = () => {
    const router = useRouter();
    console.log(router);
    return (
        <div>
            [clientProject]
            {router.asPath}
        </div>
    )
}

export default ClientProject