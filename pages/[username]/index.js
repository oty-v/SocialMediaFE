import Head from "next/head";
import Link from "next/link";
import {useSelector} from "react-redux";

import {withAuth} from "../../lib/withAuth";
import BackButton from "../../components/common/BackButton";
import {withRedux} from "../../lib/withRedux";
import {uploadUser} from "../../redux/users/action";


function Profile() {
    const user = useSelector((state) => state.users.user);
    return (user ? (
        <>
            <Head>
                <title>{user.username}</title>
            </Head>
            <div className="card central-column">
                <div className="card-header central-column-header">
                    <BackButton/>
                    <div className="central-column-header-title">
                        <h3 className="mb-0">User</h3>
                        <span className="text-muted">{`@${user.username}`}</span>
                    </div>
                </div>
                <div className="card-body">
                    <h4 className="card-title">ID: {user.id}</h4>
                    <p className="card-text">Data registration: {user.created_at}</p>
                    <Link href={`/${user.username}/posts`}>
                        <span className="btn btn-primary">{user.username} posts</span>
                    </Link>
                </div>
            </div>
        </>
    ) : (
        <span>Loading...</span>
    ))
}

export const getServerSideProps = withRedux(withAuth(async (ctx, dispatch) => {
    try {
        await dispatch(uploadUser(ctx.query.username));
        return {
            props: {
                username: ctx.query.username
            }
        };
    } catch (e) {
        if (e.response.status === 404) {
            return {
                notFound: true,
            }
        }
    }
}))

export default Profile;