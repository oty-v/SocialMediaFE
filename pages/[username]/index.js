import Head from "next/head";

import {parseCookies} from "../../lib/parseCookies";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {getProfile, getUser} from "../../lib/api";
import Cookie from "js-cookie";

function Profile({profile, isLoggedIn}) {
    const router = useRouter();
    useEffect(() => {
        if (!isLoggedIn) {
            router.push(`/login`);
        }
    });
    return (
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
        </>
    )

}

export const getServerSideProps = async ({req, query}) => {
    const cookies = parseCookies(req);
    const {data, status} = await getUser(cookies.token, query.username);
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
}

export default Profile;