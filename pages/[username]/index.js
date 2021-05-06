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
            <h2>{profile.username}</h2>
            <div>
                <span>ID:</span>
                <p>{profile.id}</p>
                <span>Data registration:</span>
                <p>{profile.created_at}</p>
            </div>
            <Link href={`/${profile.username}/posts`}>
                <b>{profile.username} posts</b>
            </Link>
        </>
    ) : (
        <span>Loading...</span>
    ))
}

export const getServerSideProps = withAuth(async (ctx, auth) => {
    try {
        const {data} = await getUser(ctx.query.username);
        return {
            props: {
                profile: data.data
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