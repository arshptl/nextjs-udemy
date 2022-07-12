import React from 'react'
import { useRouter } from 'next/router'

const ProjectFile = () => {
    const router = useRouter();
    console.log(router);
    console.log(router.query)
    return (
        <div>[project]</div>
    )
}

export default ProjectFile