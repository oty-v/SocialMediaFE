import Head from "next/head";

import {parseCookies} from "../../lib/parseCookies";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {api, getUser} from "../../lib/api";
import Link from "next/link";

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

export const getServerSideProps = async ({req, query}) => {
    const {token} = parseCookies(req);
    if (!token) {
        return {
            props: {
                isLoggedIn: false
            }
        };
    }
    api.setToken(token);
    const {data, status} = await getUser(query.username);
    if (status === 404) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            isLoggedIn: true,
            profile: data.data
        }
    };
}

export default Profile;