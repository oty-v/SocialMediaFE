import {useRouter} from "next/router";
import Head from 'next/head';

import {createPost, getUsers} from "../lib/api";
import PostForm from "../components/postForm";
import {useEffect} from "react";
import UserList from "../components/usersList";
import {parseCookies} from "../lib/parseCookies";

export default function Home({users, isLoggedIn}) {
    const router = useRouter();
    useEffect(() => {
        if (!isLoggedIn) {
            router.push(`/login`);
        }
    });
    const onCreate = async (inputs) => {
        const {data, status} = await createPost(inputs);
        if (status === 201) {
            router.push(`/posts/${data.id}`);
        }
    }
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <PostForm onSubmit={onCreate}/>
            <UserList users={users}/>
        </>
    )
}

export const getServerSideProps = async ({req, query}) => {
    const cookies = parseCookies(req);
    const {data, status} = await getUsers(cookies.token);
    if (status === 404) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            users: data.data
        }
    };
}