import Head from "next/head";

import {useRouter} from "next/router";
import {useEffect} from "react";
import {getUser} from "../../api/users";
import Link from "next/link";
import {withAuth} from "../../lib/withAuth";

function Profile({isLoggedIn, profile}) {
    const router = useRouter();
    useEffect(() => {
        if (!isLoggedIn) {
            router.push(`/login`);
        }
    }, [isLoggedIn]);
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

export const getServerSideProps = withAuth(async (ctx, token) => {
    const {data, status} = await getUser(ctx.query.username);
    if (status === 404) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            profile: data.data
        }
    };
})

export default Profile;