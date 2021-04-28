import {useRouter} from "next/router";
import Head from 'next/head';

import {api, createPost, getUsers} from "../lib/api";
import PostForm from "../components/postForm";
import UserList from "../components/usersList";
import {parseCookies} from "../lib/parseCookies";
import {useEffect} from "react";

export default function Home({isLoggedIn, users}) {
    const router = useRouter();
    useEffect(() => {
        if (!isLoggedIn) {
            router.push(`/login`);
        }
    },[isLoggedIn]);
    const onCreate = async (inputs) => {
        const {data, status} = await createPost(inputs);
        if (status === 201) {
            router.push(`${data.data.author.username}/posts/${data.data.id}`);
        }
    }
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <PostForm onSubmit={onCreate}/>
            {!!users?.length && (
                <UserList users={users}/>
            )}
        </>
    )
}

export const getServerSideProps = async ({req}) => {
    const {token} = parseCookies(req);
    if(!token){
        return {
            props: {
                isLoggedIn: false
            }
        };
    }
    api.setToken(token);
    const {data, status} = await getUsers();
    if (status === 404) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            isLoggedIn: true,
            users: data.data
        }
    };
}