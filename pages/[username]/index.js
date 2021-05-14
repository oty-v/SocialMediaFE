import Head from "next/head";

import {getUser} from "../../api/users";
import Link from "next/link";
import {withAuth} from "../../lib/withAuth";

function Profile({profile}) {
    return (profile ? (
        <>
            <Head>
                <title>{profile.username}</title>
            </Head>
            <div className="card text-center w-75">
                <h5 className="card-header">{profile.username}</h5>
                <div className="card-body">
                    <h5 className="card-title">ID: {profile.id}</h5>
                    <p className="card-text">Data registration: {profile.created_at}</p>
                    <Link href={`/${profile.username}/posts`}>
                        <span className="btn btn-primary">{profile.username} posts</span>
                    </Link>
                </div>
            </div>
        </>
    ) : (
        <span>Loading...</span>
    ))
}

export const getServerSideProps = withAuth(async (ctx, auth) => {
    try {
        const {data: {data: profile}} = await getUser(ctx.query.username);
        return {
            props: {
                profile
            }
        };
    } catch (e) {
        if (e.response.status === 404) {
            return {
                notFound: true,
            }
        }
    }
})

export default Profile;