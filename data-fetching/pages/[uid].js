const UserIdPage = (props) => {
    return <div>{props.id}</div>
}

export default UserIdPage

export async function getServerSideProps(context) {
    const { params, res, req } = context;

    const uid = params.uid;

    return {
        props: {
            id: 'userid-' + uid
        }
    }
}