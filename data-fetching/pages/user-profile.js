function UserProfile(props) {
    return <div>{props.username}</div>
}

export default UserProfile

export async function getServerSideProps(context) {
    const { params, req, res } = context;

    return {
        props: {
            username: "max"
        }
    }
}